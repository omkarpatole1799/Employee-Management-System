import { useState, useRef } from 'react'

import './addProject.css'

function AddProject() {
	let projectName = useRef()

	async function addProjectHandler() {
		console.log(projectName.current.value)
		let response = await fetch('/user/add-project', {
			method: 'POST',
			headers: {
				Authorization:
					'Bearer ' +
					localStorage.getItem('tocken') +
					' ' +
					localStorage.getItem('userId'),
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				projectName: projectName.current.value
			})
		})
		let data = await response.json()
		console.log(data)
	}

	return (
		<>
			<div className='container-primary'>
				<h1 className='heading-1'>Add Project</h1>
				<form action='' className='add-project-form-container'>
					<div className='form-group'>
						<label htmlFor='project-name' className='input-label'>
							Project Name
						</label>
						<input
							ref={projectName}
							type='text'
							id='project-name'
							name='project-name'
							className='input-element'
						/>
					</div>
					<button
						type='button'
						className='button button--primary'
						onClick={addProjectHandler}
					>
						Submit
					</button>
				</form>
			</div>
		</>
	)
}

export default AddProject
