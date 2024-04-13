const headers = {
  Authorization: `Bearer ${localStorage.getItem(
    "tocken"
  )} ${localStorage.getItem("userId")}`
}

export default headers
