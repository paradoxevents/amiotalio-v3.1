import React, { useState } from 'react'
import { useFormik } from 'formik';

import { navigate } from 'gatsby'

import TextFormField from './FormFields/TextFormField';
import { CheckboxFieldGroup, CheckboxFormField } from './FormFields/CheckboxFormField'

import Button from '../Page/Button'
import { LoadingInline } from '../Loading'

import { CancelSchema } from './ValidationSchema'
import { useUserContext } from '../../context/UserContext';
import { useAuthContext } from '../../context/AuthContext';
import { sleep } from '../../utils/helpers';


const FormCancel = ({ user }) => {
  const { submitCancellation } = useUserContext()
  const { logout } = useAuthContext()
  const [formError, setFormError] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setLoading] = useState()

  const formik = useFormik({
    initialValues: {
      reason: '',
      confirm: false,
      userName: user.name,
      userEmail: user.email,
      userPhone: user.phone_no,
      stripeCustomerId: user.customer_id
    },
    validationSchema: CancelSchema,

    onSubmit: async values => {
      if (!values.reason && !values.confirm) return

      if (formError) setFormError('')
      if (message) setMessage('')
      setLoading(true)

      submitCancellation(values)
        .then(res => res.json())
        .then(async res => {
          if (res.error) throw new Error('There was an error')

          // if success loggout
          setLoading(false)
          setMessage('Your subscription has been successfuly cancelled')

          await sleep(3000)

          logout(() => {
            navigate('/')
          })
        })
        .catch(() => {
          setLoading(false)
          setFormError('There was an error')
        })
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="inline-form">

      <CheckboxFieldGroup name="confirm" formik={formik}>
        <CheckboxFormField
          formik={formik}
          name={"confirm"}
          handleCheckbox={formik.handleChange}
          label={<span>By checking this box, I agree for my account to be permanently disabled and subscription plan cancelled.</span>}
        />
      </CheckboxFieldGroup>

      <div
        style={{ marginTop: '20px' }}
      >
        <TextFormField
          name={'reason'}
          label={'Reason for cancellation'}
          formik={formik}
          onBlur={formik.handleBlur}
          required
        />
      </div>

      <Button small type="submit" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </Button>

      <LoadingInline isLoading={isLoading} errorMessage={formError} successMessage={message} label={'Submitting...'} />
    </form>
  )
}
export default FormCancel