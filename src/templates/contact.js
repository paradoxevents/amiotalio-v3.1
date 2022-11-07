import React from 'react'
import { graphql } from "gatsby"
import Layout from "../components/Containers/Layout"
import Seo from "../components/Seo"
import Hero from '../components/Hero/Hero'
import Page, { PageSection } from '../components/Page/Page'
import FormContact from '../components/Forms/FormContact'

import { FiPhoneCall, FiMail } from 'react-icons/fi'
// import { FaBusinessTime } from 'react-icons/fa'
import { BiMap } from 'react-icons/bi'

import contact from '../data/contact_info.json'


const ContactPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const { address, phone, email } = contact

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
        <PageSection block className="contact">
          <FormContact />
          <div>
            <section>
              <h2 className="contact-details-header">Contact Details</h2>
              <p>We're committed to helping you in any way we can. Leave us a note and we'll get in touch with you shortly.</p>
              <div className="contact-detail">
                <FiPhoneCall className="contact-icon" />
                <div>
                  {phone.mobile}
                </div>
              </div>
              <div className="contact-detail">
                <BiMap className="contact-icon" />
                <div>
                  {address["line-1"]}, {address["line-2"]}<br />
                  {address.city}, {address.postcode}
                </div>
              </div>
              <div className="contact-detail">
                <FiMail className="contact-icon" />
                <div>
                  {email.support}
                </div>
              </div>
            </section>
            {/* <section>
              <h2>Business Hours</h2>
              <div className="contact-detail">
                <FaBusinessTime className="contact-icon" />
                <div className="business-hours">
                  <div>
                    Mon - Fri: 9:00 - 17:00
                  </div>
                  <div>
                    Weekends - closed
                  </div>
                </div>
              </div>
            </section> */}
          </div>
        </PageSection>
        {/* 
        <PageSection fullwidth className="map">
          Map
        </PageSection> */}
      </Page>
    </Layout>
  )
}

export default ContactPage

export const contactPageQuery = graphql`
  query ContactQuery($id: String!) {
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
