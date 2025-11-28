# Quick Setup Guide

## Step-by-Step Installation

### 1. Database Setup

First, ensure PostgreSQL is installed and running on your system.

Create the database:
```bash
psql -U postgres
CREATE DATABASE employee_task_tracker;
\q
```

Run the schema:
```bash
psql -U postgres -d employee_task_tracker -f database/schema.sql
```

(Optional) Load sample data:
```bash
psql -U postgres -d employee_task_tracker -f database/sample_data.sql
```

### 2. Backend Setup

Navigate to backend folder:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create `.env` file (copy from .env.example):
```bash
copy .env.example .env
```

Edit `.env` and update your database credentials:
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=employee_task_tracker
DB_USER=postgres
DB_PASSWORD=your_actual_password
```

Start the backend server:
```bash
npm start
```

The API will be available at `http://localhost:3000`

### 3. Frontend Setup

Open a new terminal and navigate to frontend folder:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Create `.env` file:
```bash
copy .env.example .env
```

The default configuration should work:
```
VITE_API_URL=http://localhost:3000
```

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Test the Application

Open your browser and go to `http://localhost:5173`

You should see:
- Dashboard with statistics
- Tasks page with filtering options
- Employees page with employee list

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check your database credentials in backend/.env
- Ensure the database exists: `psql -U postgres -l`

### Port Already in Use
- Backend: Change PORT in backend/.env
- Frontend: Change port in frontend/vite.config.js

### CORS Issues
- Ensure backend is running on port 3000
- Check VITE_API_URL in frontend/.env matches backend URL

## API Testing

You can test the API endpoints using curl or Postman:

```bash
# Health check
curl http://localhost:3000/api/health

# Get all employees
curl http://localhost:3000/api/employees

# Get all tasks
curl http://localhost:3000/api/tasks

# Get dashboard stats
curl http://localhost:3000/api/dashboard
```

## Next Steps

- Add more employees and tasks
- Test filtering functionality
- Explore the dashboard statistics
- Try updating task statuses
- Experiment with different priorities
