import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup'

import TextFormField from './FormFields/TextFormField';
import { CheckboxFieldGroup, CheckboxFormField } from './FormFields/CheckboxFormField'

import Button from '../Page/Button'
import { LoadingInline } from '../Loading'

import { discordUserNameRegEx, telegramUserNameRegEx } from './ValidationSchema'

import { useUserContext } from '../../context/UserContext';
import { sleep } from '../../utils/helpers';


const FormEditUserData = ({ field, showForm, label }) => {
  const [formError, setFormError] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setLoading] = useState(false)

  const { user, setUser, updateUserSocials } = useUserContext()

  const formik = useFormik({
    initialValues: {
      discord: (user.discord_user_name || '').toString(),
      telegram: (user.telegram_user_name || '').toString()
    },

    validationSchema: yup.lazy(() => {
      if (field.toLowerCase().includes('telegram')) {
        return yup.object().shape({
          telegram: yup.string()
            .matches(telegramUserNameRegEx, "This is not a valid username. Please make sure you include '@' symbol in front of the username, for example '@myusername'.")
            .required('This is required'),
          discord: yup.string()
        })
      }

      if (field.toLowerCase().includes('discord')) {
        return yup.object().shape({
          telegram: yup.string(),
          discord: yup.string()
            .matches(discordUserNameRegEx, "This is not a valid username")
            .required('This is required')
        })
      }
    }),

    onSubmit: async values => {
      if (!values.telegram && !values.discord) {
        showForm(false)
        return
      }
      if (
        values.discord === user.discord_user_name &&
        values.telegram === user.telegram_user_name
      ) {
        showForm(false)
        return
      }

      if (formError) setFormError('')
      if (message) setMessage('')

      setLoading(true)



      updateUserSocials(values)
        .then(res => {
          if (res.status !== 200) throw new Error('There was an error. Please try again later or contact support if the problem persists.')
          return res.json()
        })
        .then(async res => {
          await sleep(1000)
          setLoading(false)

          setMessage(res.message)

          await sleep(2000)

          setUser(res.user)
          showForm(false)
        })
        .catch(async err => {
          setLoading(false)

          if (err.message) setFormError(err.message)
          else setFormError('There was an error. Please try again later or contact support if the problem persists.')

          await sleep(5000)
          showForm(false)
        })
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>

      {field.toLowerCase().includes('telegram') &&
        <TextFormField
          name={'telegram'}
          label={`New value for ${label}`}
          formik={formik}
          onBlur={formik.handleBlur}
          inlineSubmit="Save"
          placeholder={"@username"}
          // prefix="@"
          required
        />
      }

      {field.toLowerCase().includes('discord') &&
        <TextFormField
          name={'discord'}
          label={`New value for ${label}`}
          formik={formik}
          onBlur={formik.handleBlur}
          inlineSubmit="Save"
          placeholder={"username#1234"}
          required
        />
      }

      <LoadingInline
        isLoading={isLoading}
        errorMessage={formError}
        successMessage={message}
        label={'Saving...'}
      />
    </form>
  )
}
export default FormEditUserData