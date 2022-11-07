import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import { BgImage } from 'gbimage-bridge'

const AboutPreview = () => {

  const { CryptoIntroImage } = useStaticQuery(graphql`
    query CryptoIntroQuery {
      CryptoIntroImage: file(relativePath: {eq: "golden-bitcoins-cryptocurrency-2021-08-26-16-24-26-utc.jpg"}) {
        childImageSharp {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
          )
        }
      }
    }
  `)

  const imageData = getImage(CryptoIntroImage)

  const imageStack = [
    // `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4))`,
    imageData
  ]

  return (
    <div className='grid-2-columns reverse'>
      <BgImage image={imageStack} className="image right" />
      <div className='content'>
        <h2>Cryptocurrency is the future</h2>

        <p>With over 3 milion dollars in my crypto portfolio the numbers speak for itself.</p>

        <p>With access to the world leading cryptocurrency influencers and blockchain developers with in depth knowledge of current trends in the crypto space I will be using this knowledge and experience to help you grow your porfolio to one day be as big as mine.</p>

        <p>In our free Telegram community group where I daily list all coins I'm buying and my trade ideas. With over 5000 members already, we are growing in strength everyday. There is also a private discord server for selected 50 VIP members who gets to get instant tips first as well as other benefits.</p>
      </div>
    </div>
  )
}

export default AboutPreview

AboutPreview.defaultProps = {
  showMoreBtn: false
}
