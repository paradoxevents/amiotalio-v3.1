import React, { useEffect, useState } from 'react'
import { Link, navigate } from 'gatsby'
import { useFormik } from 'formik';

import PasswordFormField from './FormFields/PasswordFormField';
import Button from '../Page/Button'
import Loading, { LoadingInline } from '../Loading'

// import { TiTick } from 'react-icons/ti'
import { PasswordResetSchema } from './ValidationSchema'

import { useAuthContext } from '../../context/AuthContext'
import { sleep } from '../../utils/helpers';

const FormResetPassword = ({ token, user }) => {
  const [formError, setFormError] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setLoading] = useState(false)
  const { resetPassword } = useAuthContext()

  // const [isNumber, setIsNumber] = useState(false)
  // const [isLength, setIsLength] = useState(false)
  // const [isLowerCase, setIsLowerCase] = useState(false)
  // const [isUpperCase, setIsUpperCase] = useState(false)
  // const [isSpecialChar, setIsSpecialChar] = useState(false)

  // const handlePassword = e => {
  //   const { value } = e.target

  //   const regexUpper = /[A-Z]+/g
  //   const regexLower = /[a-z]+/g
  //   const regexNumber = /[0-9]+/g
  //   const regexSpecial = /[!@#\$%\^&\*]+/g

  //   if (value.length >= 8) setIsLength(true)
  //   else setIsLength(false)

  //   if (value.match(regexUpper)) setIsUpperCase(true)
  //   else setIsUpperCase(false)

  //   if (value.match(regexLower)) setIsLowerCase(true)
  //   else setIsLowerCase(false)

  //   if (value.match(regexNumber)) setIsNumber(true)
  //   else setIsNumber(false)

  //   if (value.match(regexSpecial)) setIsSpecialChar(true)
  //   else setIsSpecialChar(false)

  // }

  const formik = useFormik({
    initialValues: { password: '', confirmPassword: '' },
    validationSchema: PasswordResetSchema,
    validateOnChange: true,

    onSubmit: async ({ password }) => {
      if (formError) setFormError('')

      setLoading(true)
      resetPassword(password, token)
        .then(res => {
          if (res.status !== 200) throw new Error('There was an error. Please contact support.')

          return res.json()
        })
        .then(async res => {
          // navigate('/login')
          setMessage('You have successfully changed your password. You will now be redirected to a login page.')
          setLoading(false)
          await sleep(5000)
          navigate('/login')
        })
        .catch((err) => {
          setLoading(false)

          setFormError("There was an error. Please contact support.")
        })
        .then(() => {
          setLoading(false)
        })
    },
  })

  return (
    <div className="form-box">
      <form onSubmit={formik.handleSubmit} className="form-step-container">
        <h2>Reset Password</h2>
        <p>Your email address <strong>{user}</strong></p>
        <span className='form-group-container'>
          <div className="form-guide-text">
            <p>Your new password must be minimum 8 characters long.</p>
            {/* <ul className="pass-guide-list">
              <ValidationListItem isValid={isLength} text={"minimum 8 characters"} />
              <ValidationListItem isValid={isLowerCase} text={"1 lowercase letter"} />
              <ValidationListItem isValid={isUpperCase} text={"1 uppercase letter"} />
              <ValidationListItem isValid={isNumber} text={"1 number"} />
              <ValidationListItem isValid={isSpecialChar} text={"1 special character (!, @, #, $, %, ^, &, *)"} />
            </ul> */}
          </div>
          <PasswordFormField
            name={'password'}
            label={'New password'}
            formik={formik}
            onBlur={formik.handleBlur}
          // handlePassword={handlePassword}
          />

          <PasswordFormField
            name={'passwordConfirm'}
            label={'Confirm new password'}
            formik={formik}
            onBlur={formik.handleBlur}
          // handlePassword={handlePassword}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting' : 'Submit'}
          </Button>
        </span>

        <LoadingInline
          isLoading={isLoading}
          errorMessage={formError}
          successMessage={message}
          label={'Requesting password reset...'}
          customClass="inline-center"
        />
      </form>
    </div>
  )
}
export default FormResetPassword

// export const ValidationListItem = ({ isValid, text }) => (
//   <li className={`list-item ${isValid ? 'is-valid' : ''}`}>
//     <span className="valid-icon">
//       {isValid ? <TiTick /> : '-'}
//     </span>
//     <span className="valid-text">{text}</span>
//   </li>
// )