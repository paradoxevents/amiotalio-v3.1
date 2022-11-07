import React from 'react'
import { graphql } from 'gatsby'
import Hero from '../components/Hero/Hero'
import Page, { PageSection } from '../components/Page/Page'
import Layout from '../components/Containers/Layout'
import Seo from '../components/Seo'
import PostCard from '../components/Blog/PostCard'

const BlogPage = ({ data }) => {
  const { blogListData } = data

  const pageTemplateData = blogListData.edges.find(item => item.node.frontmatter.template === "blog-list")
  const { pageTitle, tagline, featuredImage, imagePosition } = pageTemplateData.node.frontmatter

  const blogPosts = blogListData.edges.filter(item => item.node.frontmatter.template === "blog-post")

  return (
    <Layout>
      <Seo title={pageTitle} />
      <Hero
        pageTitle={pageTitle}
        tagline={tagline}
        picture={featuredImage}
        picturePosition={imagePosition}
      />
      <Page showBackBtn>
        <PageSection>
          <h2>Latest articles</h2>
          <div className="blog-posts-list-box">
            {blogPosts.map(({ node }) => <PostCard key={node.id} post={node} />)}
          </div>
        </PageSection>
      </Page>
    </Layout>
  )
}

export default BlogPage

export const pageQuery = graphql`
  query BlogListQuery($skip: Int!, $limit: Int!) {
    blogListData: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { regex: "/blog/" } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            pageTitle
            tagline
            template
            featuredImage
            imagePosition
            tags
          }
        }
      }
    }
  }
`