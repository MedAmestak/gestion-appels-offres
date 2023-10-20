const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Import your user-specific secret (you can customize this part)
const userSecret = process.env.JWT_SECRET;

// Route for verifying tokens
router.post('/verify-token', (req, res) => {
  const { token } = req.body;

  // Verify the token using the user-specific secret
  try {
    const decoded = jwt.verify(token, userSecret);
    res.json({ valid: true, decoded });
  } catch (error) {
    res.json({ valid: false, error: error.message });
  }
});

module.exports = router;
