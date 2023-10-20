const jwt = require('jsonwebtoken');

function authorizeClient(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true }); // Set ignoreExpiration to true to skip expiration check
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired. Please log in again.' });
    }
    console.error('Token Verification Error:', error);
    res.status(403).json({ message: 'Invalid token' });
  }
}

function authorizeDirector(req, res, next) {
  console.log('Request Headers:', req.headers); // Log the request headers
  console.log('Secret:', process.env.JWT_SECRET);
  const token = req.header('Authorization'); // Assuming the token is sent in the Authorization header
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true }); // Set ignoreExpiration to true to skip expiration check
    req.user = decoded; // Attach the decoded user information to the request object
    console.log('Decoded Token:', decoded); // Add this log
    console.log('User:', req.user); // Log the user object

    // Proceed to the next middleware
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired. Please log in again.' });
    }
    console.error('Token Verification Error:', error);
    res.status(403).json({ message: 'Invalid token' });
  }
}

module.exports = { authorizeDirector, authorizeClient };