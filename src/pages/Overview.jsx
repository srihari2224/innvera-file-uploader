"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useFiles } from "../context/FilesContext"
import FilesSection from "../components/FilesSection"
import PaperStockPie from "../components/PaperStockPie" // Import the new Pie chart component

const Overview = () => {
  const [activeTab, setActiveTab] = useState("session")
  const [sessionId, setSessionId] = useState("")
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const { uploadedFiles, addFile, updateFile } = useFiles()
  const { currentUser } = useAuth()

  const [stockStatus, setStockStatus] = useState(null)
  const [stockLoading, setStockLoading] = useState(false)
  const [stockError, setStockError] = useState(null)

  const textContent = [
    " ",
    <>Welcome to<span style={{ color: "#007bff" }}> printIT</span> KIOSK 24/7 LIVE ON</>,
    "Upload your files safely and manage them with ease.",
    "Supported formats: PDF, JPEG, PNG",
    "Start by choosing files above to begin your upload session",
    "Experience seamless file management with advanced security features",
    "Your files are securely encrypted and fully protected, ensuring complete privacy and safety",
  ]

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const sessionParam = urlParams.get("session")

    if (sessionParam) {
      setSessionId(sessionParam)
    } else {
      setSessionId("default")
    }

    const startAnimation = setTimeout(() => {
      setIsAnimating(true)
      startTextCycle()
    }, 500)

    // fetch paper stock status on mount
    fetchStockStatus()

    return () => clearTimeout(startAnimation)
  }, [])

  const fetchStockStatus = async () => {
    setStockLoading(true)
    setStockError(null)
    try {
      const res = await fetch(
            "https://s8wpc0jx1j.execute-api.ap-south-1.amazonaws.com/prod/getStatus?id=global-stock",
            {
              method: "GET",
              headers: { "Content-Type": "application/json" }
            }
          )

      if (!res.ok) throw new Error(`Status fetch failed: ${res.status}`)
      const data = await res.json()
      // API returns body as a JSON-string field per example, parse it
      const parsed = typeof data.body === "string" ? JSON.parse(data.body) : data.body
      setStockStatus(parsed)
    } catch (err) {
      console.error("Error fetching stock status:", err)
      setStockError("Unable to load paper status")
    } finally {
      setStockLoading(false)
    }
  }

  const startTextCycle = () => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % textContent.length
        return nextIndex
      })
    }, 3000)

    return () => clearInterval(interval)
  }

  const handleFileUpload = () => {
    document.getElementById("fileInput").click()
  }

  const handleFiles = (files) => {
    const fileArray = Array.from(files)
    if (fileArray.length === 0) return

    fileArray.forEach((file) => {
      uploadFile(file, sessionId)
    })
  }

  const uploadFile = async (file, sessionId) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/gif", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      const fileData = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
        name: file.name,
        type: file.type,
        status: "error",
        message: "File type not supported",
      }
      addFile(fileData)
      return
    }

    if (file.size > 50 * 1024 * 1024) {
      const fileData = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
        name: file.name,
        type: file.type,
        status: "error",
        message: "File too large (max 50MB)",
      }
      addFile(fileData)
      return
    }

    const fileId = Date.now().toString() + Math.random().toString(36).substr(2, 5)
    const fileData = {
      id: fileId,
      name: file.name,
      type: file.type,
      status: "uploading",
      message: "Uploading...",
    }
    addFile(fileData)

    try {
      const res = await fetch(
        `https://upload-backend-api.vercel.app/api/get-upload-url?session=${sessionId}&filename=${encodeURIComponent(file.name)}&type=${encodeURIComponent(file.type)}`,
      )

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      const { url } = data

      const uploadRes = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      })

      if (uploadRes.ok) {
        updateFile(fileId, { status: "success", message: "Upload complete ✓" })
      } else {
        updateFile(fileId, { status: "error", message: "Upload failed" })
      }
    } catch (err) {
      console.error("Upload error:", err)
      updateFile(fileId, { status: "error", message: "Upload failed" })
    }
  }

  const loadCoupenImage = (input, index) => {
    const url = input.value.trim()
    const container = input.parentElement
    const placeholder = container.querySelector(".coupen-placeholder")

    if (url) {
      const existingImg = container.querySelector("img")
      if (existingImg) {
        existingImg.remove()
      }

      const img = document.createElement("img")
      img.src = url
      img.alt = `Coupen Image ${index + 1}`
      img.style.display = "none"

      img.onload = () => {
        placeholder.style.display = "none"
        img.style.display = "block"
      }

      img.onerror = () => {
        placeholder.textContent = `Error loading image ${index + 1}`
        placeholder.style.color = "#ff6b6b"
      }

      container.insertBefore(img, input)
    } else {
      const existingImg = container.querySelector("img")
      if (existingImg) {
        existingImg.remove()
      }
      placeholder.style.display = "block"
      placeholder.textContent = `Image ${index + 1}\nPaste URL below`
      placeholder.style.color = "#666"
    }
  }
  
  const hasFiles = uploadedFiles && uploadedFiles.length > 0

  return (
    <div className="overview-container">
      <div className="tabbed-section">
        <div className="tab-header">
          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === "session" ? "active" : ""}`}
              onClick={() => setActiveTab("session")}
            >
              Session
            </button>
            <button
              className={`tab-btn ${activeTab === "coupen" ? "active" : ""}`}
              onClick={() => setActiveTab("coupen")}
            >
              Coupens
            </button>
          </div>
        </div>

        <div className={`tab-content ${activeTab === "session" ? "active" : ""}`}>
          <div className="session-content">
            <div className="session-input">
              <input type="text" value={`Session: ${sessionId}`} readOnly />
            </div>
            <div className="choose-files-container">
              <img src="/folder-icon.png" alt="Folder" className="files-icon" />
              <button className="choose-files-btn" onClick={handleFileUpload}>
                Choose Files
              </button>
            </div>
            <input
              type="file"
              id="fileInput"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.gif,.bmp,.webp"
              onChange={(e) => handleFiles(e.target.files)}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <div className={`tab-content ${activeTab === "coupen" ? "active" : ""}`}>
          <div className="coupen-content">
            <h3>Coupen Codes</h3>
            <div className="coupen-images-container">
              {[0, 1, 2].map((index) => (
                <div key={index} className="coupen-image-box">
                  <div className="coupen-placeholder">
                    Image {index + 1}
                    <br />
                    Paste URL below
                  </div>
                  <input
                    type="text"
                    className="coupen-url-input"
                    placeholder="Paste 64-bit image URL here..."
                    onChange={(e) => loadCoupenImage(e.target, index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {hasFiles ? (
        <FilesSection uploadedFiles={uploadedFiles} />
      ) : (
        <div className="sequential-text-section">
          <div className={`sequential-text-container ${isAnimating ? "active" : ""}`}>
            <p key={currentTextIndex} className="sequential-text">
              {textContent[currentTextIndex]}
            </p>
          </div>

          
        </div>
      )}

      <div className="paper-status" style={{ marginTop: "18px", color: "#ededed", fontSize: "14px" }}>
            {stockLoading ? (
              <div>Loading paper status...</div>
            ) : stockError ? (
              <div style={{ color: "#ff6b6b" }}>{stockError}</div>
            ) : stockStatus ? (
              <PaperStockPie capacity={stockStatus.capacity} left={stockStatus.left} />
            ) : (
              <div>No paper status available</div>
            )}
      </div>
    </div>
  )
}

export default Overview
