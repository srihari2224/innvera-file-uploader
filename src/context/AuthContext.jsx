"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [allTickets, setAllTickets] = useState(null)

  useEffect(() => {
    checkExistingAuth()
    initializeGoogleSignIn()
  }, [])

  const checkExistingAuth = async () => {
    console.log("🔐 === CHECKING EXISTING AUTH ===")
    const userData = localStorage.getItem("userData")

    if (userData) {
      console.log("📱 Found stored user data in localStorage")
      try {
        const data = JSON.parse(userData)
        console.log("👤 Parsed user data:", {
          name: data.name,
          email: data.email,
          picture: data.picture ? "Present" : "Missing",
        })

        setCurrentUser(data)

        console.log("🔍 Checking if user is admin...")
        const adminData = await checkAdminStatus(data.email)

        if (adminData && adminData.tickets) {
          console.log("✅ USER IS ADMIN - Loading admin tickets")
          setIsAdmin(true)
          setAllTickets(adminData.tickets)
        } else {
          console.log("❌ USER IS NOT ADMIN - Staying in regular mode")
        }
      } catch (error) {
        console.error("❌ Error parsing stored user data:", error)
        localStorage.removeItem("userData")
      }
    } else {
      console.log("📭 No stored user data found")
    }
    console.log("🏁 === AUTH CHECK COMPLETE ===")
  }

  const checkAdminStatus = async (email) => {
    console.log("🔍 === CHECKING ADMIN STATUS ===")
    console.log("📧 Email being checked:", email)

    const cleanEmail = email.trim().toLowerCase()
    const requestBody = { gmail: cleanEmail }
    console.log("📤 Request body being sent:", JSON.stringify(requestBody, null, 2))

    try {
      console.log("🌐 Making API call to Lambda...")
      const response = await fetch("https://38ut7arhva.execute-api.ap-south-1.amazonaws.com/prod/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      console.log("📥 API Response received:")
      console.log("- Status:", response.status)
      console.log("- Status Text:", response.statusText)

      if (response.ok) {
        const data = await response.json()
        console.log("✅ API SUCCESS - Data received:")
        console.log("- Full response:", JSON.stringify(data, null, 2))

        // Check if this is a Lambda response with internal statusCode
        if (data.statusCode !== undefined) {
          console.log("🔍 Lambda response detected, checking internal statusCode:", data.statusCode)

          if (data.statusCode === 200) {
            // Parse the body which contains the actual data
            const bodyData = typeof data.body === "string" ? JSON.parse(data.body) : data.body
            console.log("✅ ADMIN ACCESS GRANTED - Tickets found:", bodyData.tickets?.length || 0)
            return bodyData
          } else if (data.statusCode === 403) {
            console.log("❌ ADMIN ACCESS DENIED - User is not admin")
            console.log("🔍 Debug info - Email sent:", cleanEmail)
            console.log("🔍 Debug info - Response body:", data.body)
            return null
          } else {
            console.log("❌ UNEXPECTED LAMBDA STATUS CODE:", data.statusCode)
            return null
          }
        } else {
          // Direct response format (fallback)
          console.log("- Tickets count:", data.tickets?.length || 0)
          return data
        }
      } else {
        console.log("❌ API FAILED - Response not OK")
        const errorText = await response.text()
        console.log("- Error response body:", errorText)
        console.log("User is not admin or error occurred")
        return null
      }
    } catch (error) {
      console.error("❌ NETWORK ERROR checking admin status:", error)
      return null
    } finally {
      console.log("🏁 === ADMIN STATUS CHECK COMPLETE ===")
    }
  }

  const initializeGoogleSignIn = () => {
    if (typeof window !== "undefined") {
      window.handleCredentialResponse = handleCredentialResponse

      const script = document.createElement("script")
      script.src = "https://accounts.google.com/gsi/client"
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      script.onload = () => {
        if (window.google && window.google.accounts && window.google.accounts.id) {
          window.google.accounts.id.initialize({
            client_id: "931237580682-cr3la8qttqb77ndd7u0tsup8oj25tp99.apps.googleusercontent.com",
            callback: handleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: false,
          })
        }
      }
    }
  }

  const handleCredentialResponse = async (response) => {
    console.log("🔐 === GOOGLE SIGN IN RESPONSE ===")
    console.log("📥 Raw credential response:", response)

    try {
      const responsePayload = decodeJwtResponse(response.credential)
      console.log("🔓 Decoded JWT payload:", responsePayload)

      const userData = {
        name: responsePayload.name,
        email: responsePayload.email,
        picture: responsePayload.picture,
      }

      console.log("👤 Extracted user data:", userData)

      localStorage.setItem("userData", JSON.stringify(userData))
      setCurrentUser(userData)
      console.log("💾 Stored user data in localStorage and state")

      console.log("🔍 Now checking admin status for:", userData.email)
      const adminData = await checkAdminStatus(userData.email)

      if (adminData && adminData.tickets) {
        console.log("✅ ADMIN LOGIN SUCCESS - Loading admin view")
        setIsAdmin(true)
        setAllTickets(adminData.tickets)
      } else {
        console.log("👤 REGULAR USER LOGIN - Staying in user mode")
      }
    } catch (error) {
      console.error("❌ Error processing sign-in:", error)
    }

    console.log("🏁 === SIGN IN PROCESSING COMPLETE ===")
  }

  const signOut = () => {
    console.log("🚪 === USER SIGNING OUT ===")

    setCurrentUser(null)
    setIsAdmin(false)
    setAllTickets([])
    localStorage.removeItem("userData")
    console.log("🗑️ Cleared user data and localStorage")

    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.disableAutoSelect()
    }

    console.log("✅ User signed out successfully")
    console.log("🏁 === SIGN OUT COMPLETE ===")
  }

  const decodeJwtResponse = (token) => {
    var base64Url = token.split(".")[1]
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    )

    return JSON.parse(jsonPayload)
  }

  const value = {
    currentUser,
    isAdmin,
    allTickets,
    setAllTickets,
    signOut,
    checkAdminStatus,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
