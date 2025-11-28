# Project Structure

```
employee-task-tracker/
│
├── frontend/                          # React Frontend Application
│   ├── src/
│   │   ├── components/               # Reusable React components
│   │   │   ├── EmployeeForm.jsx     # Form for adding employees
│   │   │   └── TaskForm.jsx         # Form for adding/editing tasks
│   │   │
│   │   ├── pages/                   # Page components
│   │   │   ├── Dashboard.jsx        # Dashboard with statistics
│   │   │   ├── Tasks.jsx            # Tasks management page
│   │   │   └── Employees.jsx        # Employees list page
│   │   │
│   │   ├── services/                # API integration
│   │   │   └── api.js               # Axios API calls
│   │   │
│   │   ├── App.jsx                  # Main app component with routing
│   │   ├── App.css                  # Application styles
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Global styles
│   │
│   ├── index.html                   # HTML template
│   ├── package.json                 # Frontend dependencies
│   ├── vite.config.js              # Vite configuration
│   ├── .env.example                # Environment variables template
│   └── .gitignore                  # Git ignore rules
│
├── backend/                         # Node.js/Express Backend API
│   ├── app/
│   │   ├── config/
│   │   │   └── database.js         # PostgreSQL connection pool
│   │   │
│   │   ├── models/                 # Data models
│   │   │   ├── Employee.js         # Employee model with CRUD operations
│   │   │   └── Task.js             # Task model with CRUD operations
│   │   │
│   │   ├── controllers/            # Request handlers
│   │   │   ├── employeeController.js
│   │   │   └── taskController.js
│   │   │
│   │   └── routes/                 # API routes
│   │       ├── employeeRoutes.js   # Employee endpoints
│   │       ├── taskRoutes.js       # Task endpoints
│   │       └── dashboardRoutes.js  # Dashboard endpoint
│   │
│   ├── server.js                   # Express server setup
│   ├── package.json                # Backend dependencies
│   ├── .env.example               # Environment variables template
│   └── .gitignore                 # Git ignore rules
│
├── database/                       # Database files
│   ├── schema.sql                 # Database schema with tables
│   └── sample_data.sql            # Sample data for testing
│
├── README.md                      # Main project documentation
├── SETUP_GUIDE.md                # Quick setup instructions
├── PROJECT_STRUCTURE.md          # This file
└── .gitignore                    # Root git ignore rules
```

## Technology Stack

### Frontend
- **React 18**: UI library
- **Vite**: Build tool and dev server
- **Axios**: HTTP client for API calls
- **CSS3**: Styling with responsive design

### Backend
- **Node.js**: Runtime environment
- **Express**: Web framework
- **pg**: PostgreSQL client
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Database
- **PostgreSQL**: Relational database
- Foreign key relationships between employees and tasks
- Indexes for optimized queries
- Triggers for automatic timestamp updates

## Key Features by Component

### Frontend Components

**Dashboard.jsx**
- Displays summary statistics
- Total tasks, completion rate
- Employee count

**Tasks.jsx**
- List all tasks with details
- Filter by status and employee
- Add, edit, delete tasks
- Visual status and priority badges

**Employees.jsx**
- Display all employees
- Add new employees
- Employee cards with details

**TaskForm.jsx**
- Create/edit task form
- Employee assignment dropdown
- Status and priority selection
- Due date picker

**EmployeeForm.jsx**
- Add employee form
- Name, email, department, position fields

### Backend API Endpoints

**Employee Routes** (`/api/employees`)
- GET / - List all employees
- GET /:id - Get employee by ID
- POST / - Create employee
- PUT /:id - Update employee
- DELETE /:id - Delete employee

**Task Routes** (`/api/tasks`)
- GET / - List all tasks (with filters)
- GET /:id - Get task by ID
- POST / - Create task
- PUT /:id - Update task
- DELETE /:id - Delete task

**Dashboard Routes** (`/api/dashboard`)
- GET / - Get dashboard statistics

### Database Schema

**employees table**
- id (Primary Key)
- name
- email (Unique)
- department
- position
- created_at

**tasks table**
- id (Primary Key)
- title
- description
- status (Pending/In Progress/Completed)
- priority (Low/Medium/High)
- employee_id (Foreign Key → employees.id)
- due_date
- created_at
- updated_at

## Data Flow

```
User Action (Frontend)
    ↓
React Component
    ↓
API Service (axios)
    ↓
HTTP Request
    ↓
Express Route
    ↓
Controller
    ↓
Model
    ↓
PostgreSQL Database
    ↓
Response back through the chain
```

## Environment Variables

### Backend (.env)
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=employee_task_tracker
DB_USER=postgres
DB_PASSWORD=your_password
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
```
