const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const { throwError } = require("../utils/help")
const { E_UNAUTHORIZED } = require("../utils/statusMessages")
dotenv.config()

const isAuth = (req, res, next) => {
	console.log('is Auth')
	const authHeader = req.get("Authorization")

	if (!authHeader) throwError(E_UNAUTHORIZED, 401)

	let tocken = authHeader.split(" ")[1]
	let userId = authHeader.split(" ")[2]
	if (!tocken && !userId) throwError(E_UNAUTHORIZED, 401)

	jwt.verify(tocken, `${process.env.JWT_SECRET}`, function (err, response) {
		if (err) {
			throwError(E_UNAUTHORIZED, 401)
		} else {
			console.log(response, 'after verifying')
			req.userId = userId
			next()
		}
	})
}
module.exports = isAuth
