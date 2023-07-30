const mongoose = require('mongoose');

const membreCommissionSchema = new mongoose.Schema({
  Nom: { type: String, required: true },
  Role: { type: String, required: true },
});

module.exports = mongoose.model('MembreCommission', membreCommissionSchema);
