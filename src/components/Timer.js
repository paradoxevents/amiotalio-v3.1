import React, { useState, useEffect, useRef } from 'react'

const Timer = () => {
  useEffect(() => {
    fetch('https://atu-server.herokuapp.com/get-time')
      .then(res => res.json())
      .then(({ d }) => {
        setLaunchTime(new Date(d))
      })
  }, [])

  const [launchTime, setLaunchTime] = useState(0)

  const calculateTimeLeft = () => {
    const TZdiff = new Date().getTimezoneOffset() / 60000
    const now = new Date().valueOf() + TZdiff
    const difference = launchTime.valueOf() - now

    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    } else {
      timeLeft = null
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
  const ref = useRef()

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
  })

  useEffect(() => {
    if (ref.current) {
      ref.current.classList.add('seconds')
    }
  }, [timeLeft])

  if (!timeLeft) return null
  if (timeLeft) return (
    <div className='timer-wrapper'>
      <div className="timer-value-group">
        <div className="timer-value">
          {timeLeft.days}
        </div>
        <div className="timer-label">days</div>
      </div>

      <div className="timer-value-group">
        <div className="timer-value">
          {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}
        </div>
        <div className="timer-label">hours</div>
      </div>

      <div className="timer-value-group">
        <div className="timer-value">
          {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}
        </div>
        <div className="timer-label">minutes</div>
      </div>

      <div className="timer-value-group">
        <div ref={ref} className="timer-value">
          {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
        </div>
        <div className="timer-label">seconds</div>
      </div>
    </div>
  )
}

export default Timer