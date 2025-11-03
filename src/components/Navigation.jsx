"use client"

const Navigation = ({ currentSection, onSectionChange }) => {
  const sections = [
    { key: "overview", img: "/rocket.svg" },
    { key: "demo", img: "/ticket.png" },
    { key: "social", label: "Demo" },
    { key: "activity", label: "Social" },
    { key: "about", label: "About us" },
  ];

  return (
    <nav className="nav">
      <div className="nav-content flex justify-around items-center p-4 bg-black">
        {sections.map((section, index) => (
          <button
            key={section.key}
            onClick={() => onSectionChange(index)}
            className={`nav-item p-2 ${
              currentSection === index ? "opacity-100" : "opacity-60"
            } hover:opacity-100 transition`}
          >
            {section.img ? (
              <img
                src={section.img}
                alt={section.key}
                width={37}
                height={37}
                style={{ marginLeft: "10px" }}
                className="object-contain"
              />
            ) : (
              <span className="text-white font-medium">{section.label}</span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;