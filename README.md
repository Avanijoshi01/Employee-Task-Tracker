# Employee Task Tracker

A fullstack web application for managing employees and their tasks within a company.

## Tech Stack

### Frontend
- React 18 with Vite
- Axios for API calls
- CSS3 for responsive design

### Backend
- Node.js with Express
- PostgreSQL database
- CORS enabled

### Database
- PostgreSQL with proper relationships
- Foreign keys (Employee ↔ Task)

## Architecture Overview

```
Frontend (React) → REST API (Express) → Database (PostgreSQL)
```

- Frontend runs on `http://localhost:5173`
- Backend API runs on `http://localhost:3000`
- PostgreSQL database on port `5432`

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Database Setup

1. Install PostgreSQL and create a database:
```sql
CREATE DATABASE employee_task_tracker;
```

2. Run the schema script:
```bash
psql -U postgres -d employee_task_tracker -f database/schema.sql
```

3. (Optional) Load sample data:
```bash
psql -U postgres -d employee_task_tracker -f database/sample_data.sql
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=employee_task_tracker
DB_USER=postgres
DB_PASSWORD=your_password
```

4. Start the server:
```bash
npm start
```

Backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## API Documentation

### Endpoints

#### Employees

- **GET /api/employees**
  - Description: Get all employees
  - Response: `[{ id, name, email, department, position }]`

- **GET /api/employees/:id**
  - Description: Get employee by ID
  - Response: `{ id, name, email, department, position }`

- **POST /api/employees**
  - Description: Create new employee
  - Body: `{ name, email, department, position }`
  - Response: `{ id, name, email, department, position }`

#### Tasks

- **GET /api/tasks**
  - Description: Get all tasks (with optional filters)
  - Query params: `?status=pending&employee_id=1`
  - Response: `[{ id, title, description, status, priority, employee_id, employee_name, due_date, created_at }]`

- **GET /api/tasks/:id**
  - Description: Get task by ID
  - Response: `{ id, title, description, status, priority, employee_id, due_date, created_at }`

- **POST /api/tasks**
  - Description: Create new task
  - Body: `{ title, description, status, priority, employee_id, due_date }`
  - Response: `{ id, title, description, status, priority, employee_id, due_date, created_at }`

- **PUT /api/tasks/:id**
  - Description: Update task
  - Body: `{ title, description, status, priority, employee_id, due_date }`
  - Response: `{ id, title, description, status, priority, employee_id, due_date, updated_at }`

- **DELETE /api/tasks/:id**
  - Description: Delete task
  - Response: `{ message: "Task deleted successfully" }`

#### Dashboard

- **GET /api/dashboard**
  - Description: Get dashboard summary
  - Response: `{ totalTasks, completedTasks, pendingTasks, inProgressTasks, completionRate, totalEmployees }`

## Features

- View all employees and their information
- View all tasks with employee assignments
- Filter tasks by status (Pending, In Progress, Completed)
- Filter tasks by employee
- Add new tasks and assign to employees
- Update task status and details
- Delete tasks
- Dashboard with summary statistics
- Responsive design for mobile and desktop

## Assumptions & Limitations

- Single-user system (no authentication in base version)
- All users have full access to all features
- Task priorities: Low, Medium, High
- Task statuses: Pending, In Progress, Completed
- Simple validation on both frontend and backend
- No file attachments for tasks
- No task comments or history tracking

## Future Enhancements

- User authentication and authorization
- Role-based access control (Admin vs Regular User)
- Task comments and activity log
- File attachments
- Email notifications
- Advanced filtering and search
- Task dependencies
- Time tracking

## Screenshots

(Add screenshots here after running the application)

## License

MIT


## 🔐 Authentication & Authorization (Bonus Feature)

**IMPLEMENTED!** The application now includes JWT-based authentication with role-based access control.

### Features
- ✅ Secure login with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ Two user roles: Admin and User
- ✅ Protected API endpoints
- ✅ Role-based UI rendering

### Demo Accounts

**Admin Account (Full Access):**
- Username: `admin`
- Password: `password123`
- Can: Create/update/delete tasks and employees, view all data

**User Accounts (Limited Access):**
- Username: `john.doe` / Password: `password123` (Employee: John Doe)
- Username: `jane.smith` / Password: `password123` (Employee: Jane Smith)
- Can: View only their assigned tasks

### Documentation
See [AUTHENTICATION.md](AUTHENTICATION.md) for complete authentication documentation including:
- API endpoints
- Testing guide
- Security features
- User management

### Quick Test
1. Open http://localhost:5173
2. Login with `admin` / `password123` to see full admin features
3. Logout and login with `john.doe` / `password123` to see user restrictions


## 🎨 Advanced UI Features & Data Visualization

**BONUS POINTS FEATURES IMPLEMENTED!**

### Interactive Data Visualization
- ✅ **Pie Chart** - Task status distribution with percentages
- ✅ **Bar Charts** - Priority distribution and tasks by employee
- ✅ **Animated Charts** - Smooth transitions and hover effects
- ✅ **Responsive Charts** - Works on all screen sizes

### Enhanced User Experience
- ✅ **Gradient Design System** - Modern, professional appearance
- ✅ **Smooth Animations** - Fade-in, slide-in, and hover effects
- ✅ **Real-time Search** - Instant task filtering
- ✅ **Smart Insights** - Automated analysis (most productive employee, tasks due soon)
- ✅ **Progress Indicators** - Visual completion rate bars
- ✅ **Loading States** - Animated loading indicators
- ✅ **Empty States** - Helpful messages when no data

### Creative UX Decisions
- ✅ **Role-Based UI** - Different views for admin vs users
- ✅ **Color Psychology** - Meaningful color coding (green=success, red=urgent)
- ✅ **Interactive Elements** - Ripple effects, hover elevations
- ✅ **Notification System** - Success/error feedback
- ✅ **Responsive Design** - Mobile-first approach

### Data Insights
- 📊 Task status distribution visualization
- 📈 Priority level analysis
- 👤 Employee productivity comparison
- 🏆 Most productive employee identification
- ⚡ Average tasks per employee
- 📅 Upcoming deadlines tracking

### Documentation
See [ADVANCED_FEATURES.md](ADVANCED_FEATURES.md) for complete documentation of all advanced features including:
- Detailed feature descriptions
- Design principles applied
- Technical implementation
- UX innovations
- Visual showcase

### Technologies Used
- **Recharts** - Professional charting library
- **CSS3 Animations** - Smooth transitions and effects
- **Gradient Design** - Modern visual aesthetics
- **React Hooks** - Efficient state management
