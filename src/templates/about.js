import React from 'react'
import { graphql } from "gatsby"
import Seo from "../components/Seo"
import Layout from "../components/Containers/Layout"
import Page, { PageSection } from '../components/Page/Page'
import AboutPreview from '../components/Sections/AboutPreview'
import Hero from '../components/Hero/Hero'

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
      <Page showBackBtn>
        <PageSection block center className="about-intro">
          <h2 className="center">
            Amio Talio Organization
          </h2>
          <h4>
            Both A Conglomerate Of Independent Businesses<br />And An Investment Company.
          </h4>
          <p>
            We build, advise, and invest in great people, proven ideas, and innovative business models.
            Our core focus and reason for being is to equip individuals with high-income skills and empower companies to scale.
          </p>
          <p>
          </p>
          <p>
            To achieve our mission, we advocate for visionaries, which gives life to our innovative and fast-evolving culture.
          </p>
        </PageSection>
        <PageSection fullwidth className="about-story">
          <AboutPreview />
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
