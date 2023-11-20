import React, {
  useEffect,
  useState,
  useCallback
} from 'react'
import { useNavigate } from 'react-router-dom'

import './LogList.css'

function LogList() {
  const navigate = useNavigate()
  const [logList, setLogList] = useState([])
  const [logListAll, setLogListAll] = useState([])

  let monthsList = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ]

  const [logMonth, setLogMonth] = useState(
    monthsList[new Date().getMonth()]
  ) // DEFAULT LOG MONTH IS CURRENT MONTH

  useEffect(() => {
    getLogList()
  },[])

  useEffect(() => {
    filterLogs(logMonth)
  }, [logMonth, logList])

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
    setLogList(data.data)
  }

  function getMonthWiseLog(e) {
    setLogMonth(e.target.value)
    // filterLogs(e.target.value)
  }

  function filterLogs(month) {
    console.log(month)
    console.log(logList)
    let data = logList.filter((log) => {
      if (
        log.createdAt.split('-')[1] ==
        monthsList.indexOf(month) + 1
      ) {
        return log
      }
    })
    setLogListAll(data)
  }

  return (
    <div className='container-primary'>
      <h1 className='heading-1'>Log list</h1>
      {/* LOG LIST NAV (SELECT MONTH, ADD LOG BTN) */}
      <nav className='log-list-nav margin-bottom-md'>
        <div>
          <select
            onChange={getMonthWiseLog}
            value={logMonth}
            name='select-month'
            id='log-list-month'
            className='button button-secondary'
          >
            {monthsList.map((month) => {
              return <option value={month}>{month}</option>
            })}
          </select>
        </div>
        <button
          className='button button--primary '
          onClick={() => navigate('/add-log')}
        >
          Add log
        </button>
      </nav>

      {/* MAP ALL LOG */}
      {logListAll && logListAll.length > 0 && (
        <div>
          {logListAll &&
            logListAll.map((el, i) => {
              return (
                <div className='log-card' key={i}>
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
      {logListAll && logListAll.length === 0 && (
        <div className='log-card'>
          <p>No Logs Found</p>
          <p>Click add log to get started!</p>
        </div>
      )}
    </div>
  )
}

export default LogList
