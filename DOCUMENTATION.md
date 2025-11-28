# Employee Task Tracker - Complete Documentation

## Table of Contents
1. [API Testing Guide](#api-testing-guide)
2. [Authentication Guide](#authentication-guide)
3. [Advanced Features](#advanced-features)
4. [Deployment Guide](#deployment-guide)

---

## API Testing Guide

### Testing with curl

#### 1. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'
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

#### 2. Get All Tasks (with token)
```bash
TOKEN="your-token-here"
curl http://localhost:3000/api/tasks \
  -H "Authorization: Bearer $TOKEN"
```

#### 3. Create Task
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Task",
    "description": "Task description",
    "status": "Pending",
    "priority": "High",
    "employee_id": 1,
    "due_date": "2025-12-31"
  }'
```

#### 4. Update Task
```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Task",
    "status": "Completed",
    "priority": "High",
    "employee_id": 1
  }'
```

#### 5. Delete Task
```bash
curl -X DELETE http://localhost:3000/api/tasks/1 \
  -H "Authorization: Bearer $TOKEN"
```

#### 6. Get Dashboard Stats
```bash
curl http://localhost:3000/api/dashboard \
  -H "Authorization: Bearer $TOKEN"
```

### Testing with Postman

1. **Import Collection:**
   - Create new collection "Employee Task Tracker"
   - Add environment variable `baseUrl` = `http://localhost:3000`
   - Add environment variable `token` (will be set after login)

2. **Login Request:**
   - Method: POST
   - URL: `{{baseUrl}}/api/auth/login`
   - Body (JSON):
     ```json
     {
       "username": "admin",
       "password": "password123"
     }
     ```
   - Test Script:
     ```javascript
     pm.environment.set("token", pm.response.json().token);
     ```

3. **Authenticated Requests:**
   - Add to Headers:
     - Key: `Authorization`
     - Value: `Bearer {{token}}`

### Common Test Scenarios

**Scenario 1: Admin Workflow**
```bash
# 1. Login as admin
# 2. Get all employees
curl http://localhost:3000/api/employees -H "Authorization: Bearer $TOKEN"

# 3. Create new task
curl -X POST http://localhost:3000/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","status":"Pending","priority":"Medium","employee_id":1}'

# 4. Update task status
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","status":"Completed","priority":"Medium","employee_id":1}'

# 5. Check dashboard
curl http://localhost:3000/api/dashboard -H "Authorization: Bearer $TOKEN"
```

**Scenario 2: User Workflow**
```bash
# 1. Login as user
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john.doe","password":"password123"}'

# 2. Get only user's tasks (automatically filtered)
curl http://localhost:3000/api/tasks -H "Authorization: Bearer $TOKEN"

# 3. Try to create task (should fail - admin only)
curl -X POST http://localhost:3000/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","status":"Pending","priority":"Medium"}'
```

---

## Authentication Guide

### Overview

The application uses JWT (JSON Web Tokens) for authentication with role-based access control.

### User Roles

**Admin:**
- Full CRUD access to tasks and employees
- Can view all tasks from all employees
- Can create, update, and delete any resource
- Access to employee management

**User:**
- Read-only access
- Can only view their assigned tasks
- Cannot create, update, or delete anything
- No access to employee management

### Demo Accounts

| Username | Password | Role | Employee | Access |
|----------|----------|------|----------|--------|
| admin | password123 | admin | - | Full access |
| john.doe | password123 | user | John Doe | Own tasks only |
| jane.smith | password123 | user | Jane Smith | Own tasks only |
| mike.johnson | password123 | user | Mike Johnson | Own tasks only |

### Authentication Flow

1. **Login:**
   - User submits username and password
   - Backend validates credentials
   - Backend generates JWT token (24h expiration)
   - Token returned to frontend
   - Frontend stores token in localStorage

2. **Authenticated Requests:**
   - Frontend includes token in Authorization header
   - Backend middleware verifies token
   - Backend checks user role for authorization
   - Request processed or rejected

3. **Logout:**
   - Frontend removes token from localStorage
   - User redirected to login page

### Security Features

- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ JWT tokens with expiration
- ✅ Protected API endpoints
- ✅ Role-based authorization middleware
- ✅ SQL injection prevention (parameterized queries)
- ✅ CORS configuration
- ✅ Environment variables for secrets

### Creating New Users

**Via Script:**
```bash
cd backend
node scripts/createUsers.js
```

**Via API (Admin only):**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "new.user",
    "password": "password123",
    "role": "user",
    "employee_id": 4
  }'
```

### Token Management

**Token Structure:**
```json
{
  "id": 1,
  "username": "admin",
  "role": "admin",
  "employee_id": null,
  "iat": 1234567890,
  "exp": 1234654290
}
```

**Token Expiration:**
- Default: 24 hours
- Configurable in backend via JWT_EXPIRES_IN
- Automatic logout on expiration

---

## Advanced Features

### Data Visualization

#### 1. Pie Chart - Task Status Distribution
**Purpose:** Visual representation of task completion progress

**Features:**
- Color-coded segments (Green: Completed, Orange: In Progress, Red: Pending)
- Interactive tooltips showing percentages
- Smooth animations on load
- Responsive sizing

**Implementation:**
```javascript
import { PieChart, Pie, Cell, Tooltip } from 'recharts'

const statusData = [
  { name: 'Completed', value: completedTasks, color: '#27ae60' },
  { name: 'In Progress', value: inProgressTasks, color: '#f39c12' },
  { name: 'Pending', value: pendingTasks, color: '#e74c3c' }
]
```

#### 2. Bar Chart - Priority Distribution
**Purpose:** Shows distribution of tasks by priority level

**Features:**
- Color-coded bars (Red: High, Orange: Medium, Green: Low)
- Hover effects
- Clear axis labels
- Responsive layout

#### 3. Bar Chart - Tasks by Employee
**Purpose:** Compares total tasks vs completed tasks per employee

**Features:**
- Dual-bar visualization
- Employee productivity comparison
- Workload distribution analysis
- Interactive tooltips

### Smart Insights

**Most Productive Employee:**
- Automatically calculates employee with most completed tasks
- Updates in real-time

**Average Tasks per Employee:**
- Total tasks / Total employees
- Helps with workload balancing

**High Priority Tasks:**
- Count of tasks marked as "High" priority
- Helps identify urgent work

**Tasks Due Soon:**
- Tasks due within 7 days
- Excludes completed tasks
- Helps with deadline management

### UI/UX Enhancements

**Gradient Design System:**
- Unique gradient backgrounds for each stat card
- Modern, professional appearance
- Consistent color scheme

**Smooth Animations:**
- Fade-in effects on page load
- Slide-in animations for cards
- Hover elevations
- Ripple effects on buttons
- Staggered animation delays

**Real-time Search:**
- Instant filtering as you type
- Searches title and description
- Combines with status filters
- Empty state handling

**Color Psychology:**
- Green: Success, completion
- Orange: Warning, in progress
- Red: Urgent, pending
- Blue: Information, primary actions

**Responsive Design:**
- Mobile-first approach
- Breakpoints: 768px (tablet), 1024px (desktop)
- Touch-friendly controls
- Adaptive layouts

---

## Deployment Guide

### Option 1: Traditional VPS (DigitalOcean, AWS EC2)

#### Prerequisites
- Ubuntu 20.04+ server
- Domain name (optional)
- SSH access

#### Steps

**1. Server Setup:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Install Nginx
sudo apt install nginx -y

# Install PM2
sudo npm install -g pm2
```

**2. Database Setup:**
```bash
sudo -u postgres psql
CREATE DATABASE employee_task_tracker;
CREATE USER tasktracker WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE employee_task_tracker TO tasktracker;
\q

# Run migrations
psql -U tasktracker -d employee_task_tracker -f database/schema.sql
psql -U tasktracker -d employee_task_tracker -f database/auth_schema.sql
```

**3. Backend Deployment:**
```bash
# Clone repository
git clone https://github.com/Avanijoshi01/Employee-Task-Tracker.git
cd Employee-Task-Tracker/backend

# Install dependencies
npm install --production

# Create .env
cat > .env << EOF
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=employee_task_tracker
DB_USER=tasktracker
DB_PASSWORD=secure_password
JWT_SECRET=your-production-secret-key
NODE_ENV=production
EOF

# Start with PM2
pm2 start server.js --name employee-task-tracker-api
pm2 save
pm2 startup
```

**4. Frontend Deployment:**
```bash
cd ../frontend
npm install
npm run build

# Copy to nginx
sudo cp -r dist/* /var/www/html/
```

**5. Nginx Configuration:**
```bash
sudo nano /etc/nginx/sites-available/employee-task-tracker
```

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        root /var/www/html;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/employee-task-tracker /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**6. SSL Certificate (Optional):**
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
```

### Option 2: Heroku Deployment

**Backend:**
```bash
cd backend
heroku create your-app-name-api
heroku addons:create heroku-postgresql:mini
git push heroku main
heroku pg:psql < ../database/schema.sql
```

**Frontend:**
```bash
cd frontend
# Deploy to Vercel or Netlify
vercel --prod
# Set VITE_API_URL to your Heroku backend URL
```

### Option 3: Docker Deployment

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  database:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: employee_task_tracker
      POSTGRES_USER: tasktracker
      POSTGRES_PASSWORD: secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database:/docker-entrypoint-initdb.d
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    environment:
      PORT: 3000
      DB_HOST: database
      DB_PORT: 5432
      DB_NAME: employee_task_tracker
      DB_USER: tasktracker
      DB_PASSWORD: secure_password
      JWT_SECRET: your-secret-key
    ports:
      - "3000:3000"
    depends_on:
      - database

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

**Deploy:**
```bash
docker-compose up -d
```

### Environment Variables for Production

**Backend (.env):**
```env
PORT=3000
DB_HOST=your_db_host
DB_PORT=5432
DB_NAME=employee_task_tracker
DB_USER=your_db_user
DB_PASSWORD=your_secure_password
JWT_SECRET=your-super-secret-production-key
NODE_ENV=production
```

**Frontend (.env):**
```env
VITE_API_URL=https://api.yourdomain.com
```

### Security Checklist

- [ ] Use HTTPS (SSL certificate)
- [ ] Set strong database passwords
- [ ] Change JWT_SECRET to random string
- [ ] Enable firewall
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Enable CORS only for your domain
- [ ] Set up database backups
- [ ] Monitor application logs
- [ ] Implement rate limiting

### Monitoring

**PM2 Commands:**
```bash
pm2 status                    # View status
pm2 logs                      # View logs
pm2 restart all              # Restart all
pm2 stop all                 # Stop all
```

**Database Backup:**
```bash
pg_dump -U tasktracker employee_task_tracker > backup.sql
```

---

## Troubleshooting

### Common Issues

**Database Connection Failed:**
- Check PostgreSQL is running: `sudo systemctl status postgresql`
- Verify credentials in .env
- Ensure database exists: `psql -U postgres -l`

**Port Already in Use:**
- Backend: Change PORT in .env
- Frontend: Change port in vite.config.js

**CORS Errors:**
- Ensure backend is running
- Check VITE_API_URL in frontend .env
- Verify CORS is enabled in backend

**Authentication Errors:**
- Check JWT_SECRET is set
- Verify token is being sent in headers
- Check token hasn't expired

**Charts Not Displaying:**
- Ensure recharts is installed: `npm install recharts`
- Check browser console for errors
- Verify data is being fetched correctly

---

## Performance Optimization

### Backend
- Database connection pooling (implemented)
- Indexes on frequently queried columns (implemented)
- Efficient SQL queries with JOINs
- Caching for frequently accessed data (future)

### Frontend
- Code splitting with React.lazy (future)
- Image optimization
- Minification (done by Vite)
- CDN for static assets (production)

### Database
- Regular VACUUM and ANALYZE
- Monitor slow queries
- Add indexes as needed
- Connection pooling

---

## Support & Resources

- **Repository:** https://github.com/Avanijoshi01/Employee-Task-Tracker
- **Issues:** Report bugs via GitHub Issues
- **Documentation:** This file and README.md

---

**Last Updated:** November 2025
