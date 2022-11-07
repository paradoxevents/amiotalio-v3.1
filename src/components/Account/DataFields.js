import React, { useState } from 'react'
import Animated from 'react-mount-animation'
import { TiTick, TiInfoOutline } from 'react-icons/ti'
import { RiErrorWarningLine } from 'react-icons/ri'
import FormEditUserData from '../Forms/FormEditUserData'
import { getDateFormated } from '../../utils/helpers'
import { Elements } from '@stripe/react-stripe-js'
import { theme } from '../Forms/StripeTheme'
import { useAuthContext } from '../../context/AuthContext'
import { LoadingInline } from '../Loading'
import SetupBilling from '../Forms/SetupBilling'

import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(`${process.env.GATSBY_STRIPE_PUBLIC_KEY}`)

// dev constant
const ENABLE_EDIT = true

export const ProfileDataset = ({ title, children }) => {
  return (
    <>
      <h3 className="profile-dataset-title">{title}</h3>
      <section className="profile-dataset-group">
        {children}
      </section>
    </>
  )
}

export const TextField = ({ title, value, editable, customClass, required = false }) => {
  const [form, showForm] = useState(false)
  const toggleForm = () => showForm(prev => !prev)

  return (
    <div className="data-field-group">
      <h3 className={`data-field-title ${required && !value ? 'error' : ''}`}>{title}</h3>
      <p className={`data-field-value ${customClass}`}>
        {value ? value : (
          <div className="info-bubble error" style={{ marginBottom: '10px' }}>
            <RiErrorWarningLine className="inline-icon" />This field is required for full access
          </div>
        )}
      </p>
      {editable && ENABLE_EDIT &&
        <>
          <div className="edit-tools">
            <button onClick={() => toggleForm()} className='btn btn-inline'>{form ? 'Cancel' : !value ? 'Add Value' : 'Edit'}</button>
          </div>
          <Animated.div
            className="inline-form"
            show={form}
            time={.2}
            mountAnim={`
              0% { opacity: 0 }
              100% { opacity: 1 }
            `}
            unmountAnim={`
              0% { opacity: 1 }
              100% { opacity: 0 }
            `}
          >
            <FormEditUserData field={title} label={title} showForm={showForm} />
          </Animated.div>
        </>
      }
    </div>
  )
}

export const BooleanField = ({ title, value }) => {
  return (
    <div className="data-field-group">
      <h3 className="data-field-title">{title}</h3>
      <div className="data-field-value">{value ? "Yes" : "No"}</div>
      {ENABLE_EDIT &&
        <div className="edit-tools">
          <button className='btn btn-inline'>Edit</button>
        </div>
      }
    </div>
  )
}

export const EmailField = ({ title, value }) => {
  const [form, showForm] = useState(false)
  const toggleForm = () => showForm(prev => !prev)

  return (
    <div className="data-field-group">
      <h3 className="data-field-title">{title}</h3>
      <div className="data-field-value email-field-value">{value}</div>
      {ENABLE_EDIT &&
        <>
          <div className="edit-tools">
            {/* <button onClick={() => toggleForm()} className='btn btn-inline'>{form ? 'Cancel' : 'Change email'}</button> */}
            {/* <button className='btn btn-inline'>Add secondary email</button> */}
            {/* <button className='btn btn-inline'>Resend verification</button> */}
          </div>
        </>
      }
    </div>
  )
}

export const MembershipTierField = ({ value }) => {
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [clientSecret, setClientSecret] = useState("")

  const [isLoading, setLoading] = useState(false)
  const { accessToken } = useAuthContext()

  const toggleForm = () => {
    if (showForm) {
      setShowForm(false)
      return
    }

    setLoading(true)
    setError('')
    setMessage('')
    getClientSecret()
      .then(res => {
        if (res.status !== 200) throw new Error(`Server Error`)

        return res.json()
      })
      .then(data => {
        setClientSecret(data.data.client_secret)
        setShowForm(true)
      })
      .catch(err => {
        setError(err.message)
      })
      .then(() => {
        setLoading(false)
      })

  }

  const getClientSecret = () => {
    const BASE_URL = `${process.env.GATSBY_API_ENDPOINT_BASEPATH}/setupIntent`
    const config = {
      method: 'POST',
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    }

    return fetch(BASE_URL, config)
  }

  return (
    <div className="data-field-group">
      <h3 className="data-field-title">Tier</h3>
      <div className="data-field-value capitalize-field-value">{value}</div>
      {ENABLE_EDIT &&
        <>
          <div className="edit-tools">
            {/* {value !== "platinum" && <button className='btn btn-inline'>Upgrade Plan</button>} */}
            <button onClick={() => toggleForm()} className='btn btn-inline'>{showForm && clientSecret ? 'Cancel' : 'Update Billing Information'}</button>
          </div>
          <Animated.div
            className="inline-form"
            show={showForm && clientSecret}
            time={.2}
            mountAnim={`
            0% { opacity: 0 }
            100% { opacity: 1 }
          `}
            unmountAnim={`
            0% { opacity: 1 }
            100% { opacity: 0 }
          `}
          >
            <Elements stripe={stripePromise} options={{
              clientSecret: clientSecret,
              appearance: theme
            }}>
              <SetupBilling setShowForm={setShowForm} />
            </Elements>
          </Animated.div>
        </>
      }
      <LoadingInline isLoading={isLoading} errorMessage={error} successMessage={message} />
    </div>
  )
}

export const NotAMember = () => {
  return (
    <div className="data-field-group">
      <h3 className="data-field-title">Tier</h3>
      <div className="data-field-value text-transform-unset">You do not have a paid plan yet</div>
      {ENABLE_EDIT &&
        <div className="edit-tools">
          <button className='btn btn-inline'>Upgrade Plan</button>
        </div>
      }
    </div>
  )
}

export const PaymentStatusField = ({ title, status = '', date }) => {

  let Icon = null
  let statusClass = ''
  switch (status) {
    case "incomplete":
      Icon = TiInfoOutline
      statusClass = "warning"
      break
    case "past_due":
      Icon = TiInfoOutline
      statusClass = "error"
      break
    case "complete":
      Icon = TiTick
      statusClass = "success"
      break
    default:
      statusClass = ""
      break
  }

  const _date = getDateFormated(date)
  const _status = status.replace(/[_]/g, " ")

  return (
    <div className="data-field-group">
      <h3 className="data-field-title">{title}</h3>
      <div className="data-field-value payment-status">

        <div className="payment-status-title cell-A1">
          Status
        </div>

        <div className="payment-status-value cell-A2">
          <div className={`info-bubble ${statusClass || ''}`}>
            {Icon && <Icon className="inline-icon" />}
            {_status || 'inactive'}
          </div>
        </div>


        <div className="payment-status-title cell-B1">
          Last payment date
        </div>

        <div className="payment-status-value cell-B2">
          {_date}
        </div>
      </div>
    </div>
  )
}