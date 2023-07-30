const mongoose = require('mongoose');

const echangesConcurrentsSchema = new mongoose.Schema({
  ID_Appel_Offre: { type: mongoose.Schema.Types.ObjectId, ref: 'AppelOffre', required: true },
  Type_Echange: { type: String, required: true },
  Date_Echange: { type: Date, required: true },
  Incidence_Delais: { type: Boolean, default: false },
  Incidence_Echeances: { type: Boolean, default: false },
  Incidence_Type_Appel_Offre: { type: String }
});

module.exports = mongoose.model('Echanges_Concurrents', echangesConcurrentsSchema);
