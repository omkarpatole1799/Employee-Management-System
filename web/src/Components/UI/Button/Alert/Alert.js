import React, { useState } from 'react'

import './alert.css'

function Alert(props) {
	const [alert, setAlert] = useState(true)

	setTimeout(() => {
		setAlert(false)
	}, 2500)

	return (
		<>
			{alert && (
				<div className={alert ? 'alert show' : 'alert'}>{props.children}</div>
			)}
		</>
	)
}

export default Alert
