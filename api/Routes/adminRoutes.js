const express = require('express');
const router = express.Router();
const { addUser, getEmployeeCount } = require('../Controller/adminController');

// ADD EMPLOYEE
router.post('/add-employee', addUser);

// GET TOTAL EMPLOYEES COUNT
router.get('/get-employee-count', getEmployeeCount)

module.exports = router;
