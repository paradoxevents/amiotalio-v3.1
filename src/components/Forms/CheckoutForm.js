import React, { useEffect, useState } from "react";
import Button from '../Page/Button'
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js"
import Loading from "../Loading";
import { useAppContext } from "../../context/AppContext";

export default function CheckoutForm({ subscriptionId, setSuccess, setActiveStep }) {
  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [isSubmitted, setSubmitted] = useState(false)
  const { isLoading, setLoading } = useAppContext()

  useEffect(() => {
    setLoading(true)
    if (!elements) {
      return
    }

    setLoading(false)
  }, [elements])

  const handleSubmit = async e => {
    e.preventDefault()

    if (!stripe || !elements) return

    setError('')
    setMessage('')
    setLoading(true);

    const BASE_URL_CONFIRM = `${process.env.GATSBY_API_ENDPOINT_BASEPATH}/updateSubscription`

    // Create payment method and confirm payment intent.
    stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://www.amiotalio.com/login',
      },
      redirect: 'if_required'
    })
      .then((result) => {
        if (result.error) {
          setError(result.error.message)
          throw new Error('Payment error occurred')
        } else {
          setMessage('Payment successful!')

          // wait 3 seconds until show final screen
          setTimeout(() => {
            // TODO add horizontal line as loader
            setActiveStep(prev => prev + 1)
            setSubmitted(true)
            setSuccess(true)
          }, 3000)

          const { id: paymentIntentId } = result.paymentIntent
          const formData = new FormData()
          formData.append('subscription_id', subscriptionId)
          formData.append('payment_id', paymentIntentId)

          return fetch(BASE_URL_CONFIRM, {
            method: "POST",
            headers: {
              Accept: "application/json"
            },
            body: formData
          })
        }
      })
      .then(res => res.json())
      .then(res => {
        // console.log(res)
      })
      .catch(err => {
        // console.log(err)
      })
      .then(() => {
        setLoading(false)
      })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.

  }

  return (
    <>
      <PaymentElement id="payment-element" />
      <div className="pay-btn-container">
        <Button
          id="submit"
          small
          customClass={"btn-cta"}
          onClick={handleSubmit}
          disabled={isLoading || isSubmitted}
        >
          Pay Now
        </Button>
      </div>
      <Loading label={"Processing payment..."} errorMessage={error} successMessage={message} />
    </>
  )
}