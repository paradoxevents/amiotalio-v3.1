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

  const BASE_URL = `https://amiotaliouniversity.herokuapp.com/api/v1/register`
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

  let response = await fetch(`https://amiotaliouniversity.herokuapp.com/api/v1/newUser`, {
    method: "POST",
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    body: formData
  })

  let result = await response.json()

  return result
}