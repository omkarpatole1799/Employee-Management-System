import { useNavigate } from "react-router-dom"
import React, { useCallback, useEffect, useState } from "react"

import "./dashboard.css"
import DashboardButton from "../UI/Button/DashboardButton"

function Dashboard() {
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(false)
  const [userName, setUserName] = useState("")

  const [totalEmployees, setTotalEmployees] = useState(0)
  const getTotalEmployeeCount = useCallback(async () => {
    console.log("getting count")
    const res = await fetch("/admin/get-employee-count", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " +
          localStorage.getItem("tocken") +
          " " +
          localStorage.getItem("userId")
      }
    })
    let { data } = await res.json()
    console.log(data, "temp")
    setTotalEmployees(data.employeeCount.total_employees)
  }, [])

  useEffect(() => {
    checkUserType()
    if (isAdmin) getTotalEmployeeCount()
    getUserName()
  }, [isAdmin, getTotalEmployeeCount])

  function checkUserType() {
    localStorage.getItem("userType") === "1"
      ? setIsAdmin(true)
      : setIsAdmin(false)
  }

  function getUserName() {
    setUserName(localStorage.getItem("userName"))
  }

  return (
    <div className='dashboard-container'>
      <h3 className='heading-1 dashboard-welcome-heading'>{userName}</h3>
      <DashboardButton
        className='button'
        onClick={() => navigate("/add-attendance")}
        btnName={"Attendance"}
      />

      <DashboardButton
        className='button'
        onClick={() => navigate("/add-log")}
        btnName={"Add log"}
      />

      <DashboardButton
        className='button'
        onClick={() => navigate("/log-list")}
        btnName={"Log list"}
      />

      {isAdmin && (
        <>
          <DashboardButton
            className='button'
            onClick={() => navigate("/add-employee")}
            btnName={"Add Employee"}
          />

          <DashboardButton
            className='button'
            btnName={`Total Employees ${totalEmployees}`}
            onClick={() => navigate("/employee-list")}
          />

          <DashboardButton
            className='button'
            btnName={`Add Project`}
            onClick={() => navigate("/add-project")}
          />
        </>
      )}
    </div>
  )
}

export default Dashboard
