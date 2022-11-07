import React, { useEffect, useState } from 'react'
import Layout from '../components/Containers/Layout'
import Page from '../components/Page/Page'
import Seo from '../components/Seo'
import FormRegisterContainer from '../components/Forms/FormRegisterContainer'
import { parseFormCache } from '../utils/storage'
import { DefaultValues, InitialValuesTest } from '../components/Forms/RegisterInitialValues'

const SignupPage = () => {
  // const [cache, setCache] = useState({})
  const [initialValues, setInitialValues] = useState(DefaultValues)

  // useEffect(() => {
  //   console.log('parse cache')
  //   const cache = parseFormCache()
  //   // setCache(cache)
    
  //   if (cache) {
  //     const { name, email, countryCode, phone, age, agree } = cache

  //     console.log('setting cached values')
  //     setInitialValues(prev => ({
  //       ...prev,
  //       name: name,
  //       email: email, 
  //       countryCode: countryCode, 
  //       phone: phone, 
  //       age: age, 
  //       agree: agree
  //     }))
  //   }
  // }, [])

  return (
    <Layout>
      <Seo title="Sign Up Form" />
      <Page className="only-form-page">
        <div className="content-box form-container">
          <FormRegisterContainer initialValues={initialValues} />
        </div>
      </Page>
    </Layout>
  )
}

export default SignupPage


/* 

  Fields by step

  Step 1 (USER DETAILS)
    * First name
    * Last name
    * Phone number (only UK)
    * Age (date of birth || number value??)
    * Investment (select with 3 options)
    * VIP List
    * Private Mentorship
    * Message to Amio
  
  # validate email address  
  # next returns 
  
  Step 2 (SECURITY)
  * Email address
  * Password
  * Confirm password
  * (captcha)
  * T&C
  * Privacy Policy
  
    * ACCOUNT BEING CREATED
    * LOGIN & REDIRECT TO PACKAGES
  
  Step 3 (PAYMENT)
    * Radio for 3 payment options
    * Link to front page with package descriptions (blank card open)
    
  Step 4 (SUCCESS)
    * SLEEP 5s & REDIRECT to /account 
*/