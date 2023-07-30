const mongoose = require('mongoose');

const circuitApprobationSchema = new mongoose.Schema({
  Type_Appel_Offre: { type: String, required: true },
  Niveau_Approbation: { type: Number, required: true },
  ID_Approbateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Workflow_Approbation_AppelOffre', required: true }
});

module.exports = mongoose.model('CircuitApprobation', circuitApprobationSchema);
