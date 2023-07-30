const mongoose = require('mongoose');

const visitesAppelOffreSchema = new mongoose.Schema({
  ID_Appel_Offre: { type: mongoose.Schema.Types.ObjectId, ref: 'AppelOffre', required: true },
  Date_Visite: { type: Date, required: true },
  Lieu_Visite: { type: String, required: true }
});

module.exports = mongoose.model('VisitesAppelOffre', visitesAppelOffreSchema);
