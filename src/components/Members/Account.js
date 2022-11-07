import React from 'react'
import Page, { PageSection } from '../Page/Page'
// import DashboardHeader from '../Dashboard/DashboardHeader'
import Footer from '../Sections/Footer'
import TelegramWidget from '../TelegramWidget'

export const Account = () => {

  return (
    <main>
      {/* <DashboardHeader /> */}
      <Page>
        <PageSection>
          Welcome to your account!
        </PageSection>
      </Page>
      <TelegramWidget />
      <Footer />
    </main>
  )
}
