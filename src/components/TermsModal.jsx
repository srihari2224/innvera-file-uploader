import { useState } from "react"

function TermsModal({ onAccept }) {
  const handleAcceptTerms = () => {
    onAccept()
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#000000',
        border: '2px solid #333333',
        borderRadius: '16px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        maxWidth: '500px',
        width: '100%',
        padding: '28px 24px',
        maxHeight: '85vh',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}>
        <h2 style={{
          fontSize: '20.8px',
          fontWeight: 'bold',
          color: '#ffffff',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          Important Instructions
        </h2>

        {/* Image Container */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '28px',
          padding: '12px',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #333333'
        }}>
          <img 
            src="/image.png" 
            alt="Printer Instructions" 
            style={{
              maxWidth: '50%',
              height: 'auto',
              borderRadius: '8px'
            }}
          />
        </div>

        <button
          onClick={handleAcceptTerms}
          style={{
            width: '100%',
            padding: '16px 20px',
            borderRadius: '10px',
            fontWeight: '600',
            fontSize: '13.6px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#2563eb',
            color: 'white',
            transition: 'all 0.3s',
            boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.4)',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#1d4ed8'
            e.target.style.transform = 'scale(1.02)'
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#2563eb'
            e.target.style.transform = 'scale(1)'
          }}
        >
          Okay, Got It!
        </button>

        <p style={{
          fontSize: '10.4px',
          color: '#9ca3af',
          textAlign: 'center',
          marginTop: '20px',
          lineHeight: '1.5'
        }}>
          Please follow the instructions carefully for a smooth printing experience.
        </p>
      </div>
    </div>
  )
}

export default TermsModal