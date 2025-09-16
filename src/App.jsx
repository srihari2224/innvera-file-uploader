import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
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
        </Router>
      </FilesProvider>
    </AuthProvider>
  )
}

export default App
