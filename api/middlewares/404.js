const _404 = (_, res) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: "Not found"
  })
}

module.exports = _404
