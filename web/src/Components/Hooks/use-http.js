import { notifcationActions } from "../../Store/notification-slice"
import { useDispatch } from "react-redux"
const useHttp = () => {
  const dispatch = useDispatch()

  const sendRequest = async (requestData, applyData) => {
    dispatch(notifcationActions.showLoader())
    try {
      console.log(requestData.body)
      let res = await fetch(requestData.url, {
        method: requestData.method ? requestData.method : "GET",
        headers: requestData.headers ? requestData.headers : {},
        body: requestData.body ? JSON.stringify(requestData.body) : null
      })
      if (!res.ok) {
        throw new Error("Request failed")
      }
      const data = await res.json()

      dispatch(notifcationActions.hideLoader())
      applyData(data)
    } catch (err) {
      console.log(err.message || "Something went wrong")
    }
  }
  return {
    sendRequest
  }
}

export default useHttp
