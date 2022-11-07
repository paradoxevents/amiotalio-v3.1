import React from 'react'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { FormErrorMessage } from './FormErrorMessage'
import { useAppContext } from '../../../context/AppContext'

export const CheckboxFormField = ({ name, label, formik, handleCheckbox }) => {
  const { isLoading } = useAppContext()

  return (
    <FormControlLabel control={
      <Checkbox
        // disabled={formDisabled}
        name={name}
        checked={formik.values[name]}
        onChange={handleCheckbox}
        inputProps={{ 'aria-label': 'controlled' }}
        disabled={isLoading}
        sx={{
          color: 'var(--clr-gold)',
          '&.Mui-checked': {
            color: 'var(--clr-gold)',
          },
        }}
      />}
      label={label} />
  )
}

export const CheckboxFieldGroup = ({ name, title, formik, children, required }) => {
  return (
    <FormControl fullWidth variant="standard" component="fieldset" className="checkbox-group">
      {title && <InputLabel id={name} shrink={false} required={required} className="checkbox-group-label">{title}</InputLabel>}
      {children}
      {formik.touched[name] && formik.errors[name] &&
        <FormErrorMessage errorMessage={formik.errors[name]} />
      }
    </FormControl>
  )
}