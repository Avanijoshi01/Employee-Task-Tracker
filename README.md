# Employee Task Tracker

A fullstack web application for managing employees and their tasks within a company, featuring JWT authentication, role-based access control, and interactive data visualization.

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/Avanijoshi01/Employee-Task-Tracker.git
cd Employee-Task-Tracker

# 2. Setup Database
psql -U postgres -c "CREATE DATABASE employee_task_tracker;"
psql -U postgres -d employee_task_tracker -f database/schema.sql
psql -U postgres -d employee_task_tracker -f database/sample_data.sql

# 3. Setup Backend
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm start

# 4. Setup Frontend (in new terminal)
cd frontend
npm install
cp .env.example .env
npm run dev

# 5. Open http://localhost:5173
# Login: admin / password123
```

## ✨ Key Features

- 🔐 **JWT Authentication** - Secure login with role-based access
- 👥 **User Roles** - Admin (full access) and User (view own tasks)
- 📊 **Data Visualization** - Interactive charts (Pie, Bar) with Recharts
- 🎨 **Modern UI** - Gradient design, smooth animations, responsive layout
- 🔍 **Real-time Search** - Instant task filtering
- 📈 **Smart Insights** - Automated productivity analysis
- 📱 **Responsive Design** - Works on all devices
- ✅ **Complete CRUD** - Full task and employee management

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

### Authentication

All endpoints except `/api/auth/login` and `/api/auth/register` require authentication.

**Headers Required:**
```
Authorization: Bearer <your-jwt-token>
```

### Endpoints

#### Authentication

- **POST /api/auth/login**
  - Description: Login with username and password
  - Body: `{ username, password }`
  - Response: `{ token, user: { id, username, role, employee_id } }`

- **POST /api/auth/register**
  - Description: Register new user (admin only in production)
  - Body: `{ username, password, role, employee_id }`
  - Response: `{ message, user: { id, username, role, employee_id } }`

- **GET /api/auth/me**
  - Description: Get current user information
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ id, username, role, employee_id }`

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

### Assumptions
- Users have PostgreSQL installed or can install it
- Node.js v16+ is available
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local development environment
- Sample data represents realistic use cases

### Current Limitations
- Task priorities: Low, Medium, High (fixed options)
- Task statuses: Pending, In Progress, Completed (fixed options)
- No file attachments for tasks
- No task comments or activity history
- No email notifications
- No task dependencies or subtasks
- No time tracking functionality
- Token expiration set to 24 hours (configurable)

### Design Decisions
- JWT stored in localStorage (consider httpOnly cookies for production)
- Client-side filtering for better performance
- Sample data included for quick testing
- Environment variables for configuration
- Separate frontend and backend for scalability

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

### Login Page
![Login Page](screenshots/login.png)
*Beautiful gradient login page with demo account information*

### Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)
*Interactive dashboard with charts, statistics, and smart insights*

### User Dashboard
![User Dashboard](screenshots/user-dashboard.png)
*Personalized dashboard showing only user's assigned tasks*

### Tasks Management
![Tasks Page](screenshots/tasks.png)
*Task management with real-time search, filters, and CRUD operations*

### Employee Management
![Employees Page](screenshots/employees.png)
*Employee list with card-based layout*

### Mobile Responsive
![Mobile View](screenshots/mobile.png)
*Fully responsive design works on all devices*

> **Note:** To view the application live, follow the setup instructions above. Screenshots show the application with sample data loaded.

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
