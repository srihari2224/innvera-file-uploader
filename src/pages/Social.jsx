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
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-2.664 4.771-4.919 4.919-1.281-.059-1.69-.073-4.949-.073zm0-2.163c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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

      <div className="printit-section">
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
      </div>
    </div>
  )
}

export default Social
