"use client"

import React from "react"

const TicketDetailModal = () => {
  const closeTicketDetail = () => {
    document.getElementById("ticketDetailModal").style.display = "none"
  }

  // Close modal when clicking outside
  React.useEffect(() => {
    const handleClick = (event) => {
      const modal = document.getElementById("ticketDetailModal")
      if (event.target === modal) {
        closeTicketDetail()
      }
    }

    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [])

  return (
    <div id="ticketDetailModal" className="ticket-detail-modal">
      <div className="ticket-detail-content">
        <div className="ticket-detail-header">
          <h3 id="ticketDetailTitle">Ticket Details</h3>
          <button className="close-detail" onClick={closeTicketDetail}>
            &times;
          </button>
        </div>-
        <div id="ticketDetailBody"></div>
      </div>
    </div>
  )
}

export default TicketDetailModal
