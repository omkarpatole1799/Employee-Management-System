const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserModel = require("../models/user")
const STATUS = require("../utils/statusMessages.js")
const { throwError, tryCatch } = require("../utils/help.js")

exports.postUserLogin = tryCatch(async function (req, res, next) {
  const { email, password } = req.body

  if (!email || email == "" || !password || password == "") {
    throwError(STATUS.E_INVALID_CREDENTIALS, 403)
  }

  let user = await UserModel.findOne({
    where: {
      userEmail: email
    },
    attributes: [
      ["id", "userId"],
      ["userName", "userName"],
      ["userEmail", "userEmail"],
      ["password", "userPassword"],
      ["userType", "userType"],
      ["profilePicture", "userProfile"]
    ],
    raw: true
  })

  if (!user) {
    throwError(STATUS.E_INVALID_CREDENTIALS, 403)
  }

  console.log(user, "logedin ")

  let isMatch = await bcrypt.compare(password, user.userPassword)

  if (!isMatch) {
    throwError(STATUS.E_INVALID_CREDENTIALS, 403)
  }

  let token = await jwt.sign(
    {
      userEmail: email,
      userId: user.id
    },
    `${process.env.JWT_SECRET}`,
    { expiresIn: "10h" }
  )

  res.status(200).json({
    success: true,
    message: "authenticated",
    token
  })
})
