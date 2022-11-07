import React from 'react'
import Animated from 'react-mount-animation'

const fadeIn = `
  0% { opacity: 0 }
  100% { opacity: 1 }
`

const fadeOut = `
  0% { opacity: 1 }
  100% { opacity: 0 }
`

const StepContainer = ({ children, show, animation }) => {
  return (
    <Animated.div
      show={show}
      className="form-step-container"
      mountAnim={fadeIn}
      unmountAnim={fadeOut}
      time={.3}
      delay={.29}
    >
      {children}
    </Animated.div>
  )
}

export default StepContainer