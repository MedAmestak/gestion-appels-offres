const mongoose = require('mongoose');

const documentAppelOffreSchema = new mongoose.Schema({
  ID_Appel_Offre: { type: mongoose.Schema.Types.ObjectId, ref: 'AppelOffre', required: true },
  Type_Document: { type: String, required: true },
  Fichier_Document: { type: String, required: true }
});

module.exports = mongoose.model('Documents_Appel_Offre', documentAppelOffreSchema);
