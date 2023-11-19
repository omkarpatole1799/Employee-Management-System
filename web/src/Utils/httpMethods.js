export async function getReq(reqData) {
  let response = await fetch(
    `${process.env.REACT_APP_SERVER_IP}/${reqData.url}`,
    reqData.headers ? reqData.headers : ''
  )

  let data = await response.json()

  return data
}
