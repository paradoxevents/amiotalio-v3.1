import * as yup from 'yup'
import "yup-phone"
import { investOptions } from './RegisterInitialValues'
import { isEmailUnique } from '../../api/registerUser'
import { debounce } from 'lodash'

const phoneRegExp =  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,10}$/
const emailRegExp = /\S+@\S+/
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,128})/
export const discordUserNameRegEx = /^.{3,32}#[0-9]{4}$/
export const telegramUserNameRegEx = /.*\B@(?=\w{5,32}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*/

const validateEmail = email => emailRegExp.test(email)

const validateEmailUnique = async (value, resolve) => {

  if (!validateEmail(value)) return

  // below OFF to limit API requests
  let response = await isEmailUnique(value)
  if (response.errors) return resolve(false)

  return resolve(true)
};

// const debouncedValidateEmailUnique = debounce(validateEmailUnique, 400)

export const RegisterSchema = yup.object({
  // Step 1
  name: yup
    .string()
    .min(2, 'Given name is too short')
    .max(70, 'Given name is too long')
    .required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email address is required')
    .test(
      'is-email-unique',
      `This email is already in use`,
      async value => new Promise(resolve => validateEmailUnique(value, resolve))),
  countryCode: yup
    .string()
    .min(2, 'Given country code is too short')
    .max(5, 'Given country code is too long')
    .required(),
  phone: yup
    .string()
    .matches(phoneRegExp, 'This is not a valid phone numnber')
    .required('Phone number is required'),
  age: yup
    .number()
    .typeError('Please enter a valid age')
    .min(16, 'You have to be minimum 16 years old')
    .max(120, 'Please enter a valid age')
    .required('Age is required'),
  agreePrivacy: yup
    .bool()
    .oneOf([true], `To proceed to next step you have to agree to T&C's and Privacy Policy`),

  // Step 2
  discord: yup
    .string()
    .matches(discordUserNameRegEx, 'Given username is not valid')
    .required('Discord username is required'),
  telegram: yup
    .string()
    .matches(telegramUserNameRegEx, 'Given username is not valid')
    .required('Telegram username is required'),

  // Step 3
  password: yup
    .string()
    .min(8, "Password is too short")
    .required('Password is required'),
  // .matches(passwordRegExp, "Password is invalid"),
  passwordConfirm: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('You must confirm password')
});


export const LoginSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  password: yup
    .string()
    .required('Password is required')
});

export const RequestPasswordResetSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email address is required')
});

export const PasswordResetSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password is too short")
    .required('Password is required'),
  // .matches(passwordRegExp, "Password is invalid"),
  passwordConfirm: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('You must confirm password')
});

export const CancelSchema = yup.object({
  reason: yup
    .string()
    .required('Please provide a reason for cancellation'),
  confirm: yup
    .bool()
    .oneOf([true], `Please tick the box in order to proceed`)
});

export const contactForm = yup.object({
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
  message: yup
    .string('Please enter a valid age')
    .min(10, 'The message is too short - please privde more details.')
    .max(300, 'You have exceeded the maximum character count.')
    .required('Age is required'),
})