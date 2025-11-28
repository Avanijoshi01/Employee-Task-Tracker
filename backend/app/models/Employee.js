const pool = require('../config/database');

class Employee {
  static async findAll() {
    const result = await pool.query(
      'SELECT * FROM employees ORDER BY id ASC'
    );
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(
      'SELECT * FROM employees WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async create(employeeData) {
    const { name, email, department, position } = employeeData;
    const result = await pool.query(
      'INSERT INTO employees (name, email, department, position) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, department, position]
    );
    return result.rows[0];
  }

  static async update(id, employeeData) {
    const { name, email, department, position } = employeeData;
    const result = await pool.query(
      'UPDATE employees SET name = $1, email = $2, department = $3, position = $4 WHERE id = $5 RETURNING *',
      [name, email, department, position, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM employees WHERE id = $1', [id]);
    return { message: 'Employee deleted successfully' };
  }
}

module.exports = Employee;
