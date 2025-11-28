-- Sample data for Employee Task Tracker

-- Insert sample employees
INSERT INTO employees (name, email, department, position) VALUES
('John Doe', 'john.doe@company.com', 'Engineering', 'Senior Developer'),
('Jane Smith', 'jane.smith@company.com', 'Engineering', 'Frontend Developer'),
('Mike Johnson', 'mike.johnson@company.com', 'Design', 'UI/UX Designer'),
('Sarah Williams', 'sarah.williams@company.com', 'Marketing', 'Marketing Manager'),
('David Brown', 'david.brown@company.com', 'Engineering', 'Backend Developer');

-- Insert sample tasks
INSERT INTO tasks (title, description, status, priority, employee_id, due_date) VALUES
('Implement user authentication', 'Add JWT-based authentication to the API', 'In Progress', 'High', 1, '2025-12-05'),
('Design landing page', 'Create mockups for the new landing page', 'Completed', 'Medium', 3, '2025-11-25'),
('Fix login bug', 'Users cannot login with special characters in password', 'Pending', 'High', 2, '2025-12-01'),
('Update documentation', 'Update API documentation with new endpoints', 'Pending', 'Low', 1, '2025-12-10'),
('Social media campaign', 'Plan and execute Q4 social media campaign', 'In Progress', 'Medium', 4, '2025-12-15'),
('Database optimization', 'Optimize slow queries in the tasks table', 'Pending', 'High', 5, '2025-12-03'),
('Mobile responsive design', 'Make the dashboard mobile-friendly', 'In Progress', 'Medium', 2, '2025-12-08'),
('Setup CI/CD pipeline', 'Configure GitHub Actions for automated deployment', 'Completed', 'High', 5, '2025-11-20'),
('User feedback analysis', 'Analyze user feedback from last quarter', 'Pending', 'Low', 4, '2025-12-12'),
('Code review', 'Review pull requests for the authentication module', 'Completed', 'Medium', 1, '2025-11-28');
