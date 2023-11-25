import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../UI/Button/Button'

// CSS IMPORT
import './add-log.css'

function AddLog() {
  const navigate = useNavigate()
  const [log, setLog] = useState()
  const [logError, setLogError] = useState(false)
  const [projectTitle, setProjectTitle] = useState()
  const [projectTitleError, setProjectTitleError] =
    useState(false)

  const [logStatus, setLogStatus] = useState(false)

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
  }

  const projectListItems = [
    'R & D',
    'Project 1',
    'Project 2',
    'Project 3'
  ]

  return (
    <div className='container-primary'>
      <h3 className='heading-1'>Add Log</h3>
      <div className='log-form-container'>
        <form>
          <div className='projct-dropdown'>
            <select
              value={projectTitle}
              id='projectListItems'
              className=''
              onChange={dropDownChangeHandler}
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
            <div
              className={
                projectTitleError ? 'alert alert' : 'alert'
              }
            >
              Please select project title
            </div>
          </div>

          <div className='log-description'>
            <label
              htmlFor='logDescription'
              className='heading-2 dis-inline-block'
            >
              Log Description
            </label>
            <textarea
              value={log}
              type='text'
              className=''
              id='logDescription'
              name='logDescription'
              rows='10'
              onChange={logChangeHandler}
            />
            <div
              className={logError ? 'alert alert' : 'alert'}
            >
              Please enter log
            </div>
          </div>

          <div className='add-log-button-container'>
            <Button
              onClick={submitLogHandler}
              type='button'
              className='button button--primary'
            >
              Submit
            </Button>

            <Button
              onClick={() => navigate('/log-list')}
              className='button button--secondary'
            >
              Log list
            </Button>
          </div>

          <div
            className={logStatus ? 'alert alert' : 'alert'}
          >
            Log Added Successfully
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddLog
