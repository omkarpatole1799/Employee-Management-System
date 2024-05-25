exports.throwError = (err, status = 500, error_code) => {
  let error = new Error(err)
  error.status = status
  error.error_code = error_code
  throw error
}

exports.sendSuccess = (
  res,
  { message = "Success", status = 200, data = {} }
) => {
  res.status(status).json({
    success: true,
    status: status,
    message: message,
    data: data
  })
}

exports.tryCatch = controller => {
  return (req, res, next) => {
    controller(req, res, next).catch(err => next(err))
  }
}
