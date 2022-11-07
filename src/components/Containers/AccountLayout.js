import React from "react"
import { Link } from 'gatsby'
import PropTypes from "prop-types"

import "../../assets/scss/global.scss"

import LogoSvg from '../../assets/svg/amio-talio-full-logo.svg'

import { MdOutlineDashboard, MdAccountCircle, MdLogout } from 'react-icons/md'
import { GiBookmarklet } from 'react-icons/gi'

import { logout } from '../../utils/auth'

const AccountLayout = ({ children }) => {

  const handleSignout = e => {
    e.preventDefault()
    logout()
  }

  return (
    <main className="account-ui">
      <aside className="account-sidebar">
        <div className="account-sidebar-logo">
          <LogoSvg className="account-logo" />
        </div>
        {/* <div className="account-sidebar-divider"></div> */}
        <nav className="account-nav-primary">
          <ul className="account-nav-list">

            <div className="sub-nav">
              <li className="nav-item">
                <Link to="/account/" className="nav-item-container">
                  <div className="nav-item-icon">
                    <MdOutlineDashboard className="nav-item-icon-svg" />
                  </div>
                  <div className="nav-item-label">
                    Dashboard
                  </div>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/account/content" className="nav-item-container">
                  <div className="nav-item-icon">
                    <GiBookmarklet className="nav-item-icon-svg" />
                  </div>
                  <div className="nav-item-label">
                    Membership Content
                  </div>
                </Link>
              </li>
            </div>

            <div className="sub-nav bottom">
              <li className="nav-item">
                <Link to="/account/profile" className="nav-item-container">
                  <div className="nav-item-icon">
                    <MdAccountCircle className="nav-item-icon-svg" />
                  </div>
                  <div className="nav-item-label">
                    My Account
                  </div>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  onClick={handleSignout}
                  to="#logout" className="nav-item-container ">
                  <div className="nav-item-icon">
                    <MdLogout className="nav-item-icon-svg" />
                  </div>
                  <div className="nav-item-label">
                    Logout
                  </div>
                </Link>
              </li>
            </div>

          </ul>
        </nav>
      </aside>
      <header className="account-header">
        <span className="header-tagline">Amio Talio University</span>
        <h4 className="header-title">Members&nbsp;Area</h4>
      </header>
      <section className="account-content-pane">
        content
      </section>
    </main>
  )
}

AccountLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AccountLayout
