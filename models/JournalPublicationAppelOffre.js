const mongoose = require('mongoose');

const journalPublicationAppelOffreSchema = new mongoose.Schema({
  ID_Appel_Offre: { type: mongoose.Schema.Types.ObjectId, ref: 'AppelOffre', required: true },
  Date_Publication: { type: Date, required: true },
  Statut_Publication: { type: String, required: true }
});

module.exports = mongoose.model('JournalPublicationAppelOffre', journalPublicationAppelOffreSchema);