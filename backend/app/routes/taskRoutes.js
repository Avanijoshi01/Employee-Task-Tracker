const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

router.get('/', authenticateToken, taskController.getAllTasks);
router.get('/:id', authenticateToken, taskController.getTaskById);
router.post('/', authenticateToken, requireAdmin, taskController.createTask);
router.put('/:id', authenticateToken, requireAdmin, taskController.updateTask);
router.delete('/:id', authenticateToken, requireAdmin, taskController.deleteTask);

module.exports = router;
