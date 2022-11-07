import React from 'react'
import Animated from 'react-mount-animation'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { HiChevronDown } from 'react-icons/hi'

import Button from '../Page/Button'
import Loading from '../Loading'

import { TiTick } from 'react-icons/ti'

// load JSON data
import membershipData from '../../data/membership-plans.json'
import { useAppContext } from '../../context/AppContext'

const AccordionCard = ({ plan, handleExpand, handleSubscribe, allExpandable }) => {
  const { isLoading } = useAppContext()
  const {
    price,
    id,
    label,
    tagline,
    description,
    signUpFee
  } = membershipData["tiers"].find(item => item.label === plan)

  const fadeIn = `
    0% { opacity: 0 }
    100% { opacity: 1 }
  `

  const fadeOut = `
    0% { opacity: 1 }
    100% { opacity: 0 }
  `

  return (
    <>
      <Accordion
        id={plan}
        // disableGutters
        onChange={handleExpand}
        expanded={allExpandable[plan]}
        className={`accordion-wrapper bg-${label}`}
      >
        <AccordionSummary
          expandIcon={<HiChevronDown />}
          aria-controls={`${plan}-content`}
          id={`${plan}-header`}
          className={`accordion-summary`}
        >
          <Animated.h4
            show={!allExpandable[plan]}
            mountAnim={fadeIn}
            unmountAnim={fadeOut}
            time={.3}
            delay={.3}
            className="accordion-header"><strong className="strong">{plan}</strong> Membership Plan</Animated.h4>
          <Animated.h4
            show={allExpandable[plan]}
            mountAnim={fadeIn}
            unmountAnim={fadeOut}
            time={.3}
            delay={.3}
            className="accordion-header">Plan Details</Animated.h4>
        </AccordionSummary>
        <AccordionDetails className='accordion-details'>
          <div className={`membership-card accordion bg-${label}`}>
            <div>
              <div className="top">
                <h3 className="membership-title">{label}</h3>
                <span className="membership-title-tagline">{tagline}</span>
                <p className="membership-description">{description}</p>
              </div>
              <div className="price">
                £{price}
              </div>
              <div>per month, cancel anytime
                <div className="signup-fee">
                  {signUpFee !== 0 &&
                    `+ £${signUpFee} one time sign up and mentorship fee`
                  }
                </div>
              </div>
              <table className="membership-access">
                <tbody>
                  {membershipData["features"].filter(item => item.includedIn[0] === id).map((item, i) => (

                    <tr key={i}>
                      <td className="feature-icon">
                        <TiTick className="tick-icon" />
                      </td>
                      <td className={`feature-text ${item.isBold ? 'bold' : ''}`}>{item.label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pay">
              <Button small customClass="btn-cta" onClick={e => handleSubscribe(e, plan)} disabled={isLoading}>
                Subscribe Now
              </Button>
              <Loading spinnerColor={'#000'} label={'Creating subscription...'} />
            </div>
            {/* <div className="email-confirmation-box">
              <div className="email-confirmation-icon"><ImInfo /></div>
              <div className="email-confirmation">After the payment has been verified by one of our team members you will receive an email confirmation with a link to create an account.</div>
            </div> */}
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default AccordionCard