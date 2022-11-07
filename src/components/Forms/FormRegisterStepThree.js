import React, { useEffect, useState } from 'react'
import PasswordFormField from './FormFields/PasswordFormField'
import StepContainer from './StepContainer'
// import { ValidationListItem } from './FormResetPassword'


const FormRegisterStepThree = ({ show, formik, handleBlur }) => {
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

  useEffect(() => {
    formik.setFieldTouched('password', false)
  }, [])

  return (
    <>
      <StepContainer show={show}>
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
          label={'Create Password'}
          formik={formik}
          onBlur={handleBlur}
        // handlePassword={handlePassword}
        />
        <PasswordFormField
          name={'passwordConfirm'}
          label={'Confirm New Password'}
          formik={formik}
          onBlur={handleBlur}
        // handlePassword={handlePassword}
        />
      </StepContainer>
    </>
  )
}

export default FormRegisterStepThree

/* 
  Step 3 (Password)
    password: '',
    passwordConfirm: ''
*/