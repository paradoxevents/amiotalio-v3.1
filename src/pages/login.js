import React from 'react'
import Layout from '../components/Containers/Layout'
import Seo from '../components/Seo'
import FormLogin from '../components/Forms/FormLogin'
import Page from '../components/Page/Page'

const LoginPage = () => {
  return (
    <Layout>
      <Seo title="Log in" />
      <Page className="only-form-page">
        <section className='content-box'>
          <div className="form-container">
            <FormLogin />
          </div>
        </section>
      </Page>
    </Layout>
  )
}

export default LoginPage