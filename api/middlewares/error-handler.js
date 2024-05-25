const errorHandler = (error, req, res, next) => {
  if (error?.code === "ENOENT") {
    error.status = 500
    error.message = "Failed to save profile image"
  }

  if (process.env.PROJECT_ENV === "DEV") {
    res.status(error.status || 500).json({
      success: false,
      error_status: error.statusCode || 500,
      message: error.message || "Something went wrong",
      error_stack: error.stack
    })
  } else {
    res.status(error.status || 500).json({
      success: false,
      error_status: error.statusCode || 500,
      message: error.message || "Something went wrong"
    })
  }
}

module.exports = errorHandler
