import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import './dashboard.css'
import DashboardButton from '../UI/Button/DashboardButton'

function Dashboard() {
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(false)
  const [userName, setUserName] = useState('')

  const [totalEmployees, setTotalEmployees] = useState(0)

  useEffect(() => {
    checkUserType()
    if (isAdmin) getTotalEmployeeCount()
    getUserName()
  })

  function checkUserType() {
    localStorage.getItem('userType') === '1'
      ? setIsAdmin(true)
      : setIsAdmin(false)
  }

  async function getTotalEmployeeCount() {
    const res = await fetch('/admin/get-employee-count', {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer ' +
          localStorage.getItem('tocken') +
          ' ' +
          localStorage.getItem('userId')
      }
    })
    let data = await res.json()
    setTotalEmployees(data.totalEmployees.total_employees)
  }

  function getUserName() {
    setUserName(localStorage.getItem('userName'))
  }

  return (
    <div className='dashboard-container'>
      <h3 className='heading-1 dashboard-welcome-heading'>
        {' '}
        {userName}
      </h3>
      <DashboardButton
        className='button'
        onClick={() => navigate('/add-attendance')}
        btnName={'Attendance'}
      />

      <DashboardButton
        className='button'
        onClick={() => navigate('/add-log')}
        btnName={'Add log'}
      />

      <DashboardButton
        className='button'
        onClick={() => navigate('/log-list')}
        btnName={'Log list'}
      />

      {isAdmin && (
        <DashboardButton
          className='button'
          onClick={() => navigate('/add-employee')}
          btnName={'Add Employee'}
        />
      )}

      {isAdmin && (
        <DashboardButton
          className='button'
          btnName={`Total Employees ${totalEmployees}`}
        />
      )}
    </div>
  )
}

export default Dashboard
