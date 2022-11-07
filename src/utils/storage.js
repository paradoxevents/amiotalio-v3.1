import { isBrowser } from "./helpers"

export const setLocalStorage = token => {
  if (!isBrowser) return

  window.localStorage.setItem('refresh_token', token)
}

export const clearToken = () => {
  if (!isBrowser) return

  window.localStorage.removeItem('refresh_token')
}

export const checkLocalStorage = () => {
  if (!isBrowser) return

  const token = window.localStorage.getItem('refresh_token')
  return token
}

export const cacheRegistrationData = (values) => {
  if (!isBrowser) return
  
  const { name, email, countryCode, phone, age, agree } = values

  //! do not cache password values
  const cache = {
    name: name, 
    email: email, 
    countryCode: countryCode, 
    phone: phone, 
    age: age,
    agree: agree
  }

  window.localStorage.setItem('form_cached', JSON.stringify(cache))
}

export const clearFormCache = () => {
  if (!isBrowser) return

  window.localStorage.removeItem('form_cached')
}

export const parseFormCache = () => {
  if (!isBrowser) return

  const cache = window.localStorage.getItem('form_cached')

  if (!cache) return false
  return JSON.parse(cache)
}
