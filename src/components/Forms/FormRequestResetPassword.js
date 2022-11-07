import React, { useState } from 'react'
import { useFormik } from 'formik';

import { TiTick } from 'react-icons/ti'

import TextFormField from './FormFields/TextFormField';
import Button from '../Page/Button'
import Loading, { LoadingInline } from '../Loading'

import { RequestPasswordResetSchema } from './ValidationSchema'

import { useAuthContext } from '../../context/AuthContext'
import { useAppContext } from '../../context/AppContext'

const FormRequestResetPassword = () => {
  const [formError, setFormError] = useState('')
  const [message, setMessage] = useState('')
  const [inlineLoading, setInlineLoading] = useState(false)
  const { isLoading, setLoading } = useAppContext()
  const { requestPasswordReset } = useAuthContext()

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: RequestPasswordResetSchema,

    onSubmit: async ({ email }) => {
      if (formError) setFormError('')
      setInlineLoading(true)

      requestPasswordReset(email)
        .then(res => res.json())
        .then(res => {
          setMessage(<p className="text-center">Your email has been submitted. If the email exists in our database you should receive an <strong>email</strong> with the reset link.</p>)
          setInlineLoading(false)
        })
        .catch(() => {
          // set error only if there is a serevr-only error
          // for security only display success message if the email has been submited to the server
          setInlineLoading(false)
          setFormError("There was an error. Please contact support.")
        })
    }
  })

  return (
    <div className="form-box">
      <form onSubmit={formik.handleSubmit} className="form-step-container">
        <h2>Request Password Reset</h2>
        {!message ? (
          <span className='form-group-container'>
            <p>Please type your email address and we will send you an email with a password reset link.</p>
            <TextFormField
              name={'email'}
              label={'Email'}
              formik={formik}
              onBlur={formik.handleBlur}
            />
            <Button type="submit" disabled={inlineLoading}>
              {inlineLoading ? 'Submitting' : 'Submit'}
            </Button>
          </span>) : <p className="form-success-notice"><TiTick className="icon" />{message}</p>}

        <LoadingInline
          isLoading={inlineLoading}
          errorMessage={formError}
          label={'Requesting password reset...'}
          center
        />
      </form>
    </div>
  )
}
export default FormRequestResetPassword