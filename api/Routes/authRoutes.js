const express = require('express');

const router = express.Router();
const { postUserLogin } = require('../Controller/authController');

router.post('/login', postUserLogin);

module.exports = router;
