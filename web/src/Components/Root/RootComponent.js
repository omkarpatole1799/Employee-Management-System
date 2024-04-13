import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import { useSelector } from "react-redux"

import Loader from "../UI/Loader/Loader"
import { Notification } from "../UI/Notification/Notification"
import Alert from "../UI/Button/Alert/Alert"

function RootComponent() {
  const isShowLoader = useSelector(state => state.loader.showLoader)

  const isShowNotification = useSelector(
    state => state.notification.showNotification
  )

  const message = useSelector(state => state.notification.message)
  return (
    <div className=''>
      {alert.isShow && <Alert>{alert.message} </Alert>}
      <div className=''>
        <Navbar></Navbar>
      </div>
      <div className=''>
        {isShowLoader && <Loader />}
        {/* {isShowNotification && <Notification />} */}
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default RootComponent
