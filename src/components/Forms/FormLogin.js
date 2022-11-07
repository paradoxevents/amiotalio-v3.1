import React, { useState } from 'react'
import { Link, navigate } from 'gatsby'
import { useFormik } from 'formik'

import PasswordFormField from './FormFields/PasswordFormField'
import TextFormField from './FormFields/TextFormField'
import Button from '../Page/Button'
import Loading from '../Loading'

import { LoginSchema } from './ValidationSchema'

import { useAuthContext } from '../../context/AuthContext'
import { useAppContext } from '../../context/AppContext'

import { setLocalStorage, clearToken } from '../../utils/storage'
import { useUserContext } from '../../context/UserContext'

const FormLogin = () => {
  const [formError, setFormError] = useState('')
  const { isLoading, setLoading } = useAppContext()
  const { login, setAccessToken } = useAuthContext()
  const { user, setUser, isUserActive, setUserActive } = useUserContext()

  const formik = useFormik({
    initialValues: { email: process.env.GATSBY_TEST_USER_NAME || '', password: process.env.GATSBY_TEST_USER_PASSWORD || '' },
    validationSchema: LoginSchema,

    onSubmit: async ({ email, password }) => {
      if (formError) setFormError('')

      // 401 Unauthorized
      // 200 OK
      // access token + user
      // 200 OK
      // user

      setLoading(true)
      login(email, password)
        .then(res => res.json())
        .then(res => {
          if (!res.user) throw new Error('Unauthorized')
          setUser(res.user)
          // console.log(res.user)

          // if user active handle auth and redirect to account
          if (res.user.active || res.user.user_type === 'admin') {
            if (res.access_token.access_token) {
              const { access_token, refresh_token } = res.access_token
              setAccessToken(access_token)
              setLocalStorage(refresh_token)
              navigate('/account')
            }
          }

          if (!res.user.active) {
            navigate('/signup')
          }
        })
        .catch(err => {
          setAccessToken(null)
          clearToken()

          // if (err.message) setFormError(err.message)
          console.error('Login error', err, err)
          setFormError('Oops, it looks like there was a problem with this login attempt.')
        })
        .then(() => {
          setLoading(false)
        })
    },
  })

  return (
    <div className="form-box">
      <form onSubmit={formik.handleSubmit} className="form-step-container">
        <h2>Log In</h2>
        <h4><strong>Amio Talio University's</strong><br />Member Area</h4>
        <TextFormField
          name={'email'}
          label={'Email'}
          formik={formik}
          onBlur={formik.handleBlur}
          required
        />
        

        <PasswordFormField
          name={'password'}
          label={'Password'}
          formik={formik}
          onBlur={formik.handleBlur}
        />
        <div>Forgot password? <Link to="/passwordReset">Click here</Link> to request a reset.</div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Authorizing...' : 'Login'}
        </Button>

        <div className="register-link">
          You don't have an account yet? <Link to="/signup">Register here</Link>.
        </div>
        <Loading errorMessage={formError} label={'Authorizing...'} />
      </form>
    </div>
  )
}
export default FormLogin