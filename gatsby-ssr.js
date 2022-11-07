import React from "react"
import "./src/assets/scss/global.scss"
import { AppProvider } from "./src/context/AppContext"
import { AuthProvider } from "./src/context/AuthContext"
import { UserProvider } from "./src/context/UserContext"

export const wrapRootElement = ({ element }) => {
  return (
    <AppProvider>
      <AuthProvider>
        <UserProvider>
          {element}
        </UserProvider>
      </AuthProvider>
    </AppProvider>
  )
}