import React, { useEffect, useState } from 'react'
import Layout from '../components/Containers/Layout'
import Seo from '../components/Seo'
import FormRequestResetPassword from '../components/Forms/FormRequestResetPassword'
import FormResetPassword from '../components/Forms/FormResetPassword'
import Page from '../components/Page/Page'
import { getURLParams } from '../utils/helpers'
import { useAuthContext } from '../context/AuthContext'
import { useAppContext } from '../context/AppContext'
import Loading from '../components/Loading'

const PasswordResetPage = () => {
  const [resetToken, setResetToken] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  const { isLoading, setLoading } = useAppContext()
  const { validateResetToken } = useAuthContext()

  useEffect(() => {
    setLoading(true)

    const token = getURLParams().get('token')
    if (!token) {
      setLoading(false)
      return
    }

    setLoading(true)
    validateResetToken(token)
      .then(res => res.json())
      .then(res => {
        if (res.token && res.email) {
          setResetToken(res.token)
          setUserEmail(res.email)
          return
        }
      })
      .then(() => {
        setLoading(false)
      })
  }, [])

  return (
    <Layout>
      <Seo title="Reset password" />
      <Page className="only-form-page">
        <section className='content-box'>
          {!isLoading &&
            <div className="form-container">
              {!resetToken ? <FormRequestResetPassword /> : <FormResetPassword token={resetToken} user={userEmail} />}
            </div>
          }
          <Loading label={'Validating password reset token...'} />
        </section>
      </Page>
    </Layout>
  )
}

export default PasswordResetPage