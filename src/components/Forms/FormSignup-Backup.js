import React, { useState } from 'react'

import { Link } from '@reach/router';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'

import { RiErrorWarningLine, RiQuestionLine } from 'react-icons/ri'

import Button from '../Page/Button'

const phoneRegExp = /((\+44(\s\(0\)\s|\s0\s|\s)?)|0)7\d{3}(\s)?\d{6}/

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
  phone: yup
    .string().matches(phoneRegExp, 'Given phone number is not valid')
    .required('Phone number is required'),
  age: yup
    .number('Please enter a valid age')
    .min(16, 'You have to be minimum 16 years old')
    .max(120, 'Please enter a valid age')
    .required('Age is required'),
  invest: yup
    .string()
    .required('Please enter estimated investment value'),
  agree: yup
    .boolean().oneOf([true], 'You have to agree to Privacy Policy terms before submitting the form')
});

const Form = () => {
  const [formSubmitState, setSubmitState] = useState({ message: '', status: '' })
  const [formSending, setFormSending] = useState(false)
  const [formDisabled, setFormDisabled] = useState(false)
  const [isSuccess, setSuccess] = useState(false)

  const formik = useFormik({
    // prod initaial values
    initialValues: {
      name: '',
      email: '',
      phone: '',
      age: '',
      learnTrade: false,
      learnBusiness: false,
      learnExpand: false,
      learnCryptoInvest: false,
      learnCrypto: false,
      learnCryptoNew: false,
      joinVip: false,
      mentorship: false,
      invest: '',
      message: '',
      agree: false,
    },

    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      const learnValues = []

      if (values.learnCrypto) learnValues.push('learn crypto')
      if (values.learnCryptoInvest) learnValues.push('invest in crypto')
      if (values.learnCryptoNew) learnValues.push('crypto newbie')
      if (values.learnTrade) learnValues.push('trade')
      if (values.learnBusiness) learnValues.push('start business')
      if (values.learnExpand) learnValues.push('expand business')

      const formData = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        age: values.age,
        learn: '', // data field deprecated
        invest: values.invest,
        joinVip: values.joinVip,
        mentorship: values.mentorship,
        agree: values.agree,
        message: values.message,
        learnTo: learnValues,
      }

      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(formData)
      };
      // fetch('http://localhost:5000/submit', requestOptions)
      setFormSending(true)
      setFormDisabled(true)
      fetch('https://atu-server.herokuapp.com/submit', requestOptions)
        .then(response => response.json())
        .then(data => {
          setSubmitState({ message: data.message, status: 'success' })
          setFormSending(false)
          setSuccess(true)
        }).catch(err => {
          setSubmitState({ message: err.message, status: 'error' })
          setFormSending(false)
          setFormDisabled(false)
        });
    },
  });

  return (
    <div className="form-box">
      <form onSubmit={formik.handleSubmit}>
        <h2 className="center">Become a Member</h2>
        <p>
          Sign up now and you will have accesss to all the free courses and tutorials, Teachables and Discord when we launch.
        </p>

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
          <InputLabel id="phone" shrink={false} required>Phone Number</InputLabel>
          <TextField
            disabled={formDisabled}
            placeholder="07..."
            fullWidth
            id="phone"
            name="phone"
            variant="outlined"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="age" shrink={false} required>Age</InputLabel>
          <TextField
            disabled={formDisabled}
            placeholder="31.."
            fullWidth
            id="age"
            name="age"
            variant="outlined"
            value={formik.values.age}
            onChange={formik.handleChange}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age}
          />
        </FormControl>

        <FormControl fullWidth variant="standard" component="fieldset" className="checkbox-group">
          <InputLabel id="learn" shrink={false} required className="checkbox-group-label">I want to learn how to</InputLabel>
          <FormGroup>
            <FormControlLabel control={
              <Checkbox
                disabled={formDisabled}
                name="learnExpand"
                checked={formik.values.learnExpand}
                onChange={formik.handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{
                  color: 'var(--clr-gold)',
                  '&.Mui-checked': {
                    color: 'var(--clr-gold)',
                  },
                }}
              />}
              label={<span>Grow my existing business</span>} />

            <FormControlLabel control={
              <Checkbox
                disabled={formDisabled}
                name="learnBusiness"
                checked={formik.values.learnBusiness}
                onChange={formik.handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{
                  color: 'var(--clr-gold)',
                  '&.Mui-checked': {
                    color: 'var(--clr-gold)',
                  },
                }}
              />}
              label={<span>Start a new business</span>} />

            <FormControlLabel control={
              <Checkbox
                disabled={formDisabled}
                name="learnTrade"
                checked={formik.values.learnTrade}
                onChange={formik.handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{
                  color: 'var(--clr-gold)',
                  '&.Mui-checked': {
                    color: 'var(--clr-gold)',
                  },
                }}
              />}
              label={<span>Buy stocks and shares</span>} />

            <FormControlLabel control={
              <Checkbox
                disabled={formDisabled}
                name="learnCryptoInvest"
                checked={formik.values.learnCryptoInvest}
                onChange={formik.handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{
                  color: 'var(--clr-gold)',
                  '&.Mui-checked': {
                    color: 'var(--clr-gold)',
                  },
                }}
              />}
              label={<span>Invest in cryptocurrencies</span>} />

            <FormControlLabel control={
              <Checkbox
                disabled={formDisabled}
                name="learnCrypto"
                checked={formik.values.learnCrypto}
                onChange={formik.handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{
                  color: 'var(--clr-gold)',
                  '&.Mui-checked': {
                    color: 'var(--clr-gold)',
                  },
                }}
              />}
              label={<span>Learn more about cryptocurrencies</span>} />

            <FormControlLabel control={
              <Checkbox
                disabled={formDisabled}
                name="learnCryptoNew"
                checked={formik.values.learnCryptoNew}
                onChange={formik.handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{
                  color: 'var(--clr-gold)',
                  '&.Mui-checked': {
                    color: 'var(--clr-gold)',
                  },
                }}
              />}
              label={<span>I am completely <strong>new to crypto</strong> - <strong>please teach me!</strong></span>} />

          </FormGroup>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="invest-label" shrink={false} required>I am looking to invest</InputLabel>
          <TextField
            disabled={formDisabled}
            placeholder="£500.."
            fullWidth
            id="invest"
            name="invest"
            variant="outlined"
            value={formik.values.invest}
            onChange={formik.handleChange}
            error={formik.touched.invest && Boolean(formik.errors.invest)}
            helperText={formik.touched.invest && formik.errors.invest}
          />

        </FormControl>

        <FormControl fullWidth variant="standard" component="fieldset" className="checkbox-group">
          <InputLabel id="learn" shrink={false} className="checkbox-group-label">VIP List</InputLabel>
          <FormGroup>
            <FormControlLabel control={
              <Checkbox
                disabled={formDisabled}
                name="joinVip"
                checked={formik.values.joinVip}
                onChange={formik.handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{
                  color: 'var(--clr-gold)',
                  '&.Mui-checked': {
                    color: 'var(--clr-gold)',
                  },
                }}
              />}
              label={<span>I would like to join the <strong>VIP List</strong></span>}
            />
          </FormGroup>
          <FormHelperText
            className="helper-text-warning">
            <RiErrorWarningLine className="inline-icon" />Additional costs may apply.
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth variant="standard" component="fieldset" className="checkbox-group">
          <InputLabel id="mentorship" shrink={false} className="checkbox-group-label">Private Mentorship</InputLabel>
          <FormGroup>
            <FormControlLabel control={
              <Checkbox
                disabled={formDisabled}
                name="mentorship"
                checked={formik.values.mentorship}
                onChange={formik.handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{
                  color: 'var(--clr-gold)',
                  '&.Mui-checked': {
                    color: 'var(--clr-gold)',
                  },
                }}
              />}
              label={<span>I would like to start a private mentorship sessions with Amio Talio</span>}
            />
          </FormGroup>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="message-label" shrink={false}>
            Tell us why we should accept you to enroll
          </InputLabel>

          <TextField
            disabled={formDisabled}
            placeholder="Your message"
            fullWidth
            id="message"
            name="message"
            variant="outlined"
            value={formik.values.message}
            onChange={formik.handleChange}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          />
          <FormHelperText
            className="helper-text-warning guide-text">
            <RiQuestionLine className="inline-icon" />As more details you provide, the higher chance of you being accepted.
          </FormHelperText>
        </FormControl>

        <FormGroup className="privacy-wrapper">
          <FormControlLabel control={
            <Checkbox
              disabled={formDisabled}
              name="agree"
              checked={formik.values.agree}
              onChange={formik.handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
              sx={{
                color: 'var(--clr-gold)',
                '&.Mui-checked': {
                  color: 'var(--clr-gold)',
                },
              }}
            />} label={<span>I have read and accept the <Link to="/privacy-policy">Privacy Policy</Link>.</span>} />
          <FormHelperText error>
            {formik.touched.agree && formik.errors.agree}
          </FormHelperText>
        </FormGroup>
        <Button type="submit" disabled={!formik.values.agree || formDisabled}>
          {formSending ? 'Submitting data..' : isSuccess ? 'Sent' : 'Subscribe'}
        </Button>
        {formSubmitState.message !== '' && <span className={formSubmitState.status !== '' ? formSubmitState.status === 'error' ? 'formError' : 'formSuccess' : ''}>
          {formSubmitState.message}
        </span>}
      </form>
    </div>
  )
}
export default Form