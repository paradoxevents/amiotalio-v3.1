import React from "react"
import PropTypes from "prop-types"
import classnames from 'classnames'
import Nav from './Nav'
import Logo from '../Page/Logo'

const Header = ({ isTop }) => {
  return (
    <header className={
      classnames(
        'header',
        isTop ? null : 'header-sticky'
      )}>
      {/* <div className="top-banner">
        ATU Members Area Launches Soon
      </div> */}
      <div className="content-box">
        <div className="header-layout">

          <div className="header-logo">
            <Logo />
          </div>
          <Nav />
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  isTop: PropTypes.bool
}

Header.defaultProps = {
  isTop: true,
}

export default Header
