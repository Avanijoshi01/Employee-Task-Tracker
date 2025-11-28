const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

router.get('/', authenticateToken, employeeController.getAllEmployees);
router.get('/:id', authenticateToken, employeeController.getEmployeeById);
router.post('/', authenticateToken, requireAdmin, employeeController.createEmployee);
router.put('/:id', authenticateToken, requireAdmin, employeeController.updateEmployee);
router.delete('/:id', authenticateToken, requireAdmin, employeeController.deleteEmployee);

module.exports = router;
