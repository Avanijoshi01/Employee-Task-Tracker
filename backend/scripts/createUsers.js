const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function createUsers() {
  try {
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Clear existing users
    await pool.query('DELETE FROM users');

    // Insert users with properly hashed passwords
    await pool.query(`
      INSERT INTO users (username, password, role, employee_id) VALUES
      ('admin', $1, 'admin', NULL),
      ('john.doe', $1, 'user', 1),
      ('jane.smith', $1, 'user', 2),
      ('mike.johnson', $1, 'user', 3)
    `, [hashedPassword]);

    console.log('Users created successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin: username=admin, password=password123');
    console.log('User 1: username=john.doe, password=password123');
    console.log('User 2: username=jane.smith, password=password123');
    console.log('User 3: username=mike.johnson, password=password123');
    
    pool.end();
  } catch (error) {
    console.error('Error creating users:', error);
    pool.end();
  }
}

createUsers();
