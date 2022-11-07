import React, { useEffect } from "react"
import "../assets/scss/global.scss"
import { Router } from "@reach/router"
import { navigate } from 'gatsby'
import Bridge from '../components/Bridge'

import AccountOverview from "../components/Account/AccountOverview"
import Sidebar from '../components/Account/Sidebar'
import Courses from '../components/Account/Courses'
import Profile from '../components/Account/Profile'

import { useAuthContext } from '../context/AuthContext'
import { useUserContext } from '../context/UserContext'

const Account = () => {
  const { accessToken } = useAuthContext()
  const { user, subscription, setUser } = useUserContext()

  if (!accessToken) {
    if (user) setUser(null)
    return <Bridge callback={() => navigate('/login')}>Redirecting...</Bridge>
  }

  return (
    <main className="account-ui">
      <Sidebar />
      <header className="account-header">
        <span className="header-tagline">Amio Talio University</span>
        <h4 className="header-title">Members&nbsp;Area</h4>
      </header>
      <section className="account-content-pane">
        <Router basepath="/account">
          <AccountOverview path="/" />
          <Courses path="/courses/*" />
          <Profile path="/profile" />
        </Router>
      </section>
    </main>
  )
}

export default Account