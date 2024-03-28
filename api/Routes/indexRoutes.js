const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const userRoutes = require('./userRoutes');
const isAuth = require('../middlewares/is-auth');

// ROUTES
router.get('/', (req, res) => {
	res.status(200).json({
		message: 'From Docker'
	});
});

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/user', isAuth, userRoutes);

module.exports = router;
