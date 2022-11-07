import React from 'react'
import { Link } from 'gatsby'
import LogoSvg from '../../assets/svg/amio-talio-full-logo.svg'

const Logo = () => {
  return (
    <Link to="/">
      <LogoSvg />
    </Link>
  )
}

export default Logo
