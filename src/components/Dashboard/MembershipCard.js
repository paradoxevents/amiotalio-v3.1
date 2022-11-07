import React from 'react'
import { TiTick } from 'react-icons/ti'
import { Link } from 'gatsby'
import { ImInfo } from 'react-icons/im'

// load JSON data
import membershipData from '../../data/membership-plans.json'

const MembershipCard = ({ _id }) => {
  const [{
    price,
    id,
    label,
    tagline,
    description,
    signUpFee
  }] = membershipData["tiers"].filter(item => item.id === _id)

  return (
    <li className={`membership-card bg-${label}`}>
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
        <Link
          to={"/signup"}
          className="btn btn-cta btn-small"
          target="_blank" rel="noopener noreferrer">
          Register Now
        </Link>
      </div>
      {/* <div className="email-confirmation-box">
        <div className="email-confirmation-icon"><ImInfo /></div>
        <div className="email-confirmation">After the payment has been verified by one of our team members you will receive an email confirmation with a link to create an account.</div>
      </div> */}
    </li>
  )
}

export default MembershipCard