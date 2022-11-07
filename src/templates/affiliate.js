import React from 'react'
import { graphql } from "gatsby"
import Seo from "../components/Seo"
import Layout from "../components/Containers/Layout"
import Page, { PageSection } from '../components/Page/Page'
import Hero from '../components/Hero/Hero'
import { Link } from "gatsby"

const AboutPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <Seo title={frontmatter.pageTitle} />
      <Hero
        picture={frontmatter.featuredImage}
        picturePosition={frontmatter.imagePosition}
        pageTitle={frontmatter.pageTitle}
        tagline={frontmatter.tagline}
        tagline2={frontmatter.tagline2}
      />
      <Page>
        <PageSection block center className="affiliate">
        <iframe src="https://www.youtube.com/embed/NW3zF84dLJg" allowfullscreen="" width="560" height="315" frameborder="0"></iframe>
          <h1>
          LISTEN TO ME <br /> AND I'LL MAKE YOU RICH!
          </h1>
          <p className="popup-text">
  AMIOTALIO UNIVERSITY AFFILIATE PROGRAM GIVES YOU A CHANCE TO MAKE MONEY FROM YOUR SOCIAL MEDIA ACCOUNTS. 
  </p>
  <p >
  SIMPLY PROSIMPLY PROMOTE OUR BRAND AND ATTRACT USERS TO REGISTER AT ATU.
  </p>
  <p >
  FREE WAY TO START MAKING MONEY ONLINE, NO INVESTMENT IS NEEDED ONLY A FEW HOURS A DAY OF TIME! 
  </p>
  <p >
  STUDENTS ARE MAKING 5K/MONTH EASILY BY FOLLOWING THE METHODS DESCRIBED.
  </p>
  <p >
  JOIN OUR PARIVATE MEMBER GROUP
  </p>
  <Link
              to={"/signup"}
              className="btn btn-cta"
              target="_blank" rel="noopener noreferrer">
              Join Now
            </Link>
        </PageSection>
      </Page>
    </Layout>
  )
}

export default AboutPage

export const contactPageQuery = graphql`
  query AboutPageQuery($id: String!) {
    markdownRemark(id: {eq: $id}) {
      id
      frontmatter {
        pageTitle
        tagline
        tagline2
        featuredImage
        imagePosition
      }
      html
    }
  }
`
