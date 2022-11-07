import React from 'react'
import { HiOutlineChevronUp } from 'react-icons/hi'
import ScrollIntoView from 'react-scroll-into-view'

const BackToTop = () => {
  return (
    <ScrollIntoView selector={'#page-top'}>
      <button className="to-top">
        <span className="to-top-icon">
          <HiOutlineChevronUp />
        </span>
        <span>Back&nbsp;to&nbsp;top</span>
      </button>
    </ScrollIntoView>
  )
}

export default BackToTop
