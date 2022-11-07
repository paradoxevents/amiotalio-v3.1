import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Containers/Layout'
import Hero from '../components/Hero/Hero'
import Seo from '../components/Seo'
import FormSignup from '../components/Forms/FormSignup'

const Signup = ({ data }) => {
  const { frontmatter } = data.markdownRemark // data.markdownRemark holds your post data

  return (
    <Layout>
      <Seo title="Sign Up Form" />
      <Hero
        home
        picture={frontmatter.featuredImage}
        pageTitle={frontmatter.pageTitle}
        tagline={frontmatter.tagline}
        tagline2={frontmatter.tagline2}
      >
        <FormSignup />
      </Hero>
    </Layout>
  )
}

export default Signup

export const pageQuery = graphql`
  query SignUpQuery($id: String!) {
    markdownRemark(id: {eq: $id}) {
      id
      frontmatter {
        pageTitle
        tagline
        tagline2
        featuredImage
      }
    }
  }
`