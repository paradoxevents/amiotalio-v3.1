import React, { useState } from 'react'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText'
import { FormErrorMessage } from './FormErrorMessage'

import { RiQuestionLine } from 'react-icons/ri'
import Button from '../../Page/Button';
import { useAppContext } from '../../../context/AppContext';

const TextFormField = ({ name, label, formik, placeholder, infoText, onBlur, multiline, select, required, autocomplete, children, inlineSubmit, prefix }) => {
  const { isLoading } = useAppContext()

  return (
    <FormControl fullWidth>
      <InputLabel id={`${name}-label`} shrink={false} required={required}>{label}</InputLabel>
      <TextField
        placeholder={placeholder}
        fullWidth
        id={name}
        type={'text'}
        name={name}
        variant="outlined"
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={() => onBlur(name)}
        multiline={multiline}
        select={select}
        autoComplete={autocomplete ? 'on' : 'off'}
        disabled={isLoading}
        InputProps={{
          startAdornment:
            prefix && (
              <InputAdornment
                style={{
                  marginRight: '2px',
                  color: 'rgba(0, 0, 0, 0.3)'
                }}
                position="start">
                <span>
                  {prefix}
                </span>
              </InputAdornment>
            ),
          endAdornment:
            inlineSubmit && (
              <InputAdornment position="end">
                <Button type="submit" customClass="btn-inline-submit" disabled={isLoading}>
                  {inlineSubmit}
                </Button>
              </InputAdornment>
            )
        }}
      >{children}</TextField>
      {formik.touched[name] && formik.errors[name] &&
        <FormErrorMessage errorMessage={formik.errors[name]} />
      }
      {
        infoText &&
        <FormHelperText
          className="helper-text-warning">
          <RiQuestionLine className="inline-icon" />{infoText}
        </FormHelperText>
      }
    </FormControl >
  )
}

export default TextFormField

TextFormField.defaultProps = {
  password: false,
  autocomplete: false,
  inlineSubmit: '',
  prefix: ''
}