import React from 'react'
import { graphql } from "gatsby"
import Layout from "../components/Containers/Layout"
import Seo from "../components/Seo"
import Hero from '../components/Hero/Hero'
import GoBack from '../components/Page/GoBack'

const Page = ({ data }) => {
  const { frontmatter, html, tableOfContents } = data.markdownRemark

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
      <main className="content-box">
        <GoBack />
        <article className="blog-post">
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: html }}></div>
          <aside>
            <div className="sticky-aside toc-wrapper">
              <h2>Table of Contents</h2>
              <nav
                className="table-of-contents"
                dangerouslySetInnerHTML={{ __html: tableOfContents }}></nav>
            </div>
          </aside>
        </article>
      </main>
    </Layout>
  )
}

export default Page

export const pageQuery = graphql`
  query TextPageQuery($id: String!) {
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
      tableOfContents
    }
  }
`
