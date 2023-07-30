const mongoose = require('mongoose');

const dossierAppelCommissionSchema = new mongoose.Schema({
  ID_Appel_Offre: { type: mongoose.Schema.Types.ObjectId, ref: 'AppelOffre', required: true },
  ID_Membre_Commission: { type: mongoose.Schema.Types.ObjectId, ref: 'MembreCommission', required: true },
  Date_Remise_Dossier: { type: Date, required: true },
  Statut_Approbation_Dossier: { type: String, required: true }
});

module.exports = mongoose.model('DossierAppelCommission', dossierAppelCommissionSchema);
