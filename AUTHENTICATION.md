# Authentication & Authorization Guide

This document describes the authentication and role-based access control (RBAC) implementation in the Employee Task Tracker.

## Overview

The application now includes JWT-based authentication with two user roles:
- **Admin**: Full access to all features
- **User**: Limited access to view their own tasks only

## Features

### Authentication
- ✅ JWT (JSON Web Token) based authentication
- ✅ Secure password hashing with bcrypt
- ✅ Token stored in localStorage
- ✅ Automatic token inclusion in API requests
- ✅ Token expiration (24 hours)
- ✅ Automatic logout on token expiration

### Authorization (Role-Based Access Control)
- ✅ Admin role with full permissions
- ✅ User role with restricted permissions
- ✅ Protected API endpoints
- ✅ UI elements hidden based on role

## User Roles & Permissions

### Admin Role
**Can:**
- View all tasks from all employees
- Create new tasks
- Update any task
- Delete any task
- View all employees
- Create new employees
- Update employees
- Delete employees
- View complete dashboard statistics
- Filter tasks by any employee

**Cannot:**
- Nothing restricted for admin

### User Role
**Can:**
- View only their assigned tasks
- View dashboard statistics for their tasks
- View task details

**Cannot:**
- Create, update, or delete tasks
- View other employees' tasks
- Access employee management
- Filter by other employees

## Demo Accounts

### Admin Account
- **Username:** `admin`
- **Password:** `password123`
- **Access:** Full system access

### User Accounts
1. **John Doe**
   - **Username:** `john.doe`
   - **Password:** `password123`
   - **Employee ID:** 1
   - **Access:** Only tasks assigned to John Doe

2. **Jane Smith**
   - **Username:** `jane.smith`
   - **Password:** `password123`
   - **Employee ID:** 2
   - **Access:** Only tasks assigned to Jane Smith

3. **Mike Johnson**
   - **Username:** `mike.johnson`
   - **Password:** `password123`
   - **Employee ID:** 3
   - **Access:** Only tasks assigned to Mike Johnson

## API Endpoints

### Authentication Endpoints

#### POST /api/auth/login
Login with username and password.

**Request:**
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

#### POST /api/auth/register
Register a new user (admin only in production).

**Request:**
```json
{
  "username": "new.user",
  "password": "securepassword",
  "role": "user",
  "employee_id": 4
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": 5,
    "username": "new.user",
    "role": "user",
    "employee_id": 4
  }
}
```

#### GET /api/auth/me
Get current user information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": 1,
  "username": "admin",
  "role": "admin",
  "employee_id": null
}
```

### Protected Endpoints

All existing endpoints now require authentication:

**Headers Required:**
```
Authorization: Bearer <token>
```

**Admin-Only Endpoints:**
- POST /api/employees
- PUT /api/employees/:id
- DELETE /api/employees/:id
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

**All Users (with filtering):**
- GET /api/employees
- GET /api/tasks (filtered by employee_id for regular users)
- GET /api/dashboard (filtered statistics for regular users)

## Testing Authentication

### Using curl

**1. Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'
```

**2. Use Token:**
```bash
# Save token from login response
TOKEN="your-token-here"

# Make authenticated request
curl http://localhost:3000/api/tasks \
  -H "Authorization: Bearer $TOKEN"
```

### Using Postman

1. **Login:**
   - Method: POST
   - URL: http://localhost:3000/api/auth/login
   - Body (JSON):
     ```json
     {
       "username": "admin",
       "password": "password123"
     }
     ```
   - Copy the token from response

2. **Use Token:**
   - Add to Headers:
     - Key: `Authorization`
     - Value: `Bearer <your-token>`
   - Or use Postman's Authorization tab:
     - Type: Bearer Token
     - Token: `<your-token>`

## Frontend Implementation

### Login Flow

1. User enters username and password
2. Frontend sends POST request to `/api/auth/login`
3. Backend validates credentials
4. Backend returns JWT token and user info
5. Frontend stores token in localStorage
6. Frontend includes token in all subsequent requests

### Logout Flow

1. User clicks logout button
2. Frontend removes token from localStorage
3. Frontend redirects to login page

### Protected Routes

The frontend automatically:
- Redirects to login if no token
- Includes token in all API requests
- Handles 401 errors (expired token)
- Shows/hides UI elements based on role

## Security Features

### Backend Security
- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ JWT tokens with expiration
- ✅ Middleware for authentication
- ✅ Middleware for authorization
- ✅ Role-based access control
- ✅ SQL injection prevention (parameterized queries)

### Frontend Security
- ✅ Token stored in localStorage
- ✅ Automatic token inclusion
- ✅ Automatic logout on 401
- ✅ No sensitive data in frontend code
- ✅ Role-based UI rendering

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    employee_id INTEGER REFERENCES employees(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Environment Variables

Add to `backend/.env`:
```env
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

## Creating New Users

### Via Script (Recommended)
```bash
cd backend
node scripts/createUsers.js
```

### Via API (Admin Only)
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin-token>" \
  -d '{
    "username": "new.user",
    "password": "password123",
    "role": "user",
    "employee_id": 4
  }'
```

## Troubleshooting

### "Access token required"
- Ensure you're logged in
- Check token is in localStorage
- Verify Authorization header is included

### "Invalid or expired token"
- Token has expired (24 hours)
- Login again to get new token

### "Admin access required"
- Endpoint requires admin role
- Login with admin account

### "Access denied"
- User trying to access another user's resources
- Login with correct account or admin

## Best Practices

### For Production

1. **Change JWT Secret:**
   - Use a strong, random secret
   - Store in environment variables
   - Never commit to version control

2. **HTTPS Only:**
   - Use HTTPS in production
   - Secure cookie storage instead of localStorage

3. **Token Refresh:**
   - Implement refresh tokens
   - Shorter access token expiration

4. **Rate Limiting:**
   - Limit login attempts
   - Prevent brute force attacks

5. **Password Policy:**
   - Enforce strong passwords
   - Minimum length requirements
   - Complexity requirements

## Future Enhancements

- [ ] Refresh token implementation
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Two-factor authentication (2FA)
- [ ] Session management
- [ ] Audit logging
- [ ] Password strength meter
- [ ] Remember me functionality
- [ ] Account lockout after failed attempts

## Testing Scenarios

### Test as Admin
1. Login with admin/password123
2. View all tasks from all employees
3. Create a new task
4. Edit any task
5. Delete a task
6. Access employee management
7. View complete dashboard

### Test as Regular User
1. Login with john.doe/password123
2. View only John Doe's tasks
3. Verify cannot create tasks
4. Verify cannot edit tasks
5. Verify cannot delete tasks
6. Verify cannot access employee management
7. View filtered dashboard

### Test Security
1. Try accessing API without token (should fail)
2. Try accessing admin endpoint as user (should fail)
3. Try accessing another user's tasks (should fail)
4. Logout and verify token is removed
5. Try using expired token (should fail)

---

**Authentication is now fully implemented!** 🔐

Users must login to access the application, and permissions are enforced based on their role.
