import { Link, useLocation } from "react-router-dom"

const Navigation = () => {
  const location = useLocation()

  const isActive = (path) => {
    if (path === "/" || path === "/overview") {
      return location.pathname === "/" || location.pathname === "/overview"
    }
    return location.pathname === path
  }

  return (
    <nav className="nav">
      <div className="nav-content">
        <Link to="/overview" className={`nav-item ${isActive("/overview") ? "active" : ""}`}>
          Overview
        </Link>
        <Link to="/demo" className={`nav-item ${isActive("/demo") ? "active" : ""}`}>
          Demo
        </Link>
        <Link to="/social" className={`nav-item ${isActive("/social") ? "active" : ""}`}>
          Social
        </Link>
        <Link to="/activity" className={`nav-item ${isActive("/activity") ? "active" : ""}`}>
          Activity
        </Link>
        <Link to="/about" className={`nav-item ${isActive("/about") ? "active" : ""}`}>
          About Us
        </Link>
      </div>
    </nav>
  )
}

export default Navigation
