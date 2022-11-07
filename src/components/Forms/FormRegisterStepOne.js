import React from 'react'
import TextFormField from './FormFields/TextFormField'
import PhoneNumberField from './FormFields/PhoneNumberField'
import PasswordFormField from './FormFields/PasswordFormField'
import { CheckboxFieldGroup, CheckboxFormField } from './FormFields/CheckboxFormField'
import StepContainer from './StepContainer'


const FormRegisterStepOne = ({ show, formik, handleBlur, handleCheckbox, isLoading = false }) => {
  return (
    <>
      <StepContainer show={show}>
        <TextFormField
          name={'email'}
          label={'Email'}
          formik={formik}
          placeholder='adam.smith@text.com'
          onBlur={handleBlur}
          isLoading={isLoading}
        />
        <PasswordFormField
          name={'password'}
          label={'Create Password'}
          formik={formik}
          onBlur={handleBlur}
        />
        <PasswordFormField
          name={'passwordConfirm'}
          label={'Confirm New Password'}
          formik={formik}
          onBlur={handleBlur}
        />

        <CheckboxFieldGroup name="agreePrivacy" formik={formik}>
          <CheckboxFormField
            formik={formik}
            name={"agreePrivacy"}
            handleCheckbox={handleCheckbox}
            label={<span>By checking this box, I agree to the{" "}
              <a href="https://amiotalio.com/privacy-policy">T&C's</a> and the{" "}
              <a href="https://amiotalio.com/privacy-policy">Privacy Policy</a>
            </span>}
          />
        </CheckboxFieldGroup>
      </StepContainer>
    </>
  )
}

export default FormRegisterStepOne

/* 
  Step 1 (User Details)
    name: '',
    email: '' Fetch API is email unique
    phone: '',
    age: 0,
    agreeTerms: false,
    agreePrivacy: false,
*/