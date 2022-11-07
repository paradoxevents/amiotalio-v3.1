import React from 'react'
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
  if (!reviews) return null

  const { reviews } = _reviews
  let totalItemsCount = reviews.length

  return (
    <section className="section full-width reviews">
      <h3 className="text-center section-header">
        What our customers have to say about us
      </h3>
      <CarouselProvider
        totalSlides={totalItemsCount}
        interval={3000}
        isIntrinsicHeight
      >
        <Slider className="carousel--slider">
          {reviews.map((item, i) => (
            <Slide index={i} className={`carousel--slide review-slide slide-grid-1`}>
              <Review review={item} />
            </Slide>
          ))}
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