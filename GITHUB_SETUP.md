# GitHub Repository Setup Guide

This guide will help you create a GitHub repository and push your Employee Task Tracker project.

## Prerequisites

- Git installed on your computer
- GitHub account created
- Project files ready

## Step 1: Create GitHub Repository

### Option A: Via GitHub Website

1. Go to https://github.com
2. Click the "+" icon in the top right
3. Select "New repository"
4. Fill in the details:
   - **Repository name:** `employee-task-tracker`
   - **Description:** "A fullstack web application for managing employees and their tasks"
   - **Visibility:** Public (for internship submission)
   - **Initialize:** Do NOT check any boxes (we already have files)
5. Click "Create repository"

### Option B: Via GitHub CLI

```bash
gh repo create employee-task-tracker --public --description "A fullstack web application for managing employees and their tasks"
```

## Step 2: Initialize Local Git Repository

Open terminal in your project root directory:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Employee Task Tracker fullstack application"
```

## Step 3: Connect to GitHub

Replace `yourusername` with your actual GitHub username:

```bash
# Add remote repository
git remote add origin https://github.com/yourusername/employee-task-tracker.git

# Verify remote
git remote -v
```

## Step 4: Push to GitHub

```bash
# Push to main branch
git branch -M main
git push -u origin main
```

## Step 5: Verify Upload

1. Go to your repository URL: `https://github.com/yourusername/employee-task-tracker`
2. Verify all files are present
3. Check that README.md is displayed on the main page

## Step 6: Add Repository Description and Topics

### Via GitHub Website:

1. Go to your repository
2. Click the gear icon next to "About"
3. Add description: "Fullstack Employee Task Tracker with React, Node.js, Express, and PostgreSQL"
4. Add topics (tags):
   - `react`
   - `nodejs`
   - `express`
   - `postgresql`
   - `fullstack`
   - `rest-api`
   - `task-management`
   - `employee-management`
5. Click "Save changes"

## Step 7: Create a Good README Badge (Optional)

Add these badges to the top of your README.md:

```markdown
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)
```

## Step 8: Add Screenshots

1. Run your application locally
2. Take screenshots of all pages
3. Create a `screenshots` folder in your repository
4. Add screenshots to the folder
5. Update SCREENSHOTS.md with actual images:

```markdown
![Dashboard](screenshots/dashboard.png)
```

6. Commit and push:

```bash
git add screenshots/
git add SCREENSHOTS.md
git commit -m "Add application screenshots"
git push
```

## Step 9: Create a Release (Optional)

1. Go to your repository on GitHub
2. Click "Releases" on the right sidebar
3. Click "Create a new release"
4. Fill in:
   - **Tag version:** v1.0.0
   - **Release title:** Employee Task Tracker v1.0.0
   - **Description:** Initial release with all core features
5. Click "Publish release"

## Step 10: Add a License

1. Go to your repository
2. Click "Add file" → "Create new file"
3. Name it `LICENSE`
4. Click "Choose a license template"
5. Select "MIT License"
6. Click "Review and submit"
7. Commit the file

## Repository Structure Checklist

Ensure your repository has:

- [x] README.md (main documentation)
- [x] .gitignore (no node_modules or .env files)
- [x] frontend/ directory
- [x] backend/ directory
- [x] database/ directory
- [x] All documentation files
- [x] .env.example files (not .env)
- [x] package.json files
- [x] Clear folder structure

## Common Git Commands

### Making Changes

```bash
# Check status
git status

# Add specific file
git add filename

# Add all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push
```

### Viewing History

```bash
# View commit history
git log

# View changes
git diff
```

### Branching (Optional)

```bash
# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Merge branch
git merge feature-name
```

## Best Practices

### Commit Messages

Use clear, descriptive commit messages:

✅ Good:
- "Add employee management feature"
- "Fix task filtering bug"
- "Update API documentation"
- "Improve responsive design"

❌ Bad:
- "Update"
- "Fix"
- "Changes"
- "asdf"

### Commit Frequency

- Commit after completing each feature
- Commit before making major changes
- Don't commit broken code
- Keep commits focused on one thing

### What NOT to Commit

- ❌ node_modules/
- ❌ .env files
- ❌ Database credentials
- ❌ Personal information
- ❌ Large binary files
- ❌ IDE-specific files (unless needed)

## Troubleshooting

### Problem: "Permission denied (publickey)"

**Solution:** Set up SSH keys or use HTTPS URL

```bash
# Use HTTPS instead
git remote set-url origin https://github.com/yourusername/employee-task-tracker.git
```

### Problem: "Repository not found"

**Solution:** Check repository URL and your username

```bash
# Verify remote URL
git remote -v

# Update if needed
git remote set-url origin https://github.com/yourusername/employee-task-tracker.git
```

### Problem: "Failed to push some refs"

**Solution:** Pull first, then push

```bash
git pull origin main --rebase
git push origin main
```

### Problem: Accidentally committed .env file

**Solution:** Remove from git history

```bash
# Remove from git but keep locally
git rm --cached .env

# Commit the removal
git commit -m "Remove .env from repository"

# Push
git push
```

## Repository Checklist for Submission

Before submitting, verify:

- [ ] Repository is public
- [ ] README.md is complete and displays correctly
- [ ] All code is pushed
- [ ] No sensitive information (passwords, API keys)
- [ ] .gitignore is working (no node_modules)
- [ ] Screenshots are included
- [ ] Repository has a description
- [ ] Topics/tags are added
- [ ] All documentation files are present
- [ ] Links in documentation work
- [ ] Repository URL is ready to share

## Example Repository URL Format

Your final repository URL should look like:

```
https://github.com/yourusername/employee-task-tracker
```

Share this URL in your internship application.

## Adding Collaborators (Optional)

If you want to add reviewers:

1. Go to repository Settings
2. Click "Collaborators"
3. Click "Add people"
4. Enter their GitHub username
5. Click "Add [username] to this repository"

## Repository Insights

After pushing, you can view:

- **Insights** → **Traffic**: See who visits your repo
- **Insights** → **Contributors**: See commit statistics
- **Insights** → **Code frequency**: See development activity

## Making Your Repository Stand Out

1. **Add a banner image** to README.md
2. **Include GIFs** showing features in action
3. **Add badges** for technologies used
4. **Write a detailed README** (already done!)
5. **Include a demo video** link
6. **Add a live demo** link (if deployed)
7. **Keep commits clean** and organized
8. **Respond to issues** if anyone opens them

## Final Steps

1. ✅ Push all code to GitHub
2. ✅ Verify everything is visible
3. ✅ Test cloning the repository
4. ✅ Share the URL in your application
5. ✅ Keep the repository maintained

---

## Quick Command Reference

```bash
# Initial setup
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/employee-task-tracker.git
git push -u origin main

# Regular workflow
git add .
git commit -m "Description of changes"
git push

# Check status
git status
git log --oneline
```

---

**Congratulations!** Your project is now on GitHub and ready for submission! 🎉
