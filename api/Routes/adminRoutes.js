const express = require('express');
const router = express.Router();
const { addUser, getEmployeeCount } = require('../Controller/adminController');

router.post('/add-employee', addUser);

// GET TOTAL EMPLOYEES COUNT
router.get('/get-employee-count', getEmployeeCount)

module.exports = router;
