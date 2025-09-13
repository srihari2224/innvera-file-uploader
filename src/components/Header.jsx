"use client"

import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"

const Header = () => {
  const { currentUser, signOut } = useAuth()

  useEffect(() => {
    if (currentUser && typeof window.google !== "undefined" && window.google.accounts && window.google.accounts.id) {
      const signInDiv = document.querySelector(".g_id_signin")
      if (signInDiv) {
        window.google.accounts.id.renderButton(signInDiv, {
          theme: "outline",
          size: "large",
          type: "standard",
          shape: "rectangular",
          text: "sign_in_with",
          logo_alignment: "left",
        })
      }
    }
  }, [currentUser])

  return (
    <>
      <div
        id="g_id_onload"
        data-client_id="931237580682-cr3la8qttqb77ndd7u0tsup8oj25tp99.apps.googleusercontent.com"
        data-callback="handleCredentialResponse"
        data-auto_prompt="false"
      ></div>

      <header className="header">
        <div className="header-content">
          <div className="logo">
            <img className="innvera" src="/innvera-logo.jpg" alt="INNVERA" />
          </div>
          <div className="header-actions">
            <div className="auth-section">
              <div className={`user-info ${currentUser ? "visible" : ""}`} id="userInfo">
                <img
                  className="user-avatar"
                  id="userAvatar"
                  src={currentUser?.picture || "/placeholder.svg"}
                  alt="User Avatar"
                />
                <span className="user-name" id="userName">
                  {currentUser?.name}
                </span>
                <button className="sign-out-btn" onClick={signOut}>
                  Sign Out
                </button>
              </div>
              <div className="google-signin-container" style={{ display: currentUser ? "none" : "flex" }}>
                <div
                  className="g_id_signin"
                  data-type="standard"
                  data-shape="rectangular"
                  data-theme="outline"
                  data-text="sign_in_with"
                  data-size="large"
                  data-logo_alignment="left"
                ></div>
              </div>
            </div>
            <button className="header-btn" aria-label="Menu">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
