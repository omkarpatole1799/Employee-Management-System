const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const { throwError } = require("../utils/help")
const { E_UNAUTHORIZED } = require("../utils/statusMessages")
dotenv.config()

const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization")

  if (!authHeader) throwError(E_UNAUTHORIZED, 401)

  console.log(authHeader.split(" "))
  let [_, tocken, userId] = authHeader.split(" ")

  if (!tocken && !userId) throwError(E_UNAUTHORIZED, 401)

  jwt.verify(tocken, `${process.env.JWT_SECRET}`, function (err, response) {
    if (err) throwError(E_UNAUTHORIZED, 401)
    else {
      req.userId = userId
      next()
    }
  })
}
module.exports = isAuth
