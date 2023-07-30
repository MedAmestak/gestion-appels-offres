const mongoose = require('mongoose');

const workflowApprobationAppelOffreSchema = new mongoose.Schema({
  ID_Appel_Offre: { type: mongoose.Schema.Types.ObjectId, ref: 'AppelOffre', required: true },
  Date_Approbation: { type: Date, required: true },
  Statut_Approbation: { type: String, required: true }
});

module.exports = mongoose.model('Workflow_Approbation_AppelOffre', workflowApprobationAppelOffreSchema);
