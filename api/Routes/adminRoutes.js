const express = require("express")
const router = express.Router()
const {
  addUser,
  getEmployeeCount,
  getEmployeeList,
  deleteEmployee
} = require("../controllers/adminController")

// ADD EMPLOYEE
router.post("/add-employee", addUser)

// GET TOTAL EMPLOYEES COUNT
router.get("/get-employee-count", getEmployeeCount)

router.get("/get-employee-list", getEmployeeList)

router.post("/delete-employee", deleteEmployee)

module.exports = router
