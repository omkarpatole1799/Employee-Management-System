import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../UI/Button/Button'

// CSS IMPORT
import './add-log.css'
import Loader from '../UI/Loader/Loader'

function AddLog() {
	const navigate = useNavigate()
	const [log, setLog] = useState()
	const [logError, setLogError] = useState(false)
	const [projectTitle, setProjectTitle] = useState()
	const [projectTitleError, setProjectTitleError] = useState(false)

	const [logStatus, setLogStatus] = useState(false)

	const [isLoading, setIsLoading] = useState(false)

	const logChangeHandler = (e) => {
		setLog(e.target.value)
	}

	const dropDownChangeHandler = (e) => {
		setProjectTitle(e.target.value)
	}

	function submitLogHandler(e) {
		e.preventDefault()

		if (projectTitle === undefined || projectTitle === '') {
			setProjectTitleError(true)
			setTimeout(() => {
				setProjectTitleError(false)
			}, 1500)
			return false
		}

		if (log === undefined || log === '') {
			setLogError(true)
			setTimeout(() => {
				setLogError(false)
			}, 1500)
			return false
		}

		setLogError(false)
		setProjectTitleError(false)

		let sendData = {
			log,
			projectTitle
		}

		postLogData(sendData)
	}

	async function postLogData(sendData) {
		setIsLoading(true)
		const res = await fetch('/user/add-log', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Bearer ' +
					localStorage.getItem('tocken') +
					' ' +
					localStorage.getItem('userId')
			},
			mode: 'cors',
			body: JSON.stringify(sendData)
		})

		const { message } = await res.json()
		if (message === 'successfully added log') {
			setLog('')
			setProjectTitle('')
			setLogStatus(true)
			setTimeout(() => {
				setLogStatus(false)
			}, 2500)
		}
		setIsLoading(false)
	}

	const projectListItems = ['R & D', 'Project 1', 'Project 2', 'Project 3']

	return (
		<>
			{isLoading && <Loader />}
			<div className='container-primary'>
				<h3 className='heading-1'>Add Log</h3>
				<div className='log-form-container'>
					<form onSubmit={submitLogHandler}>
						<div className='projct-dropdown'>
							<select
								id='projectListItems'
								className=''
								name='projectName'
							>
								<option>Select Project</option>
								{projectListItems.map((el, i) => {
									return (
										<option key={i} value={el}>
											{el}
										</option>
									)
								})}
							</select>
						</div>

						<div className='log-description'>
							<label
								htmlFor='logDescription'
								className='heading-2 dis-inline-block'
							>
								Log Description
							</label>
							<textarea
								type='text'
								className=''
								id='logDescription'
								name='logDescription'
								rows='10'
								required
							/>
						</div>

						<div className='add-log-button-container'>
							<Button
								className='button button--primary'
								type='submit'
							>
								Submit
							</Button>

							<Button
								onClick={() => navigate('/log-list')}
								className='button btn--secondary'
								type='button'
							>
								Log list
							</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
export default AddLog
