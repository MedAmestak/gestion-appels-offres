const mongoose = require('mongoose');

const plansTechniquesSchema = new mongoose.Schema({
  ID_Appel_Offre: { type: mongoose.Schema.Types.ObjectId, ref: 'AppelOffre', required: true },
  Plan_Nom: { type: String, required: true },
  Plan_Description: { type: String },
  Plan_Fichier: { type: String, required: true }
});

module.exports = mongoose.model('PlansTechniques', plansTechniquesSchema);
