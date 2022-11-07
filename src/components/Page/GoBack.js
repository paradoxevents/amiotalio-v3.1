import React from 'react'
import { navigate } from 'gatsby'
import Button from './Button'

const GoBack = () => {
  return (
    <Button small onClick={() => navigate(-1)}>Go Back</Button>
  )
}

export default GoBack