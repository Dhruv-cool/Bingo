import React from 'react'
import './Customalert.css'
function Customalert({message,onClose}) {
  return (
    <div className="custom-alert">
      <div className="custom-alert-content">
        <span>{message}</span>
        <button className='button_class' onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default Customalert