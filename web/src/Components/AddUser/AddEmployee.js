// functions import

import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { notifcationActions } from "../../Store/notification-slice"
import { loaderActions } from "../../Store/loader-slice"
// components import
import Button from "../UI/Button/Button"

// CSS IMPORT
import "./addEmployee.css"
import Alert from "../UI/Button/Alert/Alert"

function AddEmployee() {
	const dispatch = useDispatch()
	const profilePictureInputRef = useRef()
	const profilePicturePreviewRef = useRef()

	const [showProfileImgPreviewContainer, setShowProfileImgPreviewContainer] =
		useState(false)

	function profileImageChangeHandler(e) {
		let files = e.target.files
		let reader = new FileReader()
		setShowProfileImgPreviewContainer(true)
		reader.onload = result => {
			profilePicturePreviewRef.current.src = result.target.result
		}
		reader.readAsDataURL(files[0])
	}

	function addProflieImgHandler() {
		profilePictureInputRef.current.click()
	}

	async function employeeAddFormHandler(e) {
		e.preventDefault()
		let formData = new FormData(e.target)
		dispatch(loaderActions.showLoader())

		let resPromise = await fetch("/admin/add-employee", {
			method: "POST",
			mode: "cors",
			headers: {
				Authorization:
					"Bearer " +
					localStorage.getItem("tocken") +
					" " +
					localStorage.getItem("userId")
			},
			body: formData
		})

		let data = await resPromise.json()
		console.log(data, "add employee response ")

		if (data.call === 1) {
			dispatch(notifcationActions.showNotification(data.message))
		} else {
			dispatch(notifcationActions.showNotification(data.message))
		}
		dispatch(loaderActions.hideLoader())
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
						<input
							type='text'
							className='input-element'
							id='userName'
							name='userName'
							autoComplete=''
							required
						/>
						<label className='input-label' htmlFor='userName'>
							User Name
						</label>
					</div>

					<div className='form-input-group'>
						<input
							type='text'
							className='input-element'
							id='emailId'
							name='emailId'
							required
						/>
						<label className='input-label' htmlFor='emailId'>
							Email ID
						</label>
					</div>
					<div className='form-input-group'>
						<input
							type='password'
							className='input-element'
							id='password'
							name='password'
							required
						/>
						<label className='input-label' htmlFor='password'>
							Password
						</label>
					</div>

					{/* EMPLOYEE TYPE */}
					<div className='form-check-group-container'>
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

					{/* PROFILE PHOTO */}
					<div className='form-input-group profile-img-input-group'>
						<span className='input-label'>Capture Photo *</span>
						<div>
							<input
								type='file'
								className=''
								id='profile-img'
								name='profileImg'
								ref={profilePictureInputRef}
								capture='environment'
								onChange={profileImageChangeHandler}
							/>
							<Button
								onClick={addProflieImgHandler}
								type='button'
								className='button'
							>
								<i className='fa-solid fa-camera'></i>
							</Button>
						</div>
					</div>
					{showProfileImgPreviewContainer && (
						<div id='profile-img-preview'>
							<img
								width='100%'
								height='100%'
								src=''
								alt=''
								ref={profilePicturePreviewRef}
							/>
						</div>
					)}
					<Button type='submit' className='button'>
						Submit
					</Button>
				</form>
			</div>
		</div>
	)
}
export default AddEmployee
