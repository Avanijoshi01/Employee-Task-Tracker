-- Add users table for authentication

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    employee_id INTEGER REFERENCES employees(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster lookups
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_employee_id ON users(employee_id);

-- Insert sample users
-- Password for all users: 'password123'
-- Hashed with bcrypt

INSERT INTO users (username, password, role, employee_id) VALUES
('admin', '$2a$10$rZ5qYXKqYqYqYqYqYqYqYuK5qYXKqYqYqYqYqYqYqYqYqYqYqYqYq', 'admin', NULL),
('john.doe', '$2a$10$rZ5qYXKqYqYqYqYqYqYqYuK5qYXKqYqYqYqYqYqYqYqYqYqYqYqYq', 'user', 1),
('jane.smith', '$2a$10$rZ5qYXKqYqYqYqYqYqYqYuK5qYXKqYqYqYqYqYqYqYqYqYqYqYqYq', 'user', 2),
('mike.johnson', '$2a$10$rZ5qYXKqYqYqYqYqYqYqYuK5qYXKqYqYqYqYqYqYqYqYqYqYqYqYq', 'user', 3);
