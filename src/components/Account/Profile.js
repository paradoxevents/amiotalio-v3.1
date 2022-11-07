import React, { useEffect, useState } from 'react'
import Animated from 'react-mount-animation'
import { navigate } from 'gatsby'
import {
  ProfileDataset,
  TextField,
  EmailField,
  MembershipTierField,
  PaymentStatusField,
  BooleanField,
  NotAMember
} from './DataFields'

import { BiCloudDownload, BiUserCheck, BiUserX } from 'react-icons/bi'

import Button from '../Page/Button'
import Loading from '../Loading'

import { useAppContext } from '../../context/AppContext'
import { useAuthContext } from '../../context/AuthContext'
import { useUserContext } from '../../context/UserContext'
import FormCancel from '../Forms/FormCancel'

import { getDateFormated } from '../../utils/helpers'

import { ADMIN_DATA, MOD_DATA } from '../../data/ADMIN_DATA'

const Profile = () => {
  const { isLoading, setLoading } = useAppContext()
  const { accessToken, logout } = useAuthContext()
  const [error, setError] = useState('')
  const [shouldLogout, setShouldLogout] = useState(false)

  const {
    user, setUser, fetchUserData,
    fetchSubscriptionData,
    setSubscriptionMeta,
    subscription, setSubscription
  } = useUserContext()

  const refetchUserData = () => {
    if (isLoading) return

    if (user.user_type) {
      if (user.user_type === 'admin') return
      if (user.user_type === 'moderator') return
    }

    getUserData()
  }

  const getUserData = () => {
    setLoading(true)
    setError('')

    fetchUserData(accessToken)
      .then(res => res.json())
      .then(res => {
        if (!res.data) throw new Error(`Could not fetch user data. Logging out in 5s...`)

        const user = res.data.user_details[0]
        const subscriptionMetaData = res.data.user_subscription
        setUser(user)
        setSubscriptionMeta(subscriptionMetaData)

        return fetchSubscriptionData(accessToken)
      })
      .then(res => res.json())
      .then(res => {
        setSubscription(res)
      })
      .catch(error => {
        setError(error.message)
        setShouldLogout(true)
        setUser(null)
        setSubscription(null)
      })
      .then(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (user) {
      if (user.user_type === 'admin') {
        setUser(ADMIN_DATA.userProfile)
        setSubscription(ADMIN_DATA.subscriptionData)
        return
      } 
  
      if (user.user_type === 'moderator') {
        setUser(MOD_DATA.userProfile)
        setSubscription(MOD_DATA.subscriptionData)
        return
      } 
    }

    getUserData()
  }, [])

  useEffect(() => {
    if (!shouldLogout && accessToken) return

    let seconds = 5

    const interval = setInterval(() => {
      if (seconds >= 1) {
        setError(`Could not fetch user data. Logging out in ${seconds}s...`)
        seconds--
      } else {
        logout(() => {
          navigate('/login')
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [shouldLogout])

  return (
    <div className="account-user-profile">
      <header className="account-pane-header">
        <h2 className="account-page-title">Your Profile</h2>
        <button className="btn-refresh" onClick={() => refetchUserData()}>
          <BiCloudDownload className="btn-icon--prefix" />
          Refresh User Data
        </button>
      </header>
      <div className="dashboard-section">
        {isLoading && !error
          ? <Loading
            customClass="loader-container"
            isLoading={isLoading}
            errorMessage={error}
            label={"Refreshing user data..."} />
          : <ProfileData user={user} subscription={subscription} error={error} />
        }
      </div>
    </div>
  )
}

export default Profile

const ProfileData = ({ user, subscription, error }) => {
  const [cancelForm, setCancelForm] = useState(false)

  const toggleCancellationForm = () => {
    if (user.user_type !== 'moderator') {
      setCancelForm(prev => !prev)
    }
  }

  return (
    <div className="user">
      {user ? (
        <>
          <ProfileDataset title="Personal Details">
            <EmailField title="Email" value={user.email} />
            {/* <TextField title="Display Name" capitalize value={user.name} /> */}
            <TextField title="Telegram Username" value={user.telegram_user_name} editable required />
            <TextField title="Discord Username" value={user.discord_user_name} editable required />
            {/* <TextField title="Your Message to Amio" customClass="text-transform-unset" value={user.details.userInvestmentList.message} editable /> */}
            {/* <BooleanField title="Wish to join VIP community" value={user.details.userInvestmentList.joinVip} editable /> */}
          </ProfileDataset>

          <ProfileDataset title="Membership">
            {user && (
              <>
                <div className="subscription-active">
                  {subscription && subscription.subscription_status === "complete" ? (
                    <><BiUserCheck className="icon" />Your membership plan is active</>
                  ) : (
                    <><BiUserX className="icon error" />Your membership plan is not active</>
                  )}
                </div>
                {subscription && (
                  <>
                    <MembershipTierField value={subscription.subscription_plan} />
                    <PaymentStatusField
                      title={"Payment"}
                      status={subscription.subscription_status}
                      date={subscription.last_payment}
                    />
                    <TextField title={"Date Joined"} value={getDateFormated(user.created_at)} />
                  </>
                )}
              </>
            )}

          </ProfileDataset>
          
          <ProfileDataset title="Account">
            <Button small onClick={() => toggleCancellationForm()}>{cancelForm ? 'Abort' : 'Request cancellation'}</Button>
            <Animated.div
              show={cancelForm}
              time={.2}
              // TODO move animation to fadeIn/fadeOut helper

              mountAnim={`
                0% { opacity: 0 }            
                100% { opacity: 1 }
              `}
              unmountAnim={`
                0% { opacity: 1}            
                100% { opacity: 0 }
              `}
            >
              {user && <FormCancel user={user} />}
            </Animated.div>
          </ProfileDataset>

        </>
      ) : <div>{error && error.toString()}</div>}
    </div>
  )
}