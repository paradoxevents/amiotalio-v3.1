import React from 'react'
import { Link } from 'gatsby'
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri'

const Pagination = ({ next, previous }) => {
  return (
    <nav className="pagination">
      <ul>
        <li>
          {next && next.frontmatter.template === "blog-post" && (
            <Link to={next.frontmatter.slug} rel="next">
              <div className="pagination-layout -left">
                <div className="pagination-nav">
                  <RiArrowLeftLine />
                  <div>Next Post</div>
                </div>
                <div className="post-title">{next.frontmatter.pageTitle}</div>
                <div className="post-date">{next.frontmatter.date}</div>
              </div>
            </Link>
          )}
        </li>
        <li>
          {previous && previous.frontmatter.template === "blog-post" && (
            <Link to={previous.frontmatter.slug} rel="prev">
              <div className="pagination-layout -right">
                <div className="pagination-nav">
                  <div>Previous Post</div>
                  <RiArrowRightLine />
                </div>
                <div className="post-title">{previous.frontmatter.pageTitle}</div>
                <div className="post-date">{previous.frontmatter.date}</div>
              </div>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
