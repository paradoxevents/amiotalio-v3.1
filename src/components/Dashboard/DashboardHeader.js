import React from "react"
import DashboardNav from './DashboardNav'
import AccountNav from './AccountNav'
import Logo from '../Page/Logo'

const DashboardHeader = () => {
  return (
    <header className='header header-sticky'>
      <div className="content-box">
        <div className="header-layout">

          <div className="header-dashboard">
            <div className="header-logo">
              <Logo className="logo-svg" />
            </div>
            <div className="header-title-wrapper">
              <span className="header-tagline">Amio Talio University</span>
              <h4 className="header-title">Members&nbsp;Area</h4>
            </div>
          </div>
          <DashboardNav />
        </div>
      </div>
      <AccountNav />
    </header>
  )
}

export default DashboardHeader
