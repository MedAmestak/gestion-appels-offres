const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authController');

// Register route
router.post('/register', authControllers.register);

// Login route
router.post('/login', authControllers.login);

module.exports = router;
