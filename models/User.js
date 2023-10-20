const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['demandeur', 'concurrent' , 'admin' ], default: 'demandeur'},
});

module.exports = mongoose.model('User', userSchema);
