const express = require("express")

const router = express.Router()
const { postUserLogin } = require("../controllers/authController")

router.post("/login", postUserLogin)

module.exports = router
