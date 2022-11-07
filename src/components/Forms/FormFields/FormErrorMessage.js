import React from 'react'
import FormHelperText from '@mui/material/FormHelperText'
import { RiErrorWarningLine } from 'react-icons/ri'

export const FormErrorMessage = ({ errorMessage }) => {
  return (
    <FormHelperText
      className="helper-text-warning error">
      <RiErrorWarningLine className="inline-icon" />{errorMessage}
    </FormHelperText>
  )
}