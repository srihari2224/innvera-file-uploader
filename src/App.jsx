import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Navigation from "./components/Navigation"
import Overview from "./pages/Overview"
import Demo from "./pages/Demo"
import Social from "./pages/Social"
import Activity from "./pages/Activity"
import About from "./pages/About"
import TermsOfService from "./pages/TermsOfService"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import RefundPolicy from "./pages/RefundPolicy"
import TicketDetailModal from "./components/TicketDetailModal"
import { AuthProvider } from "./context/AuthContext"
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <Header />
          <Navigation />
          <main className="main">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/social" element={<Social />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/refund" element={<RefundPolicy />} />
            </Routes>
          </main>
          <TicketDetailModal />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
