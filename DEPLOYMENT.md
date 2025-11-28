# Deployment Guide

This guide provides instructions for deploying the Employee Task Tracker application to production.

## Deployment Options

### Option 1: Traditional VPS (DigitalOcean, AWS EC2, etc.)
### Option 2: Platform as a Service (Heroku, Render, Railway)
### Option 3: Containerized (Docker + Docker Compose)

---

## Option 1: VPS Deployment

### Prerequisites
- Ubuntu 20.04+ server
- Domain name (optional)
- SSH access

### Step 1: Server Setup

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

# Install PM2 (process manager)
sudo npm install -g pm2
```

### Step 2: Database Setup

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE employee_task_tracker;
CREATE USER tasktracker WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE employee_task_tracker TO tasktracker;
\q

# Run schema
psql -U tasktracker -d employee_task_tracker -f database/schema.sql
```

### Step 3: Backend Deployment

```bash
# Clone repository
git clone https://github.com/yourusername/employee-task-tracker.git
cd employee-task-tracker/backend

# Install dependencies
npm install --production

# Create .env file
cat > .env << EOF
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=employee_task_tracker
DB_USER=tasktracker
DB_PASSWORD=your_secure_password
NODE_ENV=production
EOF

# Start with PM2
pm2 start server.js --name employee-task-tracker-api
pm2 save
pm2 startup
```

### Step 4: Frontend Deployment

```bash
cd ../frontend

# Install dependencies
npm install

# Create production .env
cat > .env << EOF
VITE_API_URL=https://api.yourdomain.com
EOF

# Build for production
npm run build

# Copy build to nginx directory
sudo cp -r dist/* /var/www/html/
```

### Step 5: Nginx Configuration

```bash
# Create nginx config
sudo nano /etc/nginx/sites-available/employee-task-tracker

# Add this configuration:
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend
    location / {
        root /var/www/html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/employee-task-tracker /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 6: SSL Certificate (Optional but Recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Option 2: Heroku Deployment

### Backend on Heroku

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
cd backend
heroku create your-app-name-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set NODE_ENV=production

# Deploy
git init
git add .
git commit -m "Initial commit"
git push heroku main

# Run database schema
heroku pg:psql < ../database/schema.sql
```

### Frontend on Vercel/Netlify

**Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel

# Set environment variable
vercel env add VITE_API_URL production
# Enter: https://your-app-name-api.herokuapp.com
```

**Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd frontend
netlify deploy --prod

# Set environment variable in Netlify dashboard
# VITE_API_URL = https://your-app-name-api.herokuapp.com
```

---

## Option 3: Docker Deployment

### Create Dockerfile for Backend

```dockerfile
# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

### Create Dockerfile for Frontend

```dockerfile
# frontend/Dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Create docker-compose.yml

```yaml
version: '3.8'

services:
  database:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: employee_task_tracker
      POSTGRES_USER: tasktracker
      POSTGRES_PASSWORD: your_secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/schema.sql:/docker-entrypoint-initdb.d/schema.sql
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
      DB_PASSWORD: your_secure_password
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

### Deploy with Docker

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## Environment Variables for Production

### Backend
```env
PORT=3000
DB_HOST=your_db_host
DB_PORT=5432
DB_NAME=employee_task_tracker
DB_USER=your_db_user
DB_PASSWORD=your_secure_password
NODE_ENV=production
```

### Frontend
```env
VITE_API_URL=https://api.yourdomain.com
```

---

## Security Checklist

- [ ] Use HTTPS (SSL certificate)
- [ ] Set strong database passwords
- [ ] Enable firewall (UFW on Ubuntu)
- [ ] Keep Node.js and dependencies updated
- [ ] Use environment variables for secrets
- [ ] Enable CORS only for your domain
- [ ] Set up database backups
- [ ] Monitor application logs
- [ ] Use rate limiting on API
- [ ] Implement authentication (if required)

---

## Monitoring & Maintenance

### PM2 Commands
```bash
# View status
pm2 status

# View logs
pm2 logs employee-task-tracker-api

# Restart
pm2 restart employee-task-tracker-api

# Stop
pm2 stop employee-task-tracker-api
```

### Database Backup
```bash
# Backup
pg_dump -U tasktracker employee_task_tracker > backup.sql

# Restore
psql -U tasktracker employee_task_tracker < backup.sql
```

### Nginx Commands
```bash
# Test configuration
sudo nginx -t

# Reload
sudo systemctl reload nginx

# Restart
sudo systemctl restart nginx

# View logs
sudo tail -f /var/log/nginx/error.log
```

---

## Performance Optimization

### Backend
- Enable gzip compression
- Use connection pooling (already implemented)
- Add caching for frequently accessed data
- Optimize database queries
- Use CDN for static assets

### Frontend
- Minify and bundle assets (done by Vite)
- Enable lazy loading
- Optimize images
- Use CDN
- Enable browser caching

### Database
- Add indexes (already implemented)
- Regular VACUUM and ANALYZE
- Monitor slow queries
- Set up read replicas for scaling

---

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (Nginx, HAProxy)
- Deploy multiple backend instances
- Use Redis for session storage
- Implement database replication

### Vertical Scaling
- Increase server resources (CPU, RAM)
- Optimize database configuration
- Use faster storage (SSD)

---

## Troubleshooting Production Issues

### Backend not responding
```bash
# Check if process is running
pm2 status

# Check logs
pm2 logs

# Restart
pm2 restart employee-task-tracker-api
```

### Database connection issues
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check connections
sudo -u postgres psql -c "SELECT * FROM pg_stat_activity;"
```

### Frontend not loading
```bash
# Check Nginx status
sudo systemctl status nginx

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
```

---

## Cost Estimation

### Free Tier Options
- **Frontend:** Vercel, Netlify (Free tier)
- **Backend:** Render, Railway (Free tier with limitations)
- **Database:** Supabase, ElephantSQL (Free tier)

### Paid Options
- **VPS:** $5-10/month (DigitalOcean, Linode)
- **Heroku:** $7/month (Hobby tier)
- **AWS:** Variable, ~$10-20/month for small app

---

## Continuous Deployment

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /path/to/app
            git pull
            cd backend && npm install && pm2 restart employee-task-tracker-api
            cd ../frontend && npm install && npm run build && sudo cp -r dist/* /var/www/html/
```

---

## Support & Resources

- [Node.js Deployment Guide](https://nodejs.org/en/docs/guides/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
