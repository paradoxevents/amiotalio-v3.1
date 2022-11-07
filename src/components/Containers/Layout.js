import React from "react"
import PropTypes from "prop-types"
import { ParallaxProvider } from "react-scroll-parallax"
import { useInView } from "react-intersection-observer"

import "../../assets/scss/global.scss"

import Header from "../Header/Header"
import Footer from '../Sections/Footer'

import TelegramWidget from "../TelegramWidget"

const Layout = ({ children, login }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: true
  });

  if (login) {
    return (
      <main className="login-page">
        <span ref={ref} id="page-top" className="top-intersection"></span>
        {children}
      </main>
    )
  } else {
    return (
      <main>
        <span ref={ref} id="page-top" className="top-intersection"></span>
        <Header
          isTop={inView}
        />
        <ParallaxProvider>
          {children}
        </ParallaxProvider>
        <Footer />
        <TelegramWidget />
      </main>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  login: PropTypes.bool
}

Layout.defaultProps = {
  login: false
}

export default Layout
