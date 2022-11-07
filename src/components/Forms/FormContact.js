import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useAppContext } from '../../context/AppContext'

import { submitContactForm } from '../../api/contact'
import { contactForm } from './ValidationSchema'

import TextFormField from './FormFields/TextFormField'
import Button from '../Page/Button'
import Loading from '../Loading'

const FORM_INITIAL_VALUES = {
  name: '',
  email: '',
  phone: '',
  message: ''
}

const Form = () => {
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const [isSuccess, setSuccess] = useState(false)
  const { isLoading, setLoading } = useAppContext()

  const formik = useFormik({
    initialValues: FORM_INITIAL_VALUES,
    validationSchema: contactForm,

    onSubmit: async values => {
      setLoading(true)
      setMessage('')
      setError('')

      submitContactForm(values)
        .then(data => data.json())
        .then(() => {
          setMessage('Your message has been sent! We will be in touch.')

          formik.resetForm()
        })
        .catch(() => {
          setError('There was an error. Please try again later.')
        })
        .then(() => {
          setLoading(false)
        })
    },
  })

  return (
    <div className="form-box form-fullwidth">
      <form onSubmit={formik.handleSubmit} className="form-step-container">
        <h2>Let's Talk</h2>

        <TextFormField
          name="name"
          label="Name"
          formik={formik}
          placeholder="Adam Smith..."
          onBlur={formik.handleBlur}
          required
        />
        <TextFormField
          name="email"
          label="Email"
          formik={formik}
          placeholder="adam.smith@email.com"
          onBlur={formik.handleBlur}
          required
        />
        <TextFormField
          name="phone"
          label="Contact Number"
          formik={formik}
          placeholder="07712..."
          onBlur={formik.handleBlur}
          required
        />
        <TextFormField
          name="message"
          label="Your Message"
          formik={formik}
          placeholder="Adam Smith..."
          onBlur={formik.handleBlur}
          required
          multiline
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending..' : isSuccess ? 'Message Sent' : 'Send Message'}
        </Button>

        <Loading errorMessage={error} successMessage={message} label={'Sending your message...'} />
      </form>
    </div>
  )
}
export default Form