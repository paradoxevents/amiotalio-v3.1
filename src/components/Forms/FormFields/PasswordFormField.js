import React, { useState } from 'react'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import { FormErrorMessage } from './FormErrorMessage'

import { RiQuestionLine } from 'react-icons/ri'
import { FiEyeOff, FiEye } from 'react-icons/fi'
import { useAppContext } from '../../../context/AppContext'

const TextFormField = ({ name, label, formik, placeholder, infoText, onBlur, handlePassword = () => { } }) => {
  const { isLoading } = useAppContext()
  const [showPassword, setShowPassword] = useState(false)
  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id={`${name}-label`} shrink={false} required>{label}</InputLabel>
      <TextField
        placeholder={placeholder}
        fullWidth
        id={name}
        type={!showPassword ? 'password' : 'text'}
        name={name}
        variant="outlined"
        value={formik.values[name]}
        onChange={(e) => {
          handlePassword(e)
          formik.handleChange(e)
        }}
        onBlur={() => onBlur(name)}
        autoComplete={'off'}
        disabled={isLoading}
        InputProps={{
          endAdornment:
            <InputAdornment position="end" onClick={toggleShowPassword}>
              {showPassword ? <FiEyeOff className='show-password' /> : <FiEye className='show-password' />}
            </InputAdornment>
        }}
      />
      {
        formik.touched[name] && formik.errors[name] &&
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