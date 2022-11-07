import React, { createContext, useContext, useState } from 'react'
import { useEffect } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  const contextObject = {
    isLoading, setLoading,
    showEdit, setShowEdit
  }

  return (
    <AppContext.Provider value={contextObject}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)