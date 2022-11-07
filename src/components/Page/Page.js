import React from 'react'
import cx from 'classnames'
import GoBack from './GoBack'

export const PageSection = ({ children, fullwidth, block, center, className }) => (
  <section className={cx(
    className,
    !fullwidth ? 'content-box' : null,
    block ? 'content-block' : null,
    center ? 'content-center' : null,
  )}>
    {children}
  </section>
)

PageSection.defaultProps = {
  fullwidth: false,
  center: false,
  block: false
}

const Page = ({ children, className, showBackBtn }) => {
  return (
    <main className={
      cx(
        "page",
        className
      )
    }>
      {showBackBtn &&
        <header className="content-box page-header">
          <GoBack />
        </header>
      }
      {children}
    </main>
  )
}

Page.defaultProps = {
  showBackBtn: false
}

export default Page
