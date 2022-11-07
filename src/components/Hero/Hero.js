import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import classnames from 'classnames'
import { getImage } from 'gatsby-plugin-image'
import { BgImage } from 'gbimage-bridge'

export const TagBox = ({ children, grad }) => {
  return (
    <div className={`tag-box gradient-${grad}`}>
      {children}
    </div>
  )
}

export const HeroFooter = ({ children }) => {
  return (
    <div className="hero-footer">
      {children}
    </div>
  )
}

const Hero = ({
  children,
  picture,
  picturePosition,
  preTitle,
  pageTitle,
  tagline,
  tagline2,
  home }) => {

  // get default image for hero if not provided
  const { blogListHeroImage } = useStaticQuery(graphql`
    query HeroQuery {
      blogListHeroImage: file(relativePath: {eq: "pexels-trang-doan-1024248.jpg"}) {
        childImageSharp {
          gatsbyImageData(
            # layout: FULL_WIDTH
            placeholder: BLURRED
            # formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  `)

  if (picture === '') {
    const imageData = getImage(blogListHeroImage)

    const imageStack = [
      `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4))`,
      imageData
    ]

    return (
      <BgImage
        image={imageStack}
        className={
          classnames(
            "hero",
            home ? "home-view" : null,
            `bg-position-${picturePosition}`
          )}
      >

        <div className={classnames('content-box', "hero-content")}>
          <header>
            {pageTitle &&
              <h1>
                {pageTitle}
              </h1>}
            {tagline &&
              <h2>
                {tagline}
              </h2>
            }
            {tagline2 &&
              <p>
                {tagline2}
              </p>
            }
          </header>
          {children &&
            <div>
              {children}
            </div>
          }
        </div>
      </BgImage>
    )
  }

  if (picture !== '') {

    return (
      <div
        className={
          classnames(
            "hero",
            home ? "home-view" : null,
            `bg-position-${picturePosition}`
          )}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url('${picture}')`
        }}
      >

        <div className={classnames('content-box', "hero-content")}>
          <header>

            {preTitle &&
              <span className="hero-pretitle">
                {preTitle}
              </span>}
            {pageTitle &&
              <h1>
                {pageTitle}
              </h1>}
            {tagline &&
              <h2>
                {tagline}
              </h2>
            }
            {tagline2 &&
              <p>
                {tagline2}
              </p>
            }
          </header>
          {children &&
            <div>
              {children}
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Hero

Hero.defaultProps = {
  home: false,
  pageTitle: '',
  preTitle: '',
  tagline: '',
  tagline2: '',
  picturePosition: 'center'
}
