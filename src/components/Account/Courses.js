import React, { useEffect, useState } from 'react'
import { FaDiscord, FaTelegramPlane } from 'react-icons/fa'
import { BsShieldLockFill } from 'react-icons/bs'
import { useUserContext } from '../../context/UserContext'
import { useAppContext } from '../../context/AppContext'
import { useAuthContext } from '../../context/AuthContext'
import { LoadingInline } from '../Loading'

import { MdOndemandVideo, MdPeopleAlt } from 'react-icons/md'
import { RiVipDiamondFill } from 'react-icons/ri'


import { ADMIN_DATA, MOD_DATA } from '../../data/ADMIN_DATA'

import { Link, Router } from '@reach/router'
import VideoListing from './VideoListing'

const Courses = () => {
  const {
    user, setUser, fetchUserData,
    fetchSubscriptionData,
    setSubscriptionMeta,
    subscription, setSubscription 
  } = useUserContext()

  const { isLoading, setLoading } = useAppContext()
  const { accessToken } = useAuthContext()
  const [telegram, setTelegram] = useState(false)
  const [discord, setDiscord] = useState(false)
  const [error, setError] = useState('')

  const getData = () => {
    setLoading(true)

    fetchUserData(accessToken)
      .then(res => res.json())
      .then(res => {
        if (!res.data) throw new Error(`Could not fetch user data.`)

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

    getData()
  }, [])

  useEffect(() => {
    if (!user) return
    
    if (user.telegram_user_name) setTelegram(true)
    if (user.discord_user_name) setDiscord(true)

  }, [subscription, user])

  return (
    <div>
      <header className="account-pane-header">
        <h2>Courses</h2>
      </header>
      {isLoading ? (
        <div className="dashboard-section">
          <LoadingInline isLoading={isLoading} label={"Fetching user data..."} />
        </div>
      ) : (
        <div className="dashboard-section">
          {
            subscription && telegram && discord &&
              subscription.subscription_status === 'complete'
              ? (
                <CoursesContent />
              ) : (
                <div className="channel-card guard">
                  <div className="icon">
                    {<BsShieldLockFill />}
                  </div>
                  <h3 className='title'>Content Locked</h3>
                  <p className="description">You do not have access to this content yet</p>
                  <span className="hint">Please check your payment status and make sure your Discord and Telegram usernames are updated in the user profile</span>
                </div>
              )
          }
        </div>
      )}

    </div>
  )
}

export default Courses

const CoursesContent = () => (
  <Router>
    <ContentListing path="/" />
    <SocialChannels path="/socials" />
    <VideoListing path="/videos" />
  </Router>
)


const ContentListing = () => (
  <nav className="channel-cards courses-listing">
    <Link className="channel-card sunset-orange" to="/account/courses/socials">
      <div className="icon">
        <MdPeopleAlt />
      </div>

      <h3 className='title'>Social Channels</h3>
      <p className="description">Join Social Channels and become a part of ATU community</p>
      <span className="hint">Click to access</span>
    </Link>
    <Link className="channel-card aurora" to="/account/courses/videos">
      <div className="icon">
        <MdOndemandVideo />
      </div>
      <h3 className='title'>Videos</h3>
      <p className="description">Watch Video Course Content</p>
      <span className="hint">Click to access</span>
    </Link>
  </nav>
)

const SocialChannels = () => {

  const { getLinks, subscription } = useUserContext()
  const [data, setData] = useState({})
  
  useEffect(() => {
    getLinks()
      .then(res => {
        if (res.status !== 200) throw new Error('Server Error')
        return res
      })
      .then(data => data.json())
      .then(json => {
        setData(json.data)
        setData(prev => ({
          ...prev, 
          discord: json.data.discord_group_link,
          telegram: json.data.telegram_group_link,
          telegramVip: json.data.vip_telegram_group_link
        }))
      })
      .catch(err => {
        console.error(err.message)
      })
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  // TODO: introduce animation with 'framer-motion'

  return (
    <>
      <h3>Social Channels</h3>
      <div className='channel-cards'>

        {data.discord && (
          <ChannelCard
            link={data.discord}
            label="Discord"
            Icon={FaDiscord}
            description="Paid Discord channel"
          />
        )}

        {data.telegram && (
          <ChannelCard
            link={data.telegram}
            label="Telegram"
            Icon={FaTelegramPlane}
            description="Paid Telegram group"
          />
        )}

        {subscription && data.telegram && subscription.subscription_plan === 'platinum' && 
          <ChannelCard
            link={data.telegramVip}
            label="Telegram VIP"
            Icon={RiVipDiamondFill}
            description="Paid Telegram group"
            
          />
        }
      </div>
    </>
  )
}

const ChannelCard = ({ link, label, Icon, description }) => {
  return (
    <a href={link} className={`channel-card ${label.toLowerCase()}`}>
      <div className="icon">
        {Icon && <Icon />}
      </div>
      <h3 className='title'>{label}</h3>
      <p className="description">{description}</p>
      <span className="hint">Click to access</span>
    </a>
  )
}
