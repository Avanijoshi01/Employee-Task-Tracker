# Employee Task Tracker

A fullstack web application for managing employees and their tasks within a company, featuring JWT authentication, role-based access control, and interactive data visualization.

---

## 📋 Table of Contents
1. [Tech Stack & Architecture](#tech-stack--architecture)
2. [Setup & Run Instructions](#setup--run-instructions)
3. [API Endpoint Documentation](#api-endpoint-documentation)
4. [Screenshots](#screenshots)
5. [Assumptions & Limitations](#assumptions--limitations)

---

## 🏗️ Tech Stack & Architecture

### Tech Stack

**Frontend:**
- React 18 - UI library
- Vite - Build tool and dev server
- Axios - HTTP client for API calls
- Recharts - Data visualization library
- CSS3 - Custom styling with animations

**Backend:**
- Node.js - JavaScript runtime
- Express - Web application framework
- PostgreSQL - Relational database
- JWT - JSON Web Tokens for authentication
- bcrypt - Password hashing

**Database:**
- PostgreSQL with foreign key relationships
- Indexes for optimized queries
- Triggers for automatic timestamp updates

### Architecture Overview

```
┌─────────────────────────────────────────┐
│     Frontend (React + Vite)             │
│     Port: 5173                          │
│  - Dashboard, Tasks, Employees pages    │
│  - Authentication & Authorization       │
└─────────────────────────────────────────┘
                  ↕ HTTP/REST
┌─────────────────────────────────────────┐
│     Backend (Node.js + Express)         │
│     Port: 3000                          │
│  - RESTful API endpoints                │
│  - JWT middleware                       │
│  - Business logic                       │
└─────────────────────────────────────────┘
                  ↕ SQL
┌─────────────────────────────────────────┐
│     Database (PostgreSQL)               │
│     Port: 5432                          │
│  - employees, tasks, users tables       │
│  - Relationships & constraints          │
└─────────────────────────────────────────┘
```

**Key Features:**
- JWT-based authentication with role-based access control
- Interactive data visualization (Pie charts, Bar charts)
- Real-time search and filtering
- Responsive design for all devices
- Complete CRUD operations for tasks and employees

---

## 🚀 Setup & Run Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Database Setup

**Create Database:**
```bash
psql -U postgres
CREATE DATABASE employee_task_tracker;
\q
```

**Run Schema:**
```bash
psql -U postgres -d employee_task_tracker -f database/schema.sql
psql -U postgres -d employee_task_tracker -f database/auth_schema.sql
```

**Load Sample Data (Optional):**
```bash
psql -U postgres -d employee_task_tracker -f database/sample_data.sql
```

### 2. Backend Setup

**Navigate to backend directory:**
```bash
cd backend
```

**Install dependencies:**
```bash
npm install
```

**Configure environment:**

Create `.env` file with the following:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=employee_task_tracker
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your-secret-key
```

**Start server:**
```bash
npm start
```

Backend will run on `http://localhost:3000`

### 3. Frontend Setup

**Navigate to frontend directory (in new terminal):**
```bash
cd frontend
```

**Install dependencies:**
```bash
npm install
```

**Configure environment:**

Create `.env` file with the following:
```env
VITE_API_URL=http://localhost:3000
```

**Start development server:**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

### 4. Access Application

Open your browser and navigate to: `http://localhost:5173`

**Demo Accounts:**
- Admin: `admin` / `password123` (Full access)
- User: `john.doe` / `password123` (View own tasks only)

---

## 📡 API Endpoint Documentation

### Authentication

All endpoints except `/api/auth/login` require authentication via JWT token.

**Required Header:**
```
Authorization: Bearer <your-jwt-token>
```

### Authentication Endpoints

#### POST /api/auth/login
Login with username and password.

**Request Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin",
    "employee_id": null
  }
}
```

#### GET /api/auth/me
Get current user information.

**Response:**
```json
{
  "id": 1,
  "username": "admin",
  "role": "admin",
  "employee_id": null
}
```

### Employee Endpoints

#### GET /api/employees
Get all employees.

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@company.com",
    "department": "Engineering",
    "position": "Senior Developer"
  }
]
```

#### POST /api/employees (Admin only)
Create new employee.

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane.smith@company.com",
  "department": "Marketing",
  "position": "Manager"
}
```

#### PUT /api/employees/:id (Admin only)
Update employee.

#### DELETE /api/employees/:id (Admin only)
Delete employee.

### Task Endpoints

#### GET /api/tasks
Get all tasks (filtered by user role).

**Query Parameters:**
- `status` - Filter by status (Pending, In Progress, Completed)
- `employee_id` - Filter by employee ID
- `priority` - Filter by priority (Low, Medium, High)

**Example:** `/api/tasks?status=Pending&employee_id=1`

**Response:**
```json
[
  {
    "id": 1,
    "title": "Implement user authentication",
    "description": "Add JWT-based authentication",
    "status": "In Progress",
    "priority": "High",
    "employee_id": 1,
    "employee_name": "John Doe",
    "due_date": "2025-12-05",
    "created_at": "2025-11-28T10:00:00.000Z"
  }
]
```

#### POST /api/tasks (Admin only)
Create new task.

**Request Body:**
```json
{
  "title": "Fix login bug",
  "description": "Users cannot login with special characters",
  "status": "Pending",
  "priority": "High",
  "employee_id": 1,
  "due_date": "2025-12-01"
}
```

#### PUT /api/tasks/:id (Admin only)
Update task.

#### DELETE /api/tasks/:id (Admin only)
Delete task.

### Dashboard Endpoint

#### GET /api/dashboard
Get dashboard statistics (filtered by user role).

**Response:**
```json
{
  "totalTasks": 10,
  "completedTasks": 3,
  "pendingTasks": 4,
  "inProgressTasks": 3,
  "completionRate": 30.0,
  "totalEmployees": 5
}
```

### Testing with curl

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'
```

**Get Tasks (with token):**
```bash
curl http://localhost:3000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📸 Screenshots

### Login Page
![Login Page](screenshots/login.png)

*Gradient login page with demo account information*

### Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)

*Interactive dashboard with pie chart (task status), bar charts (priority distribution, tasks by employee), and smart insights*

### User Dashboard
![User Dashboard](screenshots/user-dashboard.png)

*Personalized dashboard showing only user's assigned tasks with filtered statistics*

### Tasks Management
![Tasks Page](screenshots/tasks.png)

*Task management with real-time search, status filters, employee filters, and CRUD operations (Admin only)*

### Employee Management
![Employees Page](screenshots/employees.png)

*Employee list with card-based layout and add employee functionality (Admin only)*

### Mobile Responsive
![Mobile View](screenshots/mobile.png)

*Fully responsive design that works on all devices*

> **Note:** Screenshots show the application with sample data loaded. Follow the setup instructions above to run the application locally.

---

## 📝 Assumptions & Limitations

### Assumptions

1. **Environment:**
   - Users have PostgreSQL installed or can install it
   - Node.js v16+ is available
   - Modern web browser (Chrome, Firefox, Safari, Edge)
   - Local development environment

2. **Data:**
   - Sample data represents realistic use cases
   - Employee emails are unique
   - Task assignments are valid (employee exists)

3. **Security:**
   - Development environment (not production-ready security)
   - JWT tokens stored in localStorage
   - Database credentials in .env file

### Limitations

1. **Task Management:**
   - Task priorities: Low, Medium, High (fixed options)
   - Task statuses: Pending, In Progress, Completed (fixed options)
   - No file attachments for tasks
   - No task comments or activity history
   - No task dependencies or subtasks
   - No time tracking functionality

2. **Authentication:**
   - Token expiration: 24 hours (configurable)
   - No password reset functionality
   - No email verification
   - No two-factor authentication

3. **Features:**
   - No email notifications
   - No real-time updates (WebSockets)
   - No export functionality (CSV, PDF)
   - No advanced search with date ranges
   - No task history or audit log

4. **Scalability:**
   - Client-side filtering (may be slow with large datasets)
   - No pagination implemented
   - No caching mechanism
   - Single database instance

### Design Decisions

1. **JWT in localStorage:**
   - Chosen for simplicity in development
   - Production should use httpOnly cookies

2. **Client-side filtering:**
   - Better performance for small to medium datasets
   - Reduces server load

3. **Separate frontend and backend:**
   - Allows independent scaling
   - Easier to maintain and deploy

4. **Sample data included:**
   - Enables quick testing and demonstration
   - Shows realistic use cases

5. **Role-based access:**
   - Admin: Full CRUD access
   - User: Read-only access to own tasks
   - Enforced on both frontend (UI) and backend (API)

---

## 📚 Additional Documentation

For more detailed information, see:
- **DOCUMENTATION.md** - Complete guide including API testing, authentication details, advanced features, and deployment instructions

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Avani Joshi**
- GitHub: [@Avanijoshi01](https://github.com/Avanijoshi01)
- Repository: [Employee-Task-Tracker](https://github.com/Avanijoshi01/Employee-Task-Tracker)

---

**Built for ProU Technology Fullstack Web Application Assignment - Track 3**
