# API Testing Guide

This document provides examples for testing all API endpoints using curl, Postman, or any HTTP client.

## Base URL
```
http://localhost:3000/api
```

## Employee Endpoints

### 1. Get All Employees
```bash
curl http://localhost:3000/api/employees
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@company.com",
    "department": "Engineering",
    "position": "Senior Developer",
    "created_at": "2025-11-28T10:00:00.000Z"
  }
]
```

### 2. Get Employee by ID
```bash
curl http://localhost:3000/api/employees/1
```

### 3. Create New Employee
```bash
curl -X POST http://localhost:3000/api/employees \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Alice Johnson\",\"email\":\"alice@company.com\",\"department\":\"Marketing\",\"position\":\"Manager\"}"
```

**Request Body:**
```json
{
  "name": "Alice Johnson",
  "email": "alice@company.com",
  "department": "Marketing",
  "position": "Manager"
}
```

### 4. Update Employee
```bash
curl -X PUT http://localhost:3000/api/employees/1 \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"John Doe\",\"email\":\"john.doe@company.com\",\"department\":\"Engineering\",\"position\":\"Lead Developer\"}"
```

### 5. Delete Employee
```bash
curl -X DELETE http://localhost:3000/api/employees/1
```

## Task Endpoints

### 1. Get All Tasks
```bash
curl http://localhost:3000/api/tasks
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Implement user authentication",
    "description": "Add JWT-based authentication to the API",
    "status": "In Progress",
    "priority": "High",
    "employee_id": 1,
    "employee_name": "John Doe",
    "due_date": "2025-12-05",
    "created_at": "2025-11-28T10:00:00.000Z",
    "updated_at": "2025-11-28T10:00:00.000Z"
  }
]
```

### 2. Get Tasks with Filters

**Filter by Status:**
```bash
curl "http://localhost:3000/api/tasks?status=Pending"
```

**Filter by Employee:**
```bash
curl "http://localhost:3000/api/tasks?employee_id=1"
```

**Multiple Filters:**
```bash
curl "http://localhost:3000/api/tasks?status=In%20Progress&employee_id=1"
```

### 3. Get Task by ID
```bash
curl http://localhost:3000/api/tasks/1
```

### 4. Create New Task
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Fix login bug\",\"description\":\"Users cannot login with special characters\",\"status\":\"Pending\",\"priority\":\"High\",\"employee_id\":2,\"due_date\":\"2025-12-01\"}"
```

**Request Body:**
```json
{
  "title": "Fix login bug",
  "description": "Users cannot login with special characters",
  "status": "Pending",
  "priority": "High",
  "employee_id": 2,
  "due_date": "2025-12-01"
}
```

**Valid Values:**
- status: "Pending", "In Progress", "Completed"
- priority: "Low", "Medium", "High"
- employee_id: Integer (must exist in employees table) or null
- due_date: Date string in format "YYYY-MM-DD" or null

### 5. Update Task
```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Implement user authentication\",\"description\":\"Add JWT-based authentication\",\"status\":\"Completed\",\"priority\":\"High\",\"employee_id\":1,\"due_date\":\"2025-12-05\"}"
```

### 6. Delete Task
```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

## Dashboard Endpoint

### Get Dashboard Statistics
```bash
curl http://localhost:3000/api/dashboard
```

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

## Health Check

### Check API Status
```bash
curl http://localhost:3000/api/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Employee Task Tracker API is running"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Name and email are required"
}
```

### 404 Not Found
```json
{
  "error": "Employee not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to fetch employees"
}
```

## Postman Collection

You can import these endpoints into Postman by creating a new collection with the following structure:

1. **Employee Task Tracker API**
   - Employees
     - Get All Employees (GET)
     - Get Employee by ID (GET)
     - Create Employee (POST)
     - Update Employee (PUT)
     - Delete Employee (DELETE)
   - Tasks
     - Get All Tasks (GET)
     - Get Task by ID (GET)
     - Create Task (POST)
     - Update Task (PUT)
     - Delete Task (DELETE)
   - Dashboard
     - Get Dashboard Stats (GET)
   - Health
     - Health Check (GET)

## Testing Workflow

1. **Setup**: Ensure backend is running and database is populated
2. **Create Employees**: Add a few employees first
3. **Create Tasks**: Add tasks and assign them to employees
4. **Test Filters**: Try filtering tasks by status and employee
5. **Update Tasks**: Change task status from Pending → In Progress → Completed
6. **Check Dashboard**: Verify statistics update correctly
7. **Delete Operations**: Test deleting tasks and employees

## Common Test Scenarios

### Scenario 1: Complete Task Workflow
```bash
# 1. Create employee
curl -X POST http://localhost:3000/api/employees \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@company.com\",\"department\":\"QA\",\"position\":\"Tester\"}"

# 2. Create task (use employee_id from response)
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Test Task\",\"description\":\"Testing workflow\",\"status\":\"Pending\",\"priority\":\"Medium\",\"employee_id\":1}"

# 3. Update task status
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Test Task\",\"description\":\"Testing workflow\",\"status\":\"Completed\",\"priority\":\"Medium\",\"employee_id\":1}"

# 4. Check dashboard
curl http://localhost:3000/api/dashboard
```

### Scenario 2: Filter Testing
```bash
# Get all pending tasks
curl "http://localhost:3000/api/tasks?status=Pending"

# Get all high priority tasks for employee 1
curl "http://localhost:3000/api/tasks?employee_id=1&priority=High"
```

### Scenario 3: Validation Testing
```bash
# Try to create employee without email (should fail)
curl -X POST http://localhost:3000/api/employees \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\"}"

# Try to create task without title (should fail)
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d "{\"description\":\"No title\"}"
```
