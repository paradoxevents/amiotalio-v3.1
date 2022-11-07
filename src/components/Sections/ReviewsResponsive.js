import React, { useLayoutEffect, useState } from 'react'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri'
import { BsStarFill, BsStar } from 'react-icons/bs'

import useWindowResize from '../hooks/useWindowResize'
import _reviews from '../../data/mock_reviews.json'

const Review = ({ review }) => {
  const { date, author, body, rating } = review

  return (
    <div className="review-card">
      <p>{date}</p>
      <h2>
        <strong>{author}</strong>
      </h2>
      <div>
        {
          Array(5).fill(true).map((_, i) => i < rating
            ? <BsStarFill key={i} className="star-icon -fill" />
            : <BsStar key={i} className="star-icon -outline" />)
        }
      </div>
      <p>{body}</p>
    </div>
  )
}

const Reviews = () => {
  const { reviews } = _reviews
  const { width } = useWindowResize(50)

  const [maxItemsPerSlide, setMaxItemsPerSlide] = useState(1)
  const [totalSlides, setTotalSlides] = useState(reviews.length)

  const getTotalSlides = () => Math.ceil(reviews.length / maxItemsPerSlide)

  useLayoutEffect(() => {
    handleResize()
  }, [width, totalSlides, maxItemsPerSlide])

  const handleResize = () => {
    const breakpoints = {
      sm: 600,
      md: 1000,
      lg: 1400,
    }

    if (width <= breakpoints.sm) setMaxItemsPerSlide(1)
    if (width > breakpoints.sm && width <= breakpoints.md) setMaxItemsPerSlide(2)
    if (width > breakpoints.md && width <= breakpoints.lg) setMaxItemsPerSlide(3)
    if (width > breakpoints.lg) setMaxItemsPerSlide(4)

    setTotalSlides(getTotalSlides())
  }

  const renderSlides = () => {
    // let maxItemsPerSlide = 3
    // let totalSlides = 2
    let totalItemsCount = reviews.length
    let count = 0
    let slidesArr = []

    for (let s = 0; s < totalSlides; s++) {
      let itemsArr = []
      for (let i = 0; i < maxItemsPerSlide; i++) {

        if (count < totalItemsCount) {
          itemsArr.push(<Review review={reviews[count]} />)
          count++
        }
      }
      slidesArr.push(<Slide index={s} className={`carousel--slide review-slide slide-grid-${maxItemsPerSlide}`}>{itemsArr}</Slide>)
    }

    return slidesArr
  }

  return (
    <section className="section full-width reviews">
      <h3 className="text-center section-header">
        What our customers have to say about us
      </h3>
      <CarouselProvider
        totalSlides={totalSlides}
        interval={3000}
        isIntrinsicHeight
      >
        <Slider className="carousel--slider">
          {renderSlides()}
        </Slider>

        <ButtonBack className="btn-carousel btn-carousel--prev">
          <RiArrowLeftLine />
          Prev
        </ButtonBack>

        <ButtonNext className="btn-carousel btn-carousel--next">
          Next
          <RiArrowRightLine />
        </ButtonNext>
        <DotGroup />
      </CarouselProvider>
    </section>
  )
}

export default Reviews