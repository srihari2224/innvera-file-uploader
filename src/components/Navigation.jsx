"use client"

const Navigation = ({ currentSection, onSectionChange }) => {
  const sections = [
    { key: "overview", label: "Overview" },
    { key: "demo", label: "Demo" },
    { key: "social", label: "Social" },
    { key: "activity", label: "Activity" },
    { key: "about", label: "About Us" },
  ]

  return (
    <nav className="nav">
      <div className="nav-content">
        {sections.map((section, index) => (
          <button
            key={section.key}
            onClick={() => onSectionChange(index)}
            className={`nav-item ${currentSection === section.key ? "active" : ""}`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navigation
