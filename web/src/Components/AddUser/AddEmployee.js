// functions import
import { useState } from "react"

// HELPER FUNCTION IMPORT
import { postUserData } from "./helpers"

// components import
import Button from "../UI/Button/Button"

// CSS IMPORT
import "./addEmployee.css"
import Alert from "../UI/Button/Alert/Alert"

function AddEmployee() {
	const [input, setInput] = useState({
		userName: "",
		emailId: "",
		password: ""
	})
	const [profilePicture, setProfilePicture] = useState(null)

	const [alert, setAlert] = useState({
		isShow: false,
		message: ""
	})

	const inputChangeHandler = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value
		})
	}

	const fileChangeHandler = (e) => {
		if (isFileTypeAllowed(e)) {
			setProfilePicture(e.target.files[0])
		}
	}

	function isFileTypeAllowed(e) {
		const fileExtension = e.target.files[0].name.split(".")[1]
		const allowedFileTypes = ["png", "jpeg", "jpg"]
		let isMatched = false
		for (let i of allowedFileTypes) {
			fileExtension === i && (isMatched = true)
		}
		if (!isMatched) {
			showAlert(`Only ${[...allowedFileTypes]} are allowed`)
		}
		return isMatched
	}

	const [adminCheckbox, setAdminCheckbox] = useState(false)
	const [employeeCheckBox, setemployeeCheckBox] = useState(false)
	const [userType, setUserType] = useState(null)

	function adminCheckboxHandler(e) {
		setUserType(1)
		setemployeeCheckBox(false)
		setAdminCheckbox(true)
	}
	function employeeCheckBoxHandler(e) {
		setUserType(2)
		setAdminCheckbox(false)
		setemployeeCheckBox(true)
	}

	function submitFormHandler(e) {
		e.preventDefault()
		for (let key of Object.entries(input)) {
			if (key[1] === "") {
				let alertMessage = `${key[0].toLocaleLowerCase()} is empty`
				showAlert(alertMessage)
				return false
			}
		}
		postSignUp()
	}

	const postSignUp = async () => {
		try {
			let sendData = {
				userName: input.userName,
				email: input.emailId,
				pass: input.password,
				userType,
				profilePicture
			}

			const res = await postUserData(sendData)

			let data = await res.json()

			console.log(data)

			showAlert(data.message)
		} catch (error) {}
	}

	function showAlert(message) {
		setAlert({
			isShow: true,
			message: message
		})

		setTimeout(() => {
			setAlert({
				isShow: false,
				message: ""
			})
		}, 2500)
	}

	function employeeAddFormHandler(e) {
		e.preventDefault()

		console.log("submitting")
		console.log(e.target, "--")
		let formData = new FormData(e.target)
		console.log(formData)
		for (let [key, value] of formData) {
			console.log(key, value)
		}

		
		checkIfEmpty()
	}

	function checkIfEmpty(_value) {
		if (_value === '' || _value === undefined || _value === null) {
			return false
		}
		return true
	}

	return (
		<div className='container-primary'>
			{alert.isShow && <Alert>{alert.message} </Alert>}
			<h3 className='heading-1'>Add User</h3>
			<div className=''>
				<form
					method='POST'
					className='add-employee-form-container'
					encType='multipart/form-data'
					onSubmit={employeeAddFormHandler}
				>
					<div className='form-input-group'>
						<label className='input-label' htmlFor='userName'>
							User Name
						</label>
						<input
							type='text'
							className='input-element'
							id='userName'
							name='userName'
						/>
					</div>

					<div className='form-input-group'>
						<label className='input-label' htmlFor='emailId'>
							Email ID
						</label>
						<input
							type='text'
							className='input-element'
							id='emailId'
							name='emailId'
						/>
					</div>
					<div className='form-input-group'>
						<label className='input-label' htmlFor='password'>
							Password
						</label>
						<input
							type='password'
							className='input-element'
							id='password'
							name='password'
						/>
					</div>

					<div className='form-input-group'>
						<label htmlFor='profile-photo' className='input-label'>
							Profile Photo
						</label>
						<input
							type='file'
							className=''
							id='profile-photo'
							name='profile-photo'
						/>
					</div>

					<div className='add-emp-checkbox-container'>
						<div className='form-check-group'>
							<input
								type='radio'
								id='adminCheckbox'
								name='employeeType'
								value='admin'
							/>
							<label className='input-label' htmlFor='adminCheckbox'>
								Admin
							</label>
						</div>
						<div className='form-check-group'>
							<input
								type='radio'
								id='employeeCheckBox'
								name='employeeType'
								value='employee'
							/>
							<label className='input-label' htmlFor='employeeCheckBox'>
								Employee
							</label>
						</div>
					</div>
					<div className=''>
						<Button type='submit' className='button button--primary'>
							Submit
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
export default AddEmployee
