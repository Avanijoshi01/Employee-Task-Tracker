const Task = require('../models/Task');

exports.getAllTasks = async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      employee_id: req.query.employee_id,
      priority: req.query.priority
    };
    
    // Regular users can only see their own tasks
    if (req.user.role !== 'admin' && req.user.employee_id) {
      filters.employee_id = req.user.employee_id;
    }
    
    const tasks = await Task.findAll(filters);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority, employee_id, due_date } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const task = await Task.create({ title, description, status, priority, employee_id, due_date });
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, employee_id, due_date } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const task = await Task.update(req.params.id, { title, description, status, priority, employee_id, due_date });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.delete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    // Regular users see stats for their tasks only
    const employeeId = req.user.role === 'admin' ? null : req.user.employee_id;
    const stats = await Task.getDashboardStats(employeeId);
    res.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};
