// clientDashboard.js

const express = require('express');
const app = express();
const User = require('../models/User'); // Replace with the appropriate User model import

// Your other existing routes and configurations

app.get('/api/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Your other existing routes and configurations

module.exports = app;
