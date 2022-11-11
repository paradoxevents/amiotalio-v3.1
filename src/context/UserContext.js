import React, { createContext, useContext, useState } from 'react'

import { useAuthContext } from './AuthContext'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const { accessToken } = useAuthContext()
  const [user, setUser] = useState(null)
  const [subscription, setSubscription] = useState(null)
  const [subscriptionMeta, setSubscriptionMeta] = useState(null)
  const [isUserActive, setUserActive] = useState(null)

  const fetchUserData = () => {
    const BASE_URL = `https://amiotaliouniversity.herokuapp.com/api/v1/userDetails`
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Authorization": `Bearer ${accessToken}`
      }
    }

    return fetch(BASE_URL, config)
  }

  const fetchSubscriptionData = () => {
    const BASE_URL = `https://amiotaliouniversity.herokuapp.com/api/v1/subscriptionStatus`
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Authorization": `Bearer ${accessToken}`
      }
    }

    return fetch(BASE_URL, config)
  }

  const getLinks = () => {
    /* 
      @param BASE_URL 
        https://amiotaliouniversity.herokuapp.com/api/v1 
    */

    const BASE_URL = `https://amiotaliouniversity.herokuapp.com/api/v1/socialLinks`
    const config = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    }

    return fetch(BASE_URL, config)
  }

  const submitCancellation = formikData => {
    const { reason } = formikData

    const formData = new FormData()
    formData.append('reason', reason)
    formData.append('user_name', user.name)
    formData.append('user_email', user.email)
    formData.append('user_phone', user.phone_no)
    formData.append('customer_id', user.customer_id)

    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: formData
    }

    const BASE_URL = `https://amiotaliouniversity.herokuapp.com/api/v1/cancelSubscription`

    return fetch(BASE_URL, config)
  }

  const updateUserSocials = formikData => {
    const formData = new FormData()
    const discordUsername = formikData.discord
    let telegramUsername

    if (formikData.telegram[0] !== '@') {
      telegramUsername = `@${formikData.telegram}`
    } else {
      telegramUsername = formikData.telegram
    }

    formData.append('discord_user_name', discordUsername)
    formData.append('telegram_user_name', telegramUsername)

    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: formData
    }

    const BASE_URL = `https://amiotaliouniversity.herokuapp.com/api/v1/updateUser`

    return fetch(BASE_URL, config)
  }

  const contextObject = {
    user, setUser,
    isUserActive, setUserActive,
    subscription, setSubscription,
    subscriptionMeta, setSubscriptionMeta,
    fetchSubscriptionData,
    fetchUserData,
    updateUserSocials,
    submitCancellation,
    getLinks
  }

  return (
    <UserContext.Provider value={contextObject}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)