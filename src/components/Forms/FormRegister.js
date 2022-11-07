import React, { useState } from 'react'
import { Link } from 'gatsby'

import { useFormik } from 'formik';
import * as yup from 'yup';

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'

import Button from '../Page/Button'

const ValidationSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Given name is too short')
    .max(70, 'Given name is too long')
    .required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  password: yup
    .string()
    .min(8, 'Password have to be minimum 8 characters')
    .max(20, 'Password have to be maximum 20 characters')
    .required('Password is required'),
  passwordConfirm: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
});

const Form = () => {

  const [formSubmitState, setSubmitState] = useState({ message: '', status: '' })
  const [formSending, setFormSending] = useState(false)
  const [formDisabled, setFormDisabled] = useState(false)
  const [isSuccess, setSuccess] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      const formData = {
        name: values.name,
        email: values.email,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
      }

      // const requestOptions = {
      //   method: 'POST',
      //   mode: 'cors',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Origin': '*'
      //   },
      //   body: JSON.stringify(formData)
      // };

      // fetch('http://localhost:5000/submit', requestOptions)
      // setFormSending(true)
      // setFormDisabled(true)
      // fetch('https://amiotalio-signup-server.herokuapp.com/email', requestOptions)
      //   .then(response => response.json())
      //   .then(data => {
      //     setSubmitState({ message: data.message, status: 'success' })
      //     setFormSending(false)
      //     setSuccess(true)
      //   }).catch(err => {
      //     setSubmitState({ message: err.message, status: 'error' })
      //     setFormSending(false)
      //     setFormDisabled(false)
      //   });
    },
  })

  return (
    <div className="form-box">
      <form onSubmit={formik.handleSubmit}>
        <h2>Register now</h2>
        <h4>to become a Member of <strong>Amio Talio University</strong></h4>

        <p>Have an account already? <Link to="/members">Log in here </Link></p>

        <FormControl fullWidth>
          <InputLabel id="name" shrink={false} required>Name</InputLabel>
          <TextField
            disabled={formDisabled}
            placeholder="Adam Smith.."
            fullWidth
            id="name"
            name="name"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="email" shrink={false} required>Email</InputLabel>
          <TextField
            disabled={formDisabled}
            placeholder="adam@email.com.."
            fullWidth
            id="email"
            name="email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="password" shrink={false} required>Password</InputLabel>
          <TextField
            disabled={formDisabled}
            fullWidth
            id="password"
            type="password"
            name="password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="password-confirm" shrink={false} required>Confirm password</InputLabel>
          <TextField
            disabled={formDisabled}
            fullWidth
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            variant="outlined"
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
            helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
          />
        </FormControl>


        <Button type="submit" disabled={formDisabled}>
          {formSending ? 'Sending request..' : isSuccess ? 'Success' : 'Submit'}
        </Button>
        {formSubmitState.message !== '' && <span className={formSubmitState.status !== '' ? formSubmitState.status === 'error' ? 'formError' : 'formSuccess' : ''}>
          {formSubmitState.message}
        </span>}
      </form>
    </div>
  )
}
export default Form