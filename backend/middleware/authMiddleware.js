const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    console.log('No token provided');
    return res.status(403).json({ error: 'No token provided' });
  }

  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    console.log('Invalid token format:', token);
    return res.status(403).json({ error: 'Invalid token format' });
  }

  jwt.verify(tokenParts[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Failed to authenticate token:', err);
      return res.status(500).json({ error: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = authMiddleware;
