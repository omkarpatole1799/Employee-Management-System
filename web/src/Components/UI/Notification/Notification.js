import { useDispatch, useSelector } from "react-redux"
import { notifcationActions } from "../../../Store/notification-slice"
export const Notification = props => {
  const dispatch = useDispatch()
  const message = useSelector(state => state.notification.message)

  setTimeout(() => {
    dispatch(notifcationActions.hideNotification())
  }, 2000)

  return (
    <>
      <div className='alert'>{message}</div>
    </>
  )
}
