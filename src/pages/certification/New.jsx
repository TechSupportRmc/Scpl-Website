import React from 'react'
import './New.css'

const New = ({ image, title, onViewCertificate }) => {
  return (
    <div className="cardscerti">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <button onClick={onViewCertificate}>View Certificate</button>
    </div>
  )
}

export default New
