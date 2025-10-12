import { useState } from "react"

function TermsModal({ onAccept }) {
  const [agreedToTerms, setAgreedToTerms] = useState({
    privacy: false,
    terms: false,
    ageConfirm: false,
  })

  const handleCheckboxChange = (key) => {
    setAgreedToTerms(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const allTermsAgreed = Object.values(agreedToTerms).every(value => value === true)

  const handleAcceptTerms = () => {
    if (allTermsAgreed) {
      onAccept()
    }
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
        maxWidth: '600px',
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
          marginBottom: '12px',
          textAlign: 'center'
        }}>
          Accept Cookies
          <img src="/cookies.svg" alt="cookies" style={{ marginLeft: '8px', verticalAlign: 'middle', width: '34px', height: '34px' }} />
        </h2>

       

        <div style={{ marginBottom: '28px' }}>
          <label 
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '20px',
              cursor: 'pointer',
              padding: '12px',
              backgroundColor: '#111111',
              borderRadius: '8px',
              border: '1px solid #333333',
              transition: 'all 0.2s',
              WebkitTapHighlightColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1a1a1a'
              e.currentTarget.style.borderColor = '#444444'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#111111'
              e.currentTarget.style.borderColor = '#333333'
            }}
          >
            <input
              type="checkbox"
              checked={agreedToTerms.privacy}
              onChange={() => handleCheckboxChange('privacy')}
              style={{
                marginTop: '2px',
                marginRight: '14px',
                width: '20px',
                height: '20px',
                minWidth: '20px',
                cursor: 'pointer',
                accentColor: '#2563eb'
              }}
            />
            <span style={{ 
              fontSize: '12px', 
              color: '#ffffff',
              lineHeight: '1.6',
              userSelect: 'none'
            }}>
              I will <strong style={{ color: '#60a5fa' }}>wait</strong> for printer to complete its prints.
            </span>
          </label>

          <label 
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '20px',
              cursor: 'pointer',
              padding: '12px',
              backgroundColor: '#111111',
              borderRadius: '8px',
              border: '1px solid #333333',
              transition: 'all 0.2s',
              WebkitTapHighlightColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1a1a1a'
              e.currentTarget.style.borderColor = '#444444'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#111111'
              e.currentTarget.style.borderColor = '#333333'
            }}
          >
            <input
              type="checkbox"
              checked={agreedToTerms.terms}
              onChange={() => handleCheckboxChange('terms')}
              style={{
                marginTop: '2px',
                marginRight: '14px',
                width: '20px',
                height: '20px',
                minWidth: '20px',
                cursor: 'pointer',
                accentColor: '#2563eb'
              }}
            />
            <span style={{ 
              fontSize: '12px', 
              color: '#ffffff',
              lineHeight: '1.6',
              userSelect: 'none'
            }}>
              I will <strong style={{ color: '#60a5fa' }}>not pull the papers</strong> when both sides printing is going on.
            </span>
          </label>

          <label 
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              cursor: 'pointer',
              padding: '12px',
              backgroundColor: '#111111',
              borderRadius: '8px',
              border: '1px solid #333333',
              transition: 'all 0.2s',
              WebkitTapHighlightColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1a1a1a'
              e.currentTarget.style.borderColor = '#444444'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#111111'
              e.currentTarget.style.borderColor = '#333333'
            }}
          >
            <input
              type="checkbox"
              checked={agreedToTerms.ageConfirm}
              onChange={() => handleCheckboxChange('ageConfirm')}
              style={{
                marginTop: '2px',
                marginRight: '14px',
                width: '20px',
                height: '20px',
                minWidth: '20px',
                cursor: 'pointer',
                accentColor: '#2563eb'
              }}
            />
            <span style={{ 
              fontSize: '12px', 
              color: '#ffffff',
              lineHeight: '1.6',
              userSelect: 'none'
            }}>
              I will <strong style={{ color: '#60a5fa' }}>take papers</strong> only when complete papers are out.
            </span>
          </label>
        </div>

        <button
          onClick={handleAcceptTerms}
          disabled={!allTermsAgreed}
          style={{
            width: '100%',
            padding: '16px 20px',
            borderRadius: '10px',
            fontWeight: '600',
            fontSize: '13.6px',
            border: 'none',
            cursor: allTermsAgreed ? 'pointer' : 'not-allowed',
            backgroundColor: allTermsAgreed ? '#2563eb' : '#374151',
            color: allTermsAgreed ? 'white' : '#6b7280',
            transition: 'all 0.3s',
            boxShadow: allTermsAgreed ? '0 4px 14px 0 rgba(37, 99, 235, 0.4)' : 'none',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation'
          }}
          onMouseEnter={(e) => {
            if (allTermsAgreed) {
              e.target.style.backgroundColor = '#1d4ed8'
              e.target.style.transform = 'scale(1.02)'
            }
          }}
          onMouseLeave={(e) => {
            if (allTermsAgreed) {
              e.target.style.backgroundColor = '#2563eb'
              e.target.style.transform = 'scale(1)'
            }
          }}
        >
          {allTermsAgreed ? 'Accept & Continue' : 'Please accept all terms'}
        </button>

        <p style={{
          fontSize: '10.4px',
          color: '#9ca3af',
          textAlign: 'center',
          marginTop: '20px',
          lineHeight: '1.5'
        }}>
          By accepting, you agree to all terms and conditions stated above.
        </p>
      </div>
    </div>
  )
}

export default TermsModal