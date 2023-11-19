const express = require('express');
const router = express.Router();

const {
  postLogData,
  getLogList
} = require('../Controller/userController');

router.get('/log-list', getLogList);

router.post('/add-log', postLogData);

module.exports = router;
