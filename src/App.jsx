import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Navigation from "./components/Navigation"
import Overview from "./pages/Overview"
import Demo from "./pages/Demo"
import Social from "./pages/Social"
import Activity from "./pages/Activity"
import About from "./pages/About"
import FilesSection from "./components/FilesSection"
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
            </Routes>
          </main>
          <FilesSection />
          <TicketDetailModal />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
