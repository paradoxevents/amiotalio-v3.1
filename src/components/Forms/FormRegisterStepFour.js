import React, { useState, useEffect } from 'react'
import Animated from 'react-mount-animation'
import AccordionCard from '../Dashboard/AccordionCard'

import CheckoutForm from "./CheckoutForm"

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { useAppContext } from '../../context/AppContext'
import { useUserContext } from '../../context/UserContext'
import StepContainer from './StepContainer'
import { theme } from './StripeTheme'
import membershipData from '../../data/membership-plans.json'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(`${process.env.GATSBY_STRIPE_PUBLIC_KEY}`)

const FormRegisterStepThree = ({ show, setSuccess, setActiveStep, activeStep }) => {
  const { isLoading, setLoading } = useAppContext(false)
  const { user } = useUserContext()

  const INITIAL_OPTIONS = {
    silver: false,
    gold: false,
    platinum: false
  }

  const [expandedOptions, setExpandnedOptions] = useState(INITIAL_OPTIONS)
  const [clientSecret, setClientSecret] = useState("")
  const [subscriptionId, setSubscriptionId] = useState("")
  const [customerId, setCustomerId] = useState("")
  const [planName, setPlanName] = useState("")
  const [error, setError] = useState("")

  const [selectedPlan, setSelectedPlan] = useState(null)

  const handleExpand = e => {
    const { id } = e.currentTarget.parentNode

    if (expandedOptions[id]) {
      setExpandnedOptions(() => (INITIAL_OPTIONS))
    } else {
      setExpandnedOptions(() => (INITIAL_OPTIONS))
      setExpandnedOptions(prev => ({ ...prev, [id]: true }))
    }
  }

  const handleSubscribe = (e, planName) => {
    e.preventDefault()

    setLoading(true)
    setError("")
    setPlanName(planName)

    const planData = membershipData.tiers.find(item => item.label === planName)
    setSelectedPlan({
      planName: planName,
      price: planData.price,
      signUpFee: planData.signUpFee
    })

    // API call
    const formData = new FormData()

    formData.append('customer_id', customerId)
    formData.append('plan', planName)

    const BASE_URL = `${process.env.GATSBY_API_ENDPOINT_BASEPATH}/createSubscription`
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: formData
    }

    fetch(BASE_URL, config)
      .then(res => res.json())
      .then(({ data }) => {
        const { id, latest_invoice } = data
        const { client_secret } = latest_invoice.payment_intent
        setSubscriptionId(id)
        setClientSecret(client_secret)
      })
      .catch(err => {
        setError(err)
      })
      .then(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (!user) return

    console.log(user)
    setCustomerId(user.customer_id)
  }, [user])

  return (
    <>
      <StepContainer show={show}>
        <Animated.div
          show={!subscriptionId}
          unmountAnim={`
          0% { opacity: 1}
          100% { opacity: 0}
        `}
          time={.3}
          className="subscription-cards"
        >

          <AccordionCard
            plan={"silver"}
            handleExpand={handleExpand}
            handleSubscribe={handleSubscribe}
            allExpandable={expandedOptions}
          />

          <AccordionCard
            plan={"gold"}
            handleExpand={handleExpand}
            handleSubscribe={handleSubscribe}
            allExpandable={expandedOptions}
          />

          <AccordionCard
            plan={"platinum"}
            handleExpand={handleExpand}
            handleSubscribe={handleSubscribe}
            allExpandable={expandedOptions}
          />

        </Animated.div>

        <Animated.div
          show={subscriptionId}
          mountAnim={`
          0% { opacity: 0}
          100% { opacity: 1}
        `}
          time={.3}
          delay={0.4}
        >
          {selectedPlan && (
            <div className="checkout-charge">
              <div className="checkout-charge--title">Total charge</div>
              <div className="checkout-charge--total">£{selectedPlan.price + selectedPlan.signUpFee}</div>
              <div className='checkout-charge--title'>Total price includes</div>
              <ul className="checkout-charge--list">
                <li className="checkout-charge--list-item">
                  base plan <span className="list-item--price">£{selectedPlan.price}</span>
                </li>
                {selectedPlan.signUpFee > 0 &&
                  <li className="checkout-charge--list-item">
                    joining fee <span className="list-item--price">£{selectedPlan.signUpFee}</span>
                  </li>
                }
              </ul>
            </div>
          )}
          <Elements stripe={stripePromise} options={{
            clientSecret: clientSecret,
            appearance: theme
          }}>
            <CheckoutForm
              subscriptionId={subscriptionId}
              setSuccess={setSuccess}
              setActiveStep={setActiveStep}
            />
          </Elements>
        </Animated.div>

      </StepContainer>
    </>
  )
}

export default FormRegisterStepThree
