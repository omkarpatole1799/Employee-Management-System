class AppError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.stack = Error.captureStackTrace(this)
  }
}

module.exports = AppError
