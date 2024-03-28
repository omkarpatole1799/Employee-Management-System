const express = require('express');
const router = express.Router();

const {
	postLogData,
	getLogList,
	postProjectName
} = require('../controllers/userController');

router.get('/log-list', getLogList);

router.post('/add-log', postLogData);

router.post('/add-project', postProjectName);

module.exports = router;
