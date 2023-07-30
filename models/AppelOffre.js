const mongoose = require('mongoose');

const appelOffreSchema = new mongoose.Schema({
  Type_Appel_Offre: { type: String, required: true },
  Titre: { type: String, required: true },
  Expression_Besoin: { type: String, required: true },
  Date_Creation_Appel_Offre: { type: Date, required: true },
  Date_Validation_Appel_Offre: { type: Date },
  Date_Publication: { type: Date },
  Date_Ouverture_Plis: { type: Date },
  Statut_Appel_Offre: { type: String, required: true },
  Statut_Approbation: { type: String },
});

module.exports = mongoose.model('AppelOffre', appelOffreSchema);
