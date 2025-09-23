"use client"

const Social = () => {
  const loadPrintitLogo = (input, index) => {
    const url = input.value.trim()
    const container = input.parentElement
    const placeholder = container.querySelector(".printit-placeholder")

    if (url) {
      const existingImg = container.querySelector("img")
      if (existingImg) {
        existingImg.remove()
      }

      const img = document.createElement("img")
      img.src = url
      img.alt = `Printit Logo ${index + 1}`
      img.style.display = "none"

      img.onload = () => {
        placeholder.style.display = "none"
        img.style.display = "block"
      }

      img.onerror = () => {
        placeholder.textContent = `Error loading logo ${index + 1}`
        placeholder.style.color = "#ff6b6b"
      }

      container.insertBefore(img, input)
    } else {
      const existingImg = container.querySelector("img")
      if (existingImg) {
        existingImg.remove()
      }
      placeholder.style.display = "block"
      placeholder.textContent = `Logo ${index + 1}`
      placeholder.style.color = "#666"
    }
  }

  return (
    <div className="empty-page">
      <h2>Social Media</h2>
      <p>Connect with us on social media</p>
      <div className="social-links">
        <a
          href="https://www.instagram.com/innveratechnology?igsh=MW5mbjZvaWxwOTd5eA=="
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
            <img src="uploadpag\innvera\public\insta.svg"></img>
          </svg>
          Instagram
        </a>
        <a
          href="https://youtube.com/@innveratechnology?si=fWRb9RxuhkQDfdkB"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          YouTube
        </a>
      </div>

      {/* <div className="printit-section">
        <div className="printit-title">printit - powered by:</div>
        <div className="printit-logos">
          {[0, 1, 2].map((index) => (
            <div key={index} className="printit-logo-container">
              <div className="printit-placeholder">Logo {index + 1}</div>
              <input
                type="text"
                className="printit-url-input"
                placeholder="Paste logo URL..."
                onChange={(e) => loadPrintitLogo(e.target, index)}
              />
            </div>
          ))}
        </div>
      </div> */}
    </div>
  )
}

export default Social
