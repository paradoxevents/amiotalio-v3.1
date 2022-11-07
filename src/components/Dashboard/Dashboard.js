import React from 'react'
import { PageSection } from '../Page/Page'
import MembershipCard from './MembershipCard'

const Dashboard = ({ user }) => {
  return (
    <>
      <PageSection>
        <header>
          <div className="user">
            <div className="user-avatar">
              <img src={user.picture} alt="Avatar" />
            </div>
            <div className="user-data">
              <div className="user-login-as">You are logged in as</div>
              <div className="user-email">{user.email}</div>
              {/* <div className={user.email_verified ? 'user-confirm verified' : 'user-confirm not-verified'}>
                {user.email_verified ? 'Email Verified' : 'You have not yet verified your email.'}
              </div> */}
            </div>
          </div>
        </header>
      </PageSection>

      <PageSection block>
        <div className="disclaimer">
          <h2 className="center">Welcome to AmioTalio University!</h2>
          <p>The members area will launch soon where you will find here on this day onwards access to everything via the members area.
            You will also receive an email with further information on how to access all the content on AmioTalio University as well access to our Discord Server</p>
        </div>
      </PageSection>
      {/* 
      <PageSection>
        <div className="disclaimer">
          <p>You can take your first step right now and join people just like you in the Amiotalio University community.</p>
          <p>Once a payment is confirmed which can take upto 24 hours, you will receive a confirmation email.</p>
          <p>You will receive an email with further information on how to access all the content on AmioTalio University as well as access to our Discord Server on launch on:</p>
          <p className="launch-date">14<sup>th</sup> January 2022</p>
        </div>
      </PageSection> */}

      <PageSection className="disclaimer">
        <h2 className="center">Disclaimer</h2>
        <h3>NOT A FINANCIAL ADVICE</h3>

        <p>The information contained on this site and the resources available for download through this website is not intended as, and shall not be understood or construed as, financial advice. We are not an attorney, accountant or financial advisor, nor are we holding ourselves out to be, and the information contained on this website is not a substitute for financial advice from a professional who is aware of the facts and circumstances of your individual situation.</p>
        <p>We have done our best to ensure that the information provided on this server and the resources available for download are accurate and provide valuable information. Regardless of anything to the contrary, nothing available on or through this server should be understood as a recommendation that you should not consult with a financial professional to address your particular information. The Company expressly recommends that you seek advice from a professional.</p>
        <p>Neither the Company nor any of its employees or owners shall be held liable or responsible for any errors or omissions on this website or Discord Server or for any damage you may suffer as a result of failing to seek competent financial advice from a professional who is familiar with your situation.</p>
        <p>You must be aware of risks involved in your investments and be able to manage risk accordingly, we at AmioTalio University are not responsible for any decision you take as individual.</p>
      </PageSection>
    </>
  )
}

export default Dashboard