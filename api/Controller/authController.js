const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserModel = require("../Model/user")

exports.postUserLogin = async function (req, res) {
	const { userEmail, pass: enteredPassword } = req.body
	console.log(req.body, "in api")
	console.log(req.body)

	try {
		let user = await UserModel.findOne({
			where: {
				userEmail
			},
			attributes: [
				["userName", "userName"],
				["userEmail", "userEmail"],
				["password", "userPassword"],
				["userType", "userType"],
				["profilePicture", "userProfile"]
			],
			raw: true
		})

		if (user === null || user === undefined) {
			// res.status(404)
			throw new Error("Email not match")
		}
		console.log(user, "==user")
		let isMatch = bcrypt.compare(enteredPassword, user.userPassword)
		if (!isMatch) {
			res.status(401)
			throw new Error("Password not match")
		}

		let token = await jwt.sign(
			{
				userEmail,
				userId: user.id
			},
			`${process.env.JWT_SECRET}`,
			{ expiresIn: "10h" }
		)

		res.status(200).json({
			message: "authenticated",
			token,
			userId: user.id,
			userName: user.userName,
			userType: user.userType
		})
	} catch (error) {
		console.log(error)
		return res.json({
			error: error.message
		})
	}
}
