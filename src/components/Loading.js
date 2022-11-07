import React from 'react'
import Animated from 'react-mount-animation'
import Spinner from '../assets/svg/rolling-spinner.svg'
import { useAppContext } from '../context/AppContext'

const Loading = ({ errorMessage, successMessage, label, customClass }) => {
  const { isLoading } = useAppContext()

  return (
    <>
      {
        errorMessage && (
          <div className="info-bubble-wrapper">
            <div className="info-bubble error">{errorMessage}</div>
          </div>
        )
      }
      {
        successMessage && !errorMessage && (
          <div className="info-bubble-wrapper">
            <div className="info-bubble success">{successMessage}</div>
          </div>
        )
      }
      <div className={`form-processing-status fade-in ${customClass}`}>
        {isLoading && (
          <>
            <Spinner className={`spinner`} />
            <div className="loading-text">{label}</div>
          </>
        )
        }
      </div>
    </>
  )
}

export default Loading

Loading.defaultProps = {
  label: '',
  errorMessage: '',
  successMessage: '',
  customClass: ''
}

export const LoadingInline = ({ isLoading, errorMessage, successMessage, label, customClass }) => {

  return (
    <Animated.div
      show={isLoading || errorMessage || successMessage}
      time={.2}
      mountAnim={`
        0% { opacity: 0 }
        100% { opacity: 1 }
      `}
      unmountAnim={`
        0% { opacity: 1 }
        100% { opacity: 0 }
      `}
      className={`form-processing-status inline fade-in ${customClass}`}
    >
      {isLoading && (
        <>
          <Spinner className={`spinner`} />
          <div className="loading-text">{label}</div>
        </>
      )
      }
      {
        errorMessage && (
          <div className="info-bubble error">{errorMessage}</div>
        )
      }
      {
        successMessage && !errorMessage && (
          <div className="info-bubble success">{successMessage}</div>
        )
      }
    </Animated.div>
  )
}

LoadingInline.defaultProps = {
  label: '',
  isLoading: false,
  errorMessage: '',
  successMessage: '',
  customClass: ''
}