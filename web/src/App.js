// FUNCTION IMPORTS
import React from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

// COMPONENTS IMPORT
import AddEmployee from './Components/AddUser/AddEmployee'
import AddLog from './Components/AddLog/AddLog'
import Dashboard from './Components/Dashboard/Dashboard'
import Login from './Components/Login/Login'
import LogList from './Components/LogList/LogList'
import RootComponent from './Components/Root/RootComponent'
import Attendance from './Components/Attendance/Attendance'
import AddProject from './Components/AddProject/AddProject'

// UTIL FUNCTION IMPORTS
import privateRouteLoader from './Utils/privateRouteLoader'

// CREATE BROWSER ROUTER
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootComponent />,
    loader: privateRouteLoader,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/add-employee', element: <AddEmployee /> },
      { path: '/add-log', element: <AddLog /> },
      { path: '/log-list', element: <LogList /> },
      { path: '/add-attendance', element: <Attendance /> },
      { path: '/add-project', element: <AddProject /> },
    ]
  },
  { path: '/login', element: <Login /> }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
export default App
