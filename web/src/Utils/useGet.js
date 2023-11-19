async function useGet(reqData) {
  let response = await fetch(
    `${process.env.REACT_APP_SERVER_IP}/${reqData.url}`,
    reqData.headers ? reqData.headers : null
  )
  
  let data = await response.json()

  return data
}

export default useGet
