import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'
import { useNavigate } from 'react-router-dom'

function ShowSubstitute({ onLogout, onCompanyLogout }) {
  const [substitutes, setSubstitutes] = useState([])
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    onCompanyLogout()
    navigate("/") // Set login state to false
  }

  useEffect(() => {
    const getSubstitutes = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}substitute/get-all-substitutes`, {
          credentials: 'include' // Include cookies in the request
        })
        const result = await response.json()
        setSubstitutes(result)
      } catch (error) {
        setMessage('An error occurred')
      }
    }

    // Fetch data when the component mounts
    getSubstitutes()
  
  }, []) // Empty dependency array to run this effect only once

  return (
    <div className="substitute-container">
      {substitutes.length === 0 ? (
        <>
          {message && <Alert variant={message.includes('success') ? 'success' : 'danger'}>{message}</Alert>}
        </>
      ) : (
        <>
          <p>Alla tillgängliga vikarie:</p> 
          {substitutes.map((substitute, index) => (
            <div key={index} className="substitute-box">
              <h2>
                <span className="highlight">Vikaries name:</span> {substitute.substitutename}
              </h2>
              <h2>
                <span className="highlight">Vikaries yrke:</span> {substitute.occupation}
              </h2>
              <h2>
                <span className="highlight">Vikaries tillgänglig tid:</span> {substitute.freetime}
              </h2>
              <h2>
                <span className="highlight">Kontakt mig:</span> {substitute.substituteEmail}
              </h2>
            </div>
          ))}
        </>
      )}
      <h2>Logout här:</h2>
      <button onClick={handleLogout} type="button" className="btn btn-outline-danger">Logout</button>
    </div>
  )
}

export default ShowSubstitute