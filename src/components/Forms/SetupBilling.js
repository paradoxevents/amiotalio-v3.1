import React, { useEffect, useState } from "react"
import Button from '../Page/Button'
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js"
import { LoadingInline } from "../Loading"
import { useAppContext } from "../../context/AppContext"
import { useUserContext } from "../../context/UserContext"
import { isBrowser } from "../../utils/helpers"
import { useAuthContext } from "../../context/AuthContext"

export default function SetupBillingForm({ setShowForm }) {
  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [setupIntent, setSetupIntent] = useState(null)

  useEffect(() => {
    // setLoading(true)
    if (!elements) {
      return
    }

    // setLoading(false)
  }, [elements])

  const handleSubmit = async e => {
    e.preventDefault()

    if (!stripe || !elements) return

    setError('')
    setMessage('')
    setLoading(true)

    stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: 'http://localhost:8000/account/profile'
      },
      redirect: 'if_required'
    })
      .then(data => {
        if (data.error) throw new Error(data.error.message)

        // console.log('setup intent data', data)
        setSetupIntent(data)
      })
      .catch(err => {
        setError(err.message)
      })
      .then(() => {
        setLoading(false)
      })
  }


  return (
    <>
      {setupIntent ? <BillingStatus
        setupIntentResult={setupIntent}
        setSuccess={setMessage}
        setError={setError}
        setShowForm={setShowForm}
      /> : (
        <>
          <PaymentElement id="payment-element" />
          <div className="pay-btn-container">
            <Button
              id="submit"
              small
              customClass={"btn-cta"}
              onClick={handleSubmit}
              disabled={!stripe}
            >
              Save
            </Button>
          </div>
        </>
      )}

      <LoadingInline isLoading={isLoading} label={"Saving..."} errorMessage={error} successMessage={message} />
    </>
  )
}

const BillingStatus = ({ setupIntentResult = null, setSuccess, setError, setShowForm }) => {
  const { setLoading } = useAppContext()
  const stripe = useStripe()
  const [message, setMessage] = useState('')
  const { subscriptionMeta } = useUserContext()
  const { accessToken } = useAuthContext()

  const updateSubscription = (setupIntent) => {
    const { id: setupIntentId } = setupIntent
    const { sub_id } = subscriptionMeta

    // console.log(subscriptionMeta)

    // console.log(setupIntentId, sub_id)

    const formData = new FormData()
    formData.append('payment_id', setupIntentId)
    formData.append('subscription_id', sub_id)

    const BASE_URL = `${process.env.GATSBY_API_ENDPOINT_BASEPATH}/updatePaymentMethod`
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: formData
    }

    fetch(BASE_URL, config)
      .then(res => {
        if (res.status !== 200) throw new Error('Internal Server Error: could not update payment method.')
        return res.json()
      })
      .then(() => {
        // console.log('Internal Server: request successful') 
        setTimeout(() => {
          setShowForm(false)
        }, 3 * 1000)
      })
      .catch(err => setError(err.message))
  }

  useEffect(() => {

    setLoading(false)
    if (!stripe) return

    if (!setupIntentResult) {
      if (!isBrowser()) return
      const clientSecret = new URLSearchParams(window.location.search).get('setup_intent_client_secret')

      stripe.retrieveSetupIntent(clientSecret)
        .then(({ setupIntent }) => {
          switch (setupIntent.status) {
            case 'succeeded':
              setMessage('New billing information has been saved successfuly!')
              updateSubscription(setupIntent)
              break
            case 'processing':
              setMessage('We are processing your request. Please wait and do not refresh this page.')
              break
            case 'requires_payment_method':
              setMessage('Failed to process payment details. Please try again or use different card.')
              break
          }
        })
    } else {
      switch (setupIntentResult.setupIntent.status) {
        case 'succeeded':
          setSuccess('New billing information has been saved successfuly!')
          updateSubscription(setupIntentResult.setupIntent)
          break
        case 'processing':
          setMessage('We are processing your request. Please wait and do not refresh this page.')
          break
        case 'requires_payment_method':
          setMessage('Failed to process payment details. Please try again or use different card.')
          break
      }
    }
  }, [stripe])

  return (
    <div className="result">Billing Information Update Status:</div>
  )
}