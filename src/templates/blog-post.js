import React from 'react'
import { graphql } from "gatsby"
import Layout from "../components/Containers/Layout"
import Seo from "../components/Seo"
import Hero from '../components/Hero/Hero'
import Pagination from '../components/Blog/Pagination'
import Page, { PageSection } from '../components/Page/Page'

const BlogPost = ({ data, pageContext }) => {
  const { frontmatter, html, tableOfContents } = data.markdownRemark
  const imageUrl = frontmatter.featuredImage
    ? frontmatter.featuredImage
    : ""

  const { previous, next } = pageContext

  let props = {
    previous,
    next,
  }

  return (
    <Layout>
      <Seo title="Home" />
      <Hero
        picture={imageUrl}
        preTitle="Amio Talio's Blog"
        pageTitle={frontmatter.pageTitle}
        tagline={frontmatter.tagline}
        tagline2={frontmatter.tagline2}
      />
      <Page showBackBtn>
        <PageSection className="blog-post">
          <aside>
            <div className="sticky-aside toc-wrapper">
              <h2>Table of Contents</h2>
              <nav
                className="table-of-contents"
                dangerouslySetInnerHTML={{ __html: tableOfContents }}></nav>
            </div>
          </aside>
          <article>
            <header className="post-meta">
              <div className="post-date">{frontmatter.date}</div>
              <div className="post-tags"><span className="meta-title">Tags:</span>{" "}
                <ul>
                  {frontmatter.tags.map((tag, i) => (
                    <li key={i}>{tag}</li>
                  ))}
                </ul>
              </div>
            </header>
            <section className="blog-content" dangerouslySetInnerHTML={{ __html: html }}></section>
          </article>
        </PageSection>
        <PageSection>
          {(previous || next) && <Pagination {...props} />}
        </PageSection>
      </Page>
    </Layout>
  )
}

export default BlogPost

export const blogPostQuery = graphql`
  query blogPostQuery($id: String!) {
    markdownRemark(id: {eq: $id}) {
      id
      frontmatter {
        pageTitle
        date(formatString: "MMMM DD, YYYY")
        tagline
        tagline2
        featuredImage
        imagePosition
        tags
      }
      html
      tableOfContents
    }
  }
`
