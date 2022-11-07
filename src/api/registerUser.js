import { sleep } from '../utils/helpers'

// mock responses
import errorResponse from './__mock/register_failed.json'
import successResponse from './__mock/register_success.json'

const { log } = console

export const registerUser = async formikData => {
  const { email, password } = formikData

  const formData = new FormData()

  formData.append('email', email)
  formData.append('agree', 1)
  formData.append('terms', 1)
  formData.append('password', password)

  // mock API timeout
  await sleep(2000)

  const BASE_URL = `${process.env.GATSBY_API_ENDPOINT_BASEPATH}/register`
  const config = {
    method: "post",
    headers: {
      Accept: "application/json"
    },
    body: formData
  }

  let response = await fetch(BASE_URL, config)
  let result = await response.json()

  return result;
}

export const isEmailUnique = async email => {

  let formData = new FormData()

  formData.append('email', email)

  let response = await fetch(`${process.env.GATSBY_API_ENDPOINT_BASEPATH}/newUser`, {
    method: "POST",
    headers: {
      Accept: "application/json"
    },
    body: formData
  })

  let result = await response.json()

  return result
}