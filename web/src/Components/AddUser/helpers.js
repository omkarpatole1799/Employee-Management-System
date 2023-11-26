export async function postUserData(data) {
  console.log(data)
  let formData = new FormData()
  for (let el of Object.entries(data)) {
    console.log(el)
    formData.append(el[0], el[1])
  }

  return await fetch('/admin/add-employee', {
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization:
        'Bearer ' +
        localStorage.getItem('tocken') +
        ' ' +
        localStorage.getItem('userId')
    },
    body: formData
  })
}
