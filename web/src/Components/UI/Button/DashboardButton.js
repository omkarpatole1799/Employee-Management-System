import React from 'react'

// CSS IMPORT
import './DashboardButton.css'

function DashboardButton(props) {
  return (
    <button
      onClick={props.onClick}
      className={`${props.className} button--dashboard`}
    >
      {props.btnName}
    </button>
  )
}

export default DashboardButton
