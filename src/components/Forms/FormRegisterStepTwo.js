import React from 'react'
import TextFormField from './FormFields/TextFormField'
import StepContainer from './StepContainer'

// TODO: validation for telegram (remove required '@' symbol)

const FormRegisterStepTwo = ({ show, formik, handleBlur, handleCheckbox }) => {
  return (
    <>
      <StepContainer show={show}>
        <TextFormField
          name={'discord'}
          label={'Your Discord Username'}
          placeholder={"username#1234"}
          formik={formik}
          onBlur={handleBlur}
          required
        />
        <TextFormField
          name={'telegram'}
          label={'Your Telegram Username'}
          placeholder={"username"}
          formik={formik}
          onBlur={handleBlur}
          prefix="@"
          required
        />
      </StepContainer>
    </>
  )
}

export default FormRegisterStepTwo