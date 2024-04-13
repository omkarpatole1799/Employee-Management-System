exports.throwError = (err, status) => {
  let error = new Error(err)
  error.status = status
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

exports.tryCatch = controller => async (req, res, next) => {
  try {
    await controller(req, res)
  } catch (error) {
    next(error)
  }
}


