import React, { useState } from 'react'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import FormGroup from '@mui/material/FormGroup'
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText'
import { FormErrorMessage } from './FormErrorMessage'

import { RiQuestionLine } from 'react-icons/ri'
import { useAppContext } from '../../../context/AppContext';

const PhoneNumberField = ({ name, label, formik, infoText, onBlur, required }) => {
  const { isLoading } = useAppContext()

  return (
    <FormControl fullWidth>
      <InputLabel id={`${name}-label`} shrink={false} required={required}>{label}</InputLabel>
      <FormGroup
        style={{
          flexDirection: 'row',
        }}
      >
        <TextField
          style={{ maxWidth: '10ch', marginRight: '20px'}}
          fullWidth={false}
          id={'countryCode'}
          name={'countryCode'}
          type={'text'}
          variant="outlined"
          value={formik.values.countryCode}
          onChange={formik.handleChange}
          onBlur={() => onBlur('countryCode')}
          autoComplete='off'
          disabled={isLoading}
          InputProps={{
            startAdornment:
              <InputAdornment
                style={{
                  marginRight: '2px',
                  color: 'rgba(0, 0, 0, 0.3)'
                }}
                position="start">
                <span>
                  +
                </span>
              </InputAdornment>
          }}
        />
        <TextField
          style={{ flexGrow: '1'}}
          fullWidth={false}
          id={name}
          type={'tel'}
          name={name}
          variant="outlined"
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={() => onBlur(name)}
          autoComplete='off'
          disabled={isLoading}
        />
      </FormGroup>
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

export default PhoneNumberField