import React from "react"
import { Link } from 'gatsby'
import { RiArrowLeftSLine, RiBugLine, RiSkullLine } from "react-icons/ri"

import Layout from "../components/Containers/Layout"
import Seo from "../components/Seo"
import Hero from "../components/Hero/Hero"
import Page from "../components/Page/Page"

const NotFoundPage = () => (
  <Layout>
    <Seo title="Page not found" />

    <Page className="not-found">
      <section>
        <RiSkullLine
          style={{
            fontSize: "128px",
            marginBottom: "40px",
            color: "var(--primary-color)"
          }}
        />

        <h2 className="center">Page not found</h2>
        <p className="center">Oops, looks like the page your are looking for does not exist...</p>
        <p>
          Have you wondered into the unknow. Let us help you,<br />Please take a look
          at below options
        </p>
        <div className="column align-center">
          <Link to="/" className="btn btn-small btn-with-icon">
            <span className="btn-with-icon">
              <RiArrowLeftSLine className="icon" />
              <span>
                Back to home page
              </span>
            </span>
          </Link>
          <p>or</p>
          <Link to="/contact" className="btn btn-small">
            <span className="btn-with-icon">
              <RiBugLine className="icon" />
              <span>
                Report the bug
              </span>
            </span>
          </Link>
        </div>
      </section>
    </Page>
  </Layout>
)

export default NotFoundPage
