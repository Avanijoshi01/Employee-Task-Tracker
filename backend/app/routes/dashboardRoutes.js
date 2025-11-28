const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, taskController.getDashboard);

module.exports = router;
