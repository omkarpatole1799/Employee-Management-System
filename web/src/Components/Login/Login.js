import { useState } from "react"
import { useNavigate } from "react-router-dom"

// CSS IMPORT
import "./Login.css"
import "./Login-media.css"

import { notifcationActions } from "../../Store/notification-slice"
import { loaderActions } from "../../Store/loader-slice"
import { useDispatch, useSelector } from "react-redux"

import { Notification } from "../UI/Notification/Notification"

function Login() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [inputValue, setInputValue] = useState({
		email: "",
		pass: ""
	})

	function handleInputChange(e) {
		setInputValue({
			...inputValue,
			[e.target.name]: e.target.value
		})
	}

	function loginButtonHandler(e) {
		e.preventDefault()
		if (inputValue.email === "") {
			console.log("here")
			dispatch(notifcationActions.showNotification("Email Empty"))
			return false
		}
		if (inputValue.pass === "") {
			dispatch(notifcationActions.showNotification("Password Empty"))
			return false
		}

		if (inputValue.email !== "" && inputValue.pass !== "") {
			loginRequestHandler(inputValue.email, inputValue.pass)
		}
	}

	const loginRequestHandler = async (email, pass) => {
		dispatch(loaderActions.showLoader())
		const res = await fetch("/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ userEmail: email, pass })
		})

		let data = await res.json()

		if (data.message === "Not authorized") {
			dispatch(notifcationActions.showNotification("Not authorized"))
		}

		if (data.message === "authenticated") {
			localStorage.setItem("tocken", data.tocken)
			let expiration = new Date()
			expiration.setHours(expiration.getHours() + 10)
			localStorage.setItem("tockenExpiry", expiration.toISOString())
			localStorage.setItem("userId", data.userId)
			localStorage.setItem("userName", data.userName)
			localStorage.setItem("userType", data.userType)

			dispatch(loaderActions.hideLoader())
			navigate("/")
		}

		if (data.message === "Incorret Password") {
			dispatch(notifcationActions.showNotification("Incorrect password"))
		}

		if (data.message === "Incorrect Email") {
			dispatch(notifcationActions.showNotification("Incorrect Email"))
		}
	}

	return (
		<>
			<div className='loginBox'>
				<div className='loginContainer'>
					<div>
						<img
							src={require("./loginPageImage.jpg")}
							alt=' loginn'
							className='loginPageImage'
						/>
					</div>
					<div className='loginFormContainer'>
						<h3 className='heading-1 login-heading'>Login</h3>
						<form
							className='loginForm'
							method='POST'
							encType='application/json'
						>
							<div className='form-input-group'>
								<input
									type='text'
									name='email'
									value={inputValue.email}
									id='email'
									className='input-element'
									onChange={handleInputChange}
									required
								/>
								<label htmlFor='email' className='input-label'>
									Email
								</label>
							</div>
							<div className='form-input-group'>
								<input
									type='text'
									name='pass'
									value={inputValue.pass}
									id='password'
									className='input-element'
									onChange={handleInputChange}
									required
								/>
								<label htmlFor='password' className='input-label'>
									Password
								</label>
							</div>
							<div className='loginFormButtonContainer'>
								<a
									className='button button--primary-2'
									onClick={loginButtonHandler}
								>
									Login
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default Login
