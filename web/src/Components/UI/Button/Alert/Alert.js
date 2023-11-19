import React, { useState } from 'react'

import './alert.css'

function Alert(props) {
  const [alert, setAlert] = useState(false)

  setAlert(true)

  setTimeout(() => {
    setAlert(false)
  }, 2500)

  return (
    <>
      {alert && (
        <div
          className={alert ? 'alert-1 alert-show' : 'alert-1'}
        >
          {props.children}
        </div>
      )}
    </>
  )
}

export default Alert
