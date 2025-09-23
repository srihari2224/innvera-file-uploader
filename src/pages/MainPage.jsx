"use client"

import { useState } from "react"
import { useLocation } from "react-router-dom"
import Navigation from "../components/Navigation"
import Overview from "./Overview"
import Demo from "./Demo"
import Social from "./Social"
import Activity from "./Activity"
import About from "./About"
import { useAuth } from "../context/AuthContext"

function MainPage() {
  const [currentSection, setCurrentSection] = useState(0)
  const { currentUser, isAdmin, allTickets } = useAuth()
  const location = useLocation()

  const sections = ["overview", "demo", "social", "activity", "about"]

  const urlParams = new URLSearchParams(location.search)
  const sessionFromUrl = urlParams.get("session")

  const renderCurrentSection = () => {
    const commonProps = {
      sessionFromUrl,
      isAdmin,
      adminCheckDone: currentUser !== null, // Admin check is done when user is loaded
      adminTickets: allTickets,
    }

    switch (currentSection) {
      case 0:
        return <Overview {...commonProps} />
      case 1:
        return <Demo {...commonProps} />
      case 2:
        return <Activity {...commonProps} />
      case 3:
        return <Social {...commonProps} />
      case 4:
        return <About {...commonProps} />
      default:
        return <Overview {...commonProps} />
    }
  }

  return (
    <div className="main-page">
      <Navigation currentSection={sections[currentSection]} onSectionChange={(index) => setCurrentSection(index)} />
      <div className="section-container">{renderCurrentSection()}</div>
    </div>
  )
}

export default MainPage
