import { navigate } from 'gatsby'
import React, { useState, useContext, createContext, useEffect } from 'react'

import { checkLocalStorage, clearToken, setLocalStorage } from '../utils/storage'
import { getURL, sleep } from '../utils/helpers'
import { useAppContext } from './AppContext'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null)

  const { setLoading } = useAppContext()

  const login = (email, password) => {
    if (!email && !password) return

    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    const config = {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      },
      body: formData
    }

    const BASE_URL = `https://amiotaliouniversity.herokuapp.com/api/v1/login`
    return fetch(BASE_URL, config)
  }

  const silentAuth = () => {
    const token = checkLocalStorage()
    if (!token) {
      // no refresh token stored in a local storage
      return
    }

    const formData = new FormData()
    formData.append('refresh_token', token)

    const config = {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      },
      body: formData
    }
    const BASE_URL = `https://amiotaliouniversity.herokuapp.com/api/v1/getNewAccesToken`

    setLoading(true)
    fetch(BASE_URL, config)
      .then(data => data.json())
      .then(data => {
        const { access_token, refresh_token } = data.data.tokens

        setLocalStorage(refresh_token)
        setAccessToken(access_token)
        setLoading(false)
      })
      .then(() => {
        navigate('/account')
      })
      .catch(() => {
        // could not obtain credentials
        setLoading(false)
        clearToken()
      })
  }

  const logout = (cb = () => { }) => {
    clearToken()
    setAccessToken(null)
    cb()
  }

  const requestPasswordReset = email => {
    if (!email) return

    const formData = new FormData()
    formData.append('email', email)

    const config = {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      },
      body: formData
    }

    const BASE_URL = `https://amiotaliouniversity.herokuapp.com/api/v1/create`
    return fetch(BASE_URL, config)
  }

  const resetPassword = (password, token) => {
    if (!password && !token) return

    const formData = new FormData()
    formData.append('password', password)
    formData.append('token', token)

    const config = {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      },
      body: formData
    }

    const BASE_URL = `https://amiotaliouniversity.herokuapp.com/api/v1/reset`
    return fetch(BASE_URL, config)
  }

  const validateResetToken = token => {
    if (!token) return

    const formData = new FormData()
    formData.append('token', token)

    const config = {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      },
      body: formData
    }

    const BASE_URL = `https://amiotaliouniversity.herokuapp.com/api/password/checkValidToken`
    return fetch(BASE_URL, config)
  }

  const contextObject = {
    login, logout,
    accessToken, setAccessToken,
    requestPasswordReset, resetPassword, validateResetToken
  }

  useEffect(() => {
    const { pathname } = getURL()

    const noAuthRoutes = ['/confirmBilling', '/passwordReset', '/contact', '/blog', '/privacy-policy', '/about', '/login', '/signup']
    const doNotRedirect = noAuthRoutes.some(item => item === pathname)

    if (doNotRedirect) return

    silentAuth()
  }, [])

  return (
    <AuthContext.Provider value={contextObject}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)