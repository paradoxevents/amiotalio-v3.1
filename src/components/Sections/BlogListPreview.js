import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'

import { PageSection } from '../Page/Page'
import PostCard from '../Blog/PostCard'

const BlogListPreview = () => {
  const data = useStaticQuery(graphql`
  query BlogListPreviewQuery {
    blogListPreviewData: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { regex: "/blog/" } } }
      limit: 4
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
` )


  const { blogListPreviewData } = data
  const blogPosts = blogListPreviewData.edges.filter(item => item.node.frontmatter.template === "blog-post")

  return (
    <PageSection block>
      <h2>Latest articles</h2>
      <div className="blog-posts-list-box">
        {blogPosts.map(({ node }) => <PostCard key={node.id} post={node} />)}
      </div>
      <Link to="blog" className="btn">Read More</Link>
    </PageSection>
  )
}

export default BlogListPreview