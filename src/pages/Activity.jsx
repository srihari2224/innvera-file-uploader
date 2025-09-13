"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"

const Activity = () => {
  const { currentUser, isAdmin, allTickets } = useAuth()
  const [isFormExpanded, setIsFormExpanded] = useState(false)
  const [ticketImages, setTicketImages] = useState([])
  const [formData, setFormData] = useState({
    phone: "",
    query: "",
  })

  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        email: currentUser.email,
        name: currentUser.name,
      }))
    }
  }, [currentUser])

  const toggleTicketForm = () => {
    setIsFormExpanded(!isFormExpanded)
  }

  const handleImageSelect = (event) => {
    const files = Array.from(event.target.files)
    processImages(files)
  }

  const handleImageDrop = (event) => {
    event.preventDefault()
    event.stopPropagation()

    const container = event.currentTarget
    container.classList.remove("dragover")

    const files = Array.from(event.dataTransfer.files).filter((file) => file.type.startsWith("image/"))
    processImages(files)
  }

  const handleImageDragOver = (event) => {
    event.preventDefault()
    event.stopPropagation()
    event.currentTarget.classList.add("dragover")
  }

  const handleImageDragLeave = (event) => {
    event.preventDefault()
    event.stopPropagation()
    event.currentTarget.classList.remove("dragover")
  }

  const processImages = (files) => {
    const maxImages = 3
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (ticketImages.length + files.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`)
      return
    }

    files.forEach((file) => {
      if (file.size > maxSize) {
        alert(`Image ${file.name} is too large. Maximum size is 5MB.`)
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = {
          file: file,
          dataUrl: e.target.result,
          name: file.name,
        }

        setTicketImages((prev) => [...prev, imageData])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    setTicketImages((prev) => prev.filter((_, i) => i !== index))
  }

  const submitTicket = async (event) => {
    event.preventDefault()

    if (!currentUser) {
      alert("Please sign in to submit a ticket")
      return
    }

    try {
      const urlParams = new URLSearchParams(window.location.search)
      const sessionId = urlParams.get("session") || "session" + Math.floor(Math.random() * 1000000)
      const ticketId = "tkt_" + Math.random().toString(36).substr(2, 9)

      const ticketData = {
        session_id: sessionId,
        created_at: new Date().toISOString(),
        gmail: currentUser.email,
        images: ticketImages.map((img) => `https://s3.amazonaws.com/innvera-tickets/ticket-${ticketId}/${img.name}`),
        name: currentUser.name,
        phone_number: formData.phone,
        query: formData.query,
        status: "open",
        ticket_id: ticketId,
      }

      console.log("[v0] Submitting ticket with session:", sessionId)
      console.log("[v0] Ticket data:", ticketData)

      const response = await fetch("https://xrcya6btq7.execute-api.ap-south-1.amazonaws.com/prod/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketData),
      })

      if (response.ok) {
        const result = await response.json()
        console.log("[v0] Ticket submitted successfully:", result)

        // Reset form
        setFormData({ phone: "", query: "", email: currentUser.email, name: currentUser.name })
        setTicketImages([])
        setIsFormExpanded(false)

        alert("Ticket submitted successfully!")
      } else {
        throw new Error("Failed to submit ticket")
      }
    } catch (error) {
      console.error("[v0] Error submitting ticket:", error)
      alert("Error submitting ticket. Please try again.")
    }
  }

  const showTicketDetail = (ticketId) => {
    const ticket = allTickets.find((t) => t.ticket_id === ticketId)
    if (!ticket) return

    const modal = document.getElementById("ticketDetailModal")
    const title = document.getElementById("ticketDetailTitle")
    const body = document.getElementById("ticketDetailBody")

    title.textContent = `Ticket #${ticket.ticket_id}`

    let imagesHtml = ""
    if (ticket.images && ticket.images.length > 0) {
      imagesHtml = `
        <div class="ticket-images">
          ${ticket.images.map((img) => `<img src="${img}" alt="Ticket Image" class="ticket-image">`).join("")}
        </div>
      `
    }

    body.innerHTML = `
      <div style="margin-bottom: 15px;">
        <strong>Email:</strong> 
        <span class="ticket-email" onclick="composeEmail('${ticket.gmail}')">${ticket.gmail}</span>
      </div>
      <div style="margin-bottom: 15px;">
        <strong>Name:</strong> ${ticket.name || "Not provided"}
      </div>
      <div style="margin-bottom: 15px;">
        <strong>Phone:</strong> ${ticket.phone_number || "Not provided"}
      </div>
      <div style="margin-bottom: 15px;">
        <strong>Session ID:</strong> ${ticket.session_id || "Not provided"}
      </div>
      <div style="margin-bottom: 15px;">
        <strong>Status:</strong> 
        <span class="ticket-status ${ticket.status === "open" ? "status-open" : "status-closed"}">${ticket.status || "open"}</span>
      </div>
      <div style="margin-bottom: 15px;">
        <strong>Created:</strong> ${new Date(ticket.created_at).toLocaleString()}
      </div>
      <div style="margin-bottom: 15px;">
        <strong>Query:</strong>
        <div style="background: #f8f9fa; padding: 10px; border-radius: 4px; margin-top: 5px; white-space: pre-wrap;">${ticket.query || "No query provided"}</div>
      </div>
      ${imagesHtml}
    `

    modal.style.display = "block"
  }

  const composeEmail = (email) => {
    window.open(`mailto:${email}`, "_blank")
  }

  if (isAdmin) {
    return (
      <div className="activity-container admin-activity">
        <h2 style={{ color: "black", marginBottom: "20px", fontSize: "18px", fontWeight: "600" }}>
          Admin - Support Tickets
        </h2>
        <div id="ticketsList">
          {allTickets.length === 0 ? (
            <p style={{ color: "#6c757d", textAlign: "center", padding: "20px" }}>No tickets found</p>
          ) : (
            allTickets
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((ticket) => (
                <div key={ticket.ticket_id} className="ticket-card" onClick={() => showTicketDetail(ticket.ticket_id)}>
                  <div className="ticket-info">
                    <div className="ticket-id">Ticket #{ticket.ticket_id}</div>
                    <div
                      className="ticket-email"
                      onClick={(e) => {
                        e.stopPropagation()
                        composeEmail(ticket.gmail)
                      }}
                    >
                      {ticket.gmail}
                    </div>
                    <div className="ticket-query-preview">
                      {ticket.query
                        ? ticket.query.substring(0, 50) + (ticket.query.length > 50 ? "..." : "")
                        : "No query provided"}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className={`ticket-status ${ticket.status === "open" ? "status-open" : "status-closed"}`}>
                      {ticket.status || "open"}
                    </div>
                    <div className="ticket-date">{new Date(ticket.created_at).toLocaleDateString()}</div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="activity-container">
      <h2 style={{ color: "#ededed", marginBottom: "20px", fontSize: "18px", fontWeight: "600" }}>Support Tickets</h2>

      <div className="raise-ticket-container">
        <div className="raise-ticket-bar" onClick={toggleTicketForm}>
          <span>Raise a Ticket</span>
          <span className={`expand-icon ${isFormExpanded ? "rotated" : ""}`}>▼</span>
        </div>

        <div className={`ticket-form-container ${isFormExpanded ? "expanded" : ""}`}>
          {!currentUser ? (
            <div className="auth-message">
              <p>Please sign in with Google to raise a ticket</p>
            </div>
          ) : (
            <form className="ticket-form" onSubmit={submitTicket}>
              <div className="form-group">
                <label htmlFor="ticketEmail">Email:</label>
                <input type="email" id="ticketEmail" name="email" value={currentUser?.email || ""} readOnly />
              </div>

              <div className="form-group">
                <label htmlFor="ticketName">Name:</label>
                <input type="text" id="ticketName" name="name" value={currentUser?.name || ""} readOnly />
              </div>

              <div className="form-group">
                <label htmlFor="ticketPhone">Phone:</label>
                <input
                  type="tel"
                  id="ticketPhone"
                  name="phone"
                  required
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label htmlFor="ticketQuery">Issue Description:</label>
                <textarea
                  id="ticketQuery"
                  name="query"
                  rows="4"
                  required
                  placeholder="Describe your issue in detail..."
                  value={formData.query}
                  onChange={(e) => setFormData((prev) => ({ ...prev, query: e.target.value }))}
                />
              </div>

              <div className="image-upload-group">
                <label>Attach Images (Optional):</label>
                <div
                  className="image-upload-container"
                  onClick={() => document.getElementById("ticketImageInput").click()}
                  onDrop={handleImageDrop}
                  onDragOver={handleImageDragOver}
                  onDragLeave={handleImageDragLeave}
                >
                  <div className="upload-icon">📁</div>
                  <div className="upload-text">Click to upload or drag and drop</div>
                  <div className="upload-subtext">PNG, JPG, GIF up to 5MB each (Max 3 images)</div>
                </div>
                <input
                  type="file"
                  id="ticketImageInput"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  style={{ display: "none" }}
                />
                <div className="image-preview-container">
                  {ticketImages.map((imageData, index) => (
                    <div key={index} className="image-preview">
                      <img src={imageData.dataUrl || "/placeholder.svg"} alt={imageData.name} />
                      <button type="button" className="remove-image" onClick={() => removeImage(index)}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Submit Ticket
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Activity
