"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import Header from "./components/Header"
import MainPage from "./pages/MainPage"
import TermsOfService from "./pages/TermsOfService"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import RefundPolicy from "./pages/RefundPolicy"
import TicketDetailModal from "./components/TicketDetailModal"
import { AuthProvider } from "./context/AuthContext"
import { FilesProvider } from "./context/FilesContext"
import "./App.css"

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [animationPhase, setAnimationPhase] = useState("logo-enter")

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationPhase("logo-zoom-out")
    }, 500)

    const timer2 = setTimeout(() => {
      setAnimationPhase("page-slide-up")
    }, 1500)

    const timer3 = setTimeout(() => {
      setShowIntro(false)
    }, 2500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  return (
    <AuthProvider>
      <FilesProvider>
        <Router>
          <div className="container">
            <Header />
            <main className="main">
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/refund" element={<RefundPolicy />} />
              </Routes>
            </main>
            <TicketDetailModal />
          </div>

          {showIntro && (
            <div className={`intro-overlay ${animationPhase}`}>
              <div className="intro-logo">
                <img src="/innvera-logo.png" alt="INNVERA" className="logo-image" />
              </div>
            </div>
          )}
        </Router>
      </FilesProvider>
    </AuthProvider>
  )
}

export default App
