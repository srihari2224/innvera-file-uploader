"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"

const Overview = () => {
  const [activeTab, setActiveTab] = useState("session")
  const [sessionId, setSessionId] = useState("")
  const { currentUser } = useAuth()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const session = urlParams.get("session") || "session" + Math.floor(Math.random() * 1000000)
    setSessionId(session)
  }, [])

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
      addFileCard(file.name, file.type, "error", "File type not supported")
      return
    }

    if (file.size > 50 * 1024 * 1024) {
      addFileCard(file.name, file.type, "error", "File too large (max 50MB)")
      return
    }

    const fileId = addFileCard(file.name, file.type, "uploading", "Uploading...")

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
        updateFileCard(fileId, "success", "Upload complete ✓")
      } else {
        updateFileCard(fileId, "error", "Upload failed")
      }
    } catch (err) {
      console.error("Upload error:", err)
      updateFileCard(fileId, "error", "Upload failed")
    }
  }

  const addFileCard = (fileName, fileType, status, message) => {
    const filesGrid = document.getElementById("filesGrid")
    const fileId = Date.now().toString() + Math.random().toString(36).substr(2, 5)

    const fileIcon = fileType.includes("pdf")
      ? `<img src="/pdf-icon.jpg" alt="PDF">`
      : `<img src="/image-icon.jpg" alt="Image">`

    const fileCard = document.createElement("div")
    fileCard.className = "file-card"
    fileCard.id = `file-${fileId}`
    fileCard.innerHTML = `
      <div class="file-icon">${fileIcon}</div>
      <div class="file-info">
        <div class="file-name">${fileName}</div>
        <div class="file-status ${status}">${message}</div>
      </div>
    `

    filesGrid.appendChild(fileCard)
    return fileId
  }

  const updateFileCard = (fileId, status, message) => {
    const fileCard = document.getElementById(`file-${fileId}`)
    if (fileCard) {
      const statusElement = fileCard.querySelector(".file-status")
      statusElement.className = `file-status ${status}`
      statusElement.textContent = message
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

  return (
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
  )
}

export default Overview
