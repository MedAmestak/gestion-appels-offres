const mongoose = require('mongoose');

const statutsAppelOffreSchema = new mongoose.Schema({
  Statut: { type: String, required: true }
});

module.exports = mongoose.model('StatutsAppelOffre', statutsAppelOffreSchema);
