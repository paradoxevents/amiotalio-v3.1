import React from 'react'
import { Link } from 'gatsby'

const PostCard = ({ post }) => {

  const { excerpt, frontmatter, timeToRead } = post

  return (
    <Link to={frontmatter.slug} className="post-card">
      <div
        className="post-thumb"
        style={{
          backgroundImage: `url('${frontmatter.featuredImage}')`
        }}
      >
        <div className="read-time">{timeToRead} min read</div>
      </div>
      <span className="post-date">{frontmatter.date}</span>
      <h2>{frontmatter.pageTitle}</h2>
      <div className="post-tags">
        <ul>
          {frontmatter.tags.map((tag, i) => (
            <li key={i}>{tag}</li>
          ))}
        </ul>
      </div>
      <p>{excerpt}</p>
    </Link>
  )
}

export default PostCard