import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './LogList.css'

function LogList() {
  const navigate = useNavigate()
  const [logList, setLogList] = useState([])

  useEffect(() => {
    getLogList()
  }, [])

  async function getLogList() {
    let response = await fetch('/user/log-list', {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer ' +
          localStorage.getItem('tocken') +
          ' ' +
          localStorage.getItem('userId')
      }
    })
    let data = await response.json()
    console.log(data)
    setLogList(data.data)
  }

  const addLogButtonHandler = () => navigate('/add-log')

  return (
    <div className='container-primary'>
      {/* LOG LIST NAV (SELECT MONTH, ADD LOG BTN) */}
      <nav className='log-list-nav margin-bottom-md'>
        <div>
          <select name='select-month' id=''>
            <option value=''>oct</option>
            <option value=''>nov</option>
            <option value=''>dec</option>
          </select>
        </div>
        <button
          className='button button--primary '
          onClick={addLogButtonHandler}
        >
          Add log
        </button>
      </nav>

      {/* MAP ALL LOG */}
      {logList && logList.length > 0 && (
        <div>
          {logList &&
            logList.map((el) => {
              return (
                <div className='log-card'>
                  <p className='log-date'>
                    {el.createdAt.split('T')[0]}
                  </p>
                  <div className='log-text-container'>
                    <p>
                      {el.logInfo.length > 100
                        ? el.logInfo.slice(0, 100) + ' ...'
                        : el.logInfo}
                    </p>
                    <button className='button button--log-menu'>
                      <ion-icon
                        className='log-menu-logo'
                        name='ellipsis-vertical-circle-outline'
                      ></ion-icon>
                    </button>
                  </div>
                </div>
              )
            })}
        </div>
      )}

      {/* IF LOGS EMPTY THEN NO LOG FOUND */}
      {logList && logList.length === 0 && (
        <div className='log-card'>
          <p>No Logs Found</p>
          <p>Click add log to get started!</p>
        </div>
      )}
    </div>
  )
}

export default LogList
