# Quick Reference Card

## 🚀 Quick Start Commands

### Database Setup
```bash
# Create database
psql -U postgres -c "CREATE DATABASE employee_task_tracker;"

# Run schema
psql -U postgres -d employee_task_tracker -f database/schema.sql

# Load sample data
psql -U postgres -d employee_task_tracker -f database/sample_data.sql
```

### Backend
```bash
cd backend
npm install
copy .env.example .env
# Edit .env with your database credentials
npm start
```

### Frontend
```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

## 🌐 URLs

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Health Check: http://localhost:3000/api/health

## 📡 API Endpoints Quick Reference

### Employees
```
GET    /api/employees       - List all
GET    /api/employees/:id   - Get one
POST   /api/employees       - Create
PUT    /api/employees/:id   - Update
DELETE /api/employees/:id   - Delete
```

### Tasks
```
GET    /api/tasks           - List all (supports ?status=&employee_id=)
GET    /api/tasks/:id       - Get one
POST   /api/tasks           - Create
PUT    /api/tasks/:id       - Update
DELETE /api/tasks/:id       - Delete
```

### Dashboard
```
GET    /api/dashboard       - Get statistics
```

## 📊 Valid Values

### Task Status
- Pending
- In Progress
- Completed

### Task Priority
- Low
- Medium
- High

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=employee_task_tracker
DB_USER=postgres
DB_PASSWORD=your_password
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
```

## 🧪 Quick Test Commands

```bash
# Health check
curl http://localhost:3000/api/health

# Get employees
curl http://localhost:3000/api/employees

# Get tasks
curl http://localhost:3000/api/tasks

# Get dashboard
curl http://localhost:3000/api/dashboard

# Create employee
curl -X POST http://localhost:3000/api/employees \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@company.com","department":"IT","position":"Developer"}'

# Create task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","description":"Testing","status":"Pending","priority":"Medium","employee_id":1}'
```

## 🐛 Troubleshooting

### Database Connection Failed
- Check PostgreSQL is running: `psql -U postgres -l`
- Verify credentials in backend/.env
- Ensure database exists

### Port Already in Use
- Backend: Change PORT in backend/.env
- Frontend: Change port in frontend/vite.config.js

### CORS Errors
- Ensure backend is running
- Check VITE_API_URL in frontend/.env
- Verify CORS is enabled in backend/server.js

### Module Not Found
- Run `npm install` in both frontend and backend directories
- Delete node_modules and package-lock.json, then reinstall

## 📁 Project Structure

```
employee-task-tracker/
├── frontend/          # React app (port 5173)
├── backend/           # Express API (port 3000)
├── database/          # SQL files
└── *.md              # Documentation
```

## 🎯 Key Features

✅ Dashboard with statistics
✅ Employee management
✅ Task management with CRUD
✅ Task filtering (status, employee)
✅ Task priorities and statuses
✅ Responsive design
✅ RESTful API
✅ PostgreSQL database

## 📚 Documentation Files

- README.md - Main documentation
- SETUP_GUIDE.md - Detailed setup
- PROJECT_STRUCTURE.md - Architecture
- API_TESTING.md - API examples
- CHECKLIST.md - Completion checklist
- SCREENSHOTS.md - Screenshot guide
- QUICK_REFERENCE.md - This file

## 🔗 Tech Stack

**Frontend:** React + Vite + Axios
**Backend:** Node.js + Express + pg
**Database:** PostgreSQL

## 💡 Tips

- Always start backend before frontend
- Use sample data for quick testing
- Check browser console for frontend errors
- Check terminal for backend errors
- Use Postman for API testing
- Test responsive design with browser dev tools

## 📞 Common Issues & Solutions

**Issue:** Cannot connect to database
**Solution:** Check PostgreSQL service is running

**Issue:** Frontend shows network error
**Solution:** Ensure backend is running on port 3000

**Issue:** Tasks not showing assigned employee
**Solution:** Ensure employee_id exists in employees table

**Issue:** npm install fails
**Solution:** Update Node.js to v16 or higher

**Issue:** Port 5173 already in use
**Solution:** Kill the process or change port in vite.config.js
