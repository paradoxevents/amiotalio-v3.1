import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import { BgImage } from 'gbimage-bridge'

const AboutPreview = ({ children, showMoreBtn }) => {

  const { AboutPreviewImage } = useStaticQuery(graphql`
    query AboutPreviewQuery {
      AboutPreviewImage: file(relativePath: {eq: "20201023_232256000_iOS.jpg"}) {
        childImageSharp {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
          )
        }
      }
    }
  `)

  const imageData = getImage(AboutPreviewImage)

  const imageStack = [
    // `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4))`,
    imageData
  ]

  return (
    <div className='grid-2-columns'>
      <BgImage image={imageStack} className="image left" />
      <div className='content'>
        <h2>How am I going to get You rich?</h2>
        <p>AmioTalio University is the one thing you can't afford NOT to be apart off. With Amiotalio as your personal mentor 24/7 and the full support of the AT University Team, you can finally reach your potential. Professionals at the top of their game train every day… and their lifestyle reflects that.</p>

        <h4>Are you ready to become a REAL businessman?</h4>

        <p>From running small business to owning multi-million dollar companies, Amio used the same blueprint for each. Now he decided to give back to the community by sharing it with everyone who is committed enough and ready to change their lifes for the better.</p>

        <p>High school and college didn't give me the knowledge I needed to know how to run a business. I was just tought on how to be a good office worker, nobody ever got rich just working a 9-5.</p>

        <blockquote>Current education system is outdated and not forward thinking, so I decided to open my own university with all the cheat codes in business to keep you ahead of the game.</blockquote>

        {/* {showMoreBtn && <Link to="about" className="btn">Learn more</Link>} */}
      </div>
    </div>
  )
}

export default AboutPreview

AboutPreview.defaultProps = {
  showMoreBtn: false
}
