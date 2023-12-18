import React from 'react'

// CSS IMPORT
import './DashboardButton.css'

function DashboardButton(props) {
  return (
    <a
      onClick={props.onClick}
      className={`${props.className} button--dashboard`}
    >
      {props.btnName}
    </a>
  )
}

export default DashboardButton
