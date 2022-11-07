import React, { useEffect } from 'react'
import { sleep } from '../utils/helpers'

const Bridge = ({ children, callback = () => { } }) => {
  useEffect(async () => {
    await sleep(1000)

    callback()
  }, [])



  return (
    <main>
      <div className="redirect-bridge">
        {children}
      </div>
    </main>
  )
}

export default Bridge