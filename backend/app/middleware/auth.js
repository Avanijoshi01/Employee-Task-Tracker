const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Verify JWT token
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Check if user is admin
exports.requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Check if user can access resource (admin or own resource)
exports.requireOwnerOrAdmin = (req, res, next) => {
  const requestedEmployeeId = parseInt(req.params.id) || parseInt(req.query.employee_id);
  
  if (req.user.role === 'admin') {
    return next();
  }
  
  if (req.user.employee_id === requestedEmployeeId) {
    return next();
  }
  
  return res.status(403).json({ error: 'Access denied' });
};
