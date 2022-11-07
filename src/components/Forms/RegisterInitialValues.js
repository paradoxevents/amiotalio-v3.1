export const investOptions = [
  {
    value: '1000',
    label: 'Less than £1000'
  },
  {
    value: '1000-5000',
    label: 'Between £1000 - £5000'
  },
  {
    value: '5000+',
    label: 'More than £5000'
  }
]

export const DefaultValues = {
  /* Step 1 (User Details) */
  name: '',
  countryCode: '',
  phone: '',
  age: '',
  agreePrivacy: false,
  email: '',

  // /* Step 2 (Preferences) */
  discord: '',
  telegram: '',

  /* Step 3 (Password) */
  password: '',
  passwordConfirm: ''

  /* Step 4 (Payment) */
  // ...
}

export const InitialValuesTest = {
  /* Step 1 (User Details) */
  name: 'rob',
  countryCode: '',
  phone: '',
  age: '30',
  agreePrivacy: true,
  email: 'aiden.webbsterr@gmail.co',

  // /* Step 2 (Preferences) */
  discord: '',
  telegram: '',

  /* Step 3 (Password) */
  password: 'Paradox2k22@dev',
  passwordConfirm: 'Paradox2k22@dev'

  /* Step 4 (Payment) */
  // ...
}

export const formSteps = [
  'Personal Details',
  // 'Communication Channels',
  'Account Security',
  'Membership Packages'
]