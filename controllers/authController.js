const bcrypt = require('bcrypt');
const logger = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const authController = {
  register: async (req, res) => {
    try {
      console.log('Inside register controller');
      const { username, email, password, role } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('User already exists:', existingUser);
        return res.status(400).json({ message: 'User with this email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role,
      });

      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  login: async (req, res) => {
    try {
      logger.info('Inside login controller');

      console.log('Inside login controller'); 
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate a user-specific JWT secret
      const userSecret = process.env.JWT_SECRET;
      
      // Use the user-specific secret to sign the JWT token
      const token = jwt.sign({ id: user._id, role: user.role }, userSecret, { expiresIn: '1h' });
  
      // Save the user ID and token to local storage
      res.json({
        token,
        username: user.username,
        role: user.role,
        id: user._id, // Include the user ID in the response
      });
    } catch (error) {
      logger.error(`Error during login: ${error}`);

      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  

  getUserById: async (req, res) => {
    try {
      const { userId } = req.params; // Assuming the userId is provided as a request parameter

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = authController;
