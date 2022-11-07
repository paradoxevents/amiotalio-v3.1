import React from 'react'
import { Link } from 'gatsby'
import { FaLock } from 'react-icons/fa'

import Logo from '../Page/Logo'
import Icon from '../Page/Icon'

import navigation from '../../data/navigation.json'
import contact from '../../data/contact_info.json'

const Footer = () => {
  const { address, phone, email } = contact

  return (
    <footer className="footer">
      <div className="content-box footer-content">
        <div className="emblem">
          <div className="footer-logo">
            <Logo />
          </div>
          <p>See the world as you want it to be<br />and learn how to make it that way. </p>
          <div className="socials-box">
            <h4>Amio on Social Media</h4>
            <ul className="socials">
              {contact['socials'].map((item, i) => (
                <li key={i}>
                  <a href={item.url} className="social-link" target="_blank" rel="noopener noreferrer">
                    <Icon IconName={item.name} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <nav>
          <h4>Quick Links</h4>
          <ul>
            {
              // eslint-disable-next-line array-callback-return
              navigation["nav-items"].map((item, i) => {
                if (item.footerSection === "hidden") return null
                if (item.renderAs === 'menu-item') {
                  return (
                    <li key={i}>
                      <Link
                        to={item.path}
                        className={item.isLocked ? 'locked' : ''}
                      >{item.label}</Link>
                      {item.isLocked && <span className="lock-icon footer"><FaLock /></span>}
                    </li>
                  )
                }

                if (item.renderAs === 'button') {
                  return (
                    <li key={i} >
                      <a
                        href={item.path}
                        className={item.isLocked ? 'locked' : ''}
                        target="_blank" rel="noopener noreferrer">
                        {item.label}
                      </a>
                      {item.isLocked && <span className="lock-icon footer"><FaLock /></span>}
                    </li>
                  )
                }
              })}
          </ul>
        </nav>
        {/* <nav>
          <h4>Services</h4>
          <ul>
            <li>Personal Growth</li>
            <li>Career Ambitions</li>
            <li>Workshops</li>
          </ul>
        </nav> */}

        <div>
          <h4>Contact</h4>
          <ul>
            <li>{phone.mobile}</li>
            <li>{email.team}</li>
            <li>{address["line-1"]}, {address["line-2"]}</li>
            <li>{address.city}, {address.postcode}</li>
            <li>{address.country}</li>
          </ul>
        </div>
      </div>
      <div className="copy">
        <div className="content-box">
          Copyright &copy; GetRichWithAmio.com 2021. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
