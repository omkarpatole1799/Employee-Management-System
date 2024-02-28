import React from "react"
import { Link } from "react-router-dom"

import "./DashboardButton.css"

function DashboardButton(props) {
	return (
		<Link
			onClick={props.onClick}
			className={`${props.className} button--primary button--dashboard`}
		>
			{props.btnName}
		</Link>
	)
}

export default DashboardButton
