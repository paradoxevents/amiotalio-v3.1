import React from 'react'
import { Link, navigate } from 'gatsby'
import LogoSvg from '../../assets/svg/amio-talio-full-logo.svg'

import { MdOutlineDashboard, MdAccountCircle, MdLogout } from 'react-icons/md'
import { GiBookmarklet } from 'react-icons/gi'

import { useAuthContext } from '../../context/AuthContext'
import { useUserContext } from '../../context/UserContext'

const Sidebar = () => {
  const { logout } = useAuthContext()
  const { setUser } = useUserContext()

  const handleSignout = e => {
    e.preventDefault()

    logout(() => {
      setUser(null)
      navigate('/')
    })
  }

  return (
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
              <Link to="/account/courses" className="nav-item-container">
                <div className="nav-item-icon">
                  <GiBookmarklet className="nav-item-icon-svg" />
                </div>
                <div className="nav-item-label">
                  Courses
                </div>
              </Link>
            </li>
          </div>

          <div className="sub-nav bottom">
            <li className="nav-item">
              <Link to="/account/profile">
                <div className="nav-item-icon">
                  <MdAccountCircle className="nav-item-icon-svg" />
                </div>
                <div className="nav-item-label">
                  User Profile
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
    </aside>)
}

export default Sidebar

