const pool = require('../config/database');

class Task {
  static async findAll(filters = {}) {
    let query = `
      SELECT t.*, e.name as employee_name 
      FROM tasks t 
      LEFT JOIN employees e ON t.employee_id = e.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (filters.status) {
      query += ` AND t.status = $${paramCount}`;
      params.push(filters.status);
      paramCount++;
    }

    if (filters.employee_id) {
      query += ` AND t.employee_id = $${paramCount}`;
      params.push(filters.employee_id);
      paramCount++;
    }

    if (filters.priority) {
      query += ` AND t.priority = $${paramCount}`;
      params.push(filters.priority);
      paramCount++;
    }

    query += ' ORDER BY t.created_at DESC';

    const result = await pool.query(query, params);
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(
      'SELECT t.*, e.name as employee_name FROM tasks t LEFT JOIN employees e ON t.employee_id = e.id WHERE t.id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async create(taskData) {
    const { title, description, status, priority, employee_id, due_date } = taskData;
    const result = await pool.query(
      'INSERT INTO tasks (title, description, status, priority, employee_id, due_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, status || 'Pending', priority || 'Medium', employee_id, due_date]
    );
    return result.rows[0];
  }

  static async update(id, taskData) {
    const { title, description, status, priority, employee_id, due_date } = taskData;
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, status = $3, priority = $4, employee_id = $5, due_date = $6 WHERE id = $7 RETURNING *',
      [title, description, status, priority, employee_id, due_date, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    return { message: 'Task deleted successfully' };
  }

  static async getDashboardStats(employeeId = null) {
    const whereClause = employeeId ? `WHERE employee_id = ${employeeId}` : '';
    
    const totalTasksResult = await pool.query(`SELECT COUNT(*) as count FROM tasks ${whereClause}`);
    const completedTasksResult = await pool.query(`SELECT COUNT(*) as count FROM tasks ${whereClause} ${whereClause ? 'AND' : 'WHERE'} status = 'Completed'`);
    const pendingTasksResult = await pool.query(`SELECT COUNT(*) as count FROM tasks ${whereClause} ${whereClause ? 'AND' : 'WHERE'} status = 'Pending'`);
    const inProgressTasksResult = await pool.query(`SELECT COUNT(*) as count FROM tasks ${whereClause} ${whereClause ? 'AND' : 'WHERE'} status = 'In Progress'`);
    const totalEmployeesResult = await pool.query('SELECT COUNT(*) as count FROM employees');

    const totalTasks = parseInt(totalTasksResult.rows[0].count);
    const completedTasks = parseInt(completedTasksResult.rows[0].count);
    const pendingTasks = parseInt(pendingTasksResult.rows[0].count);
    const inProgressTasks = parseInt(inProgressTasksResult.rows[0].count);
    const totalEmployees = parseInt(totalEmployeesResult.rows[0].count);

    const completionRate = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      completionRate: parseFloat(completionRate),
      totalEmployees
    };
  }
}

module.exports = Task;
