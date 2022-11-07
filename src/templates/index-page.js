import React from 'react'
import { graphql, Link } from "gatsby"
import Layout from "../components/Containers/Layout"
import Seo from "../components/Seo"
import Hero, { HeroFooter, TagBox } from '../components/Hero/Hero'
import Page, { PageSection } from '../components/Page/Page'
import Button from '../components/Page/Button'
import AboutPreview from '../components/Sections/AboutPreview'
import CryptoIntro from '../components/Sections/CryptoIntro'
// import FormSignup from '../components/Forms/FormSignup'
import MembershipCard from '../components/Dashboard/MembershipCard'
import Timer from '../components/Timer'
import ScrollIntoView from 'react-scroll-into-view'

import { useUserContext } from '../context/UserContext'

const HomePage = ({ data }) => {
  const { user } = useUserContext()
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter } = markdownRemark
  const imageUrl = frontmatter.featuredImage
    ? frontmatter.featuredImage
    : ""

  const {
    cta,
    text2,
  } = frontmatter.heroContent


  return (
    <Layout>
      <Seo title="Home" />
      <Hero
        picture={imageUrl}
        home
        pageTitle={frontmatter.pageTitle}
        tagline={frontmatter.tagline}>
        <Timer />
        <h3 className="hero-pre-tagline">
          Welcome to
        </h3>
        <h2 className="hero-tagline">
          Amio Talio University
        </h2>
        <div className="column align-center">
          {!user
            ? (
              <Link
              to={"/signup"}
              className="btn btn-cta"
              target="_blank" rel="noopener noreferrer">
              Become a Member
            </Link>)
            : <Link className="btn btn-cta btn-block" to="/account">Access Member Area</Link>
          }
          <p>
            {text2}
          </p>
        </div>
        <HeroFooter>
          <h4 className="header-gtc">We will teach You</h4>
          <div className="tags-container">
            <TagBox grad={1}>
              NFTs
            </TagBox>
            <TagBox grad={1}>
              Pre-sales
            </TagBox>
            <TagBox grad={1}>
              Cryptocurrencies & Blockchain
            </TagBox>
            <TagBox grad={1}>
              Crypto Coins to Buy
            </TagBox>
            <TagBox grad={1}>
              Day Trading
            </TagBox>
            <TagBox grad={1}>
              Stock Markets
            </TagBox>
            <TagBox grad={1}>
              Investments
            </TagBox>
            <TagBox grad={1}>
              Business Development
            </TagBox>
            <TagBox grad={1}>
              Passive Income
            </TagBox>
          </div>
        </HeroFooter>
      </Hero>
      <Page home>
        <PageSection center block>
          <h2 className="center">Amio Talio's community/students</h2>
          <p>
            Do you want to do more, be more, accomplish more, but don't know where to begin?
            I'm here to help and guide you to your path to financial freedom.
          </p>
          <h3>Don't wait another moment.</h3>
          <p>
            The time is <strong>NOW</strong>. The person is <strong>YOU</strong>. Take the leap and in 3 months time you will not recognize the person you are today.<br /><br />
          </p>
          <Link
              to={"/signup"}
              className="btn btn-cta"
              target="_blank" rel="noopener noreferrer">
              Join Now
            </Link>
        </PageSection>

        <PageSection fullwidth>
          <AboutPreview />
        </PageSection>

        <PageSection block fullwidth>
          <CryptoIntro />
        </PageSection>

        <PageSection>
          <div className="disclaimer">
            <p>You can take your first step right now and join people just like you in the Amiotalio University community.</p>
            <p>Once a payment is confirmed which can take upto 24 hours, you will receive a confirmation email.</p>
            <p>You will receive an email with further information on how to access all the content on AmioTalio University as well as access to our Discord Server.</p>
            {/* <p className="launch-date">21<sup>st</sup> January 2022</p> */}
          </div>
        </PageSection>

        {/* <PageSection block>
          <div className="memberships">
            <h2 id="memberships" className="memberships-header center">
              Choose one of the following memberships
            </h2>
            <ul className="membership-list">
              <MembershipCard _id={0} />
              <MembershipCard _id={1} />
              <MembershipCard _id={2} />
            </ul>
          </div>
        </PageSection> */}
        {/* 
        <PageSection fullwidth block center className="index-signup">
          <FormSignup />
        </PageSection> */}
      </Page>
    </Layout >
  )
}

export default HomePage

export const pageQuery = graphql`
  query HomeQuery($id: String!) {
    markdownRemark(id: {eq: $id}) {
      id
      frontmatter {
        pageTitle
        tagline
        featuredImage
        heroContent {
          cta {
            text
            link
            type
          }
          text1
          text2
        }
      }
    }
  }
`
