import React from 'react'
import { BsSnapchat, BsInstagram } from 'react-icons/bs'
import { FaTiktok } from 'react-icons/fa'

const Icon = ({ IconName, stroke }) => {
  return (
    <>
      {IconName === "instagram" && <IconGradient SvgIcon={BsInstagram} stroke={stroke} />}
      {IconName === "snapchat" && <IconGradient SvgIcon={BsSnapchat} stroke={stroke} />}
      {IconName === "tiktok" && <IconGradient SvgIcon={FaTiktok} stroke={stroke} />}
    </>
  )
}

const IconGradient = ({ SvgIcon, stroke }) => {
  return (
    <div>

      <svg width="0" height="0">
        <linearGradient id="gold-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop stopColor="#BB9A3F" offset="0%" />
          <stop stopColor="#E9CB6B" offset="100%" />
        </linearGradient>
      </svg>


      <SvgIcon style={
        stroke
          ? { stroke: "url(#gold-gradient)" }
          : { fill: "url(#gold-gradient)" }
      } />
    </div>
  )
}

export default Icon

IconGradient.defaultProps = {
  stroke: false,
}

Icon.defaultProps = {
  stroke: false,
}
