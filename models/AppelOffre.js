const mongoose = require('mongoose');

const appelOffreSchema = new mongoose.Schema({
  User: {
    type: String,
    required: true,
  },
  Type_Appel_Offre: {
    type: String,
    required: true,
  },
  Titre: {
    type: String,
    required: true,
  },
  Expression_Besoin: {
    type: String,
    required: true,
  },
  Categorie: { 
    type: String,
    required: true,
  },
  Date_Creation_Appel_Offre: {
    type: Date, 
  },
  Date_Validation_Appel_Offre: {
    type: Date,
  },
  Date_Publication: {
    type: Date,
  },
  Date_Ouverture_Plis: {
    type: Date,
  },
  Statut_Appel_Offre: {
    type: String,
    required: true,
  },
  Statut_Approbation: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('AppelOffre', appelOffreSchema);
