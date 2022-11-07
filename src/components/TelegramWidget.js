import React from 'react'
import { FaTelegramPlane } from 'react-icons/fa'
import contact from '../data/contact_info.json'

const TelegramWidget = () => {
  const { socials } = contact
  const telegram = socials.filter(item => item.name === "telegram")

  return (
    <a
      href={telegram[0].url}
      className="widget-wrapper"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="widget-icon">
        <FaTelegramPlane />
      </div>
      <div className="widget-text">
        <span>Have a question?</span>
        <br />
        <span>Let's talk!</span>
      </div>
    </a>
  )
}

export default TelegramWidget
