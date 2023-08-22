const express = require('express');
const router = express.Router();
const DossierAppelCommission = require('../models/DossierAppelCommission'); // Assuming you have a model for DossierAppelCommission
const AppelOffre = require('../models/AppelOffre'); 
const MembreCommission = require('../models/MembreCommission'); 

// Route handlers for Dossiers_Appels_Offre_Commission Table
router.post('/', async (req, res) => {
  try {
    const { ID_Appel_Offre, ID_Membre_Commission, Date_Remise_Dossier, Statut_Approbation_Dossier } = req.body;
    const nouveauDossier = new DossierAppelCommission({
      ID_Appel_Offre,
      ID_Membre_Commission,
      Date_Remise_Dossier,
      Statut_Approbation_Dossier
    });
    const existingAppelOffre = await AppelOffre.findById(ID_Appel_Offre);
      if (!existingAppelOffre) {
        return res.status(404).json({ message: 'Appel d\'Offre not found!' });
      }
    const existingMembreCommission = await MembreCommission.findById(ID_Membre_Commission);
      if (!existingMembreCommission) {
        return res.status(404).json({ message: 'Membre Commission not found!' });
      }
    
    const savedDossier = await nouveauDossier.save();
    res.status(201).json(savedDossier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const dossiersAppelsOffreCommission = await DossierAppelCommission.find();
    res.json(dossiersAppelsOffreCommission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', getDossierAppelCommission, (req, res) => {
  res.json(res.dossierAppelCommission);
});

router.put('/:id', getDossierAppelCommission, async (req, res) => {
  try {
    const { ID_Appel_Offre, ID_Membre_Commission, Date_Remise_Dossier, Statut_Approbation_Dossier } = req.body;
    if (ID_Appel_Offre != null) res.dossierAppelCommission.ID_Appel_Offre = ID_Appel_Offre;
    if (ID_Membre_Commission != null) res.dossierAppelCommission.ID_Membre_Commission = ID_Membre_Commission;
    if (Date_Remise_Dossier != null) res.dossierAppelCommission.Date_Remise_Dossier = Date_Remise_Dossier;
    if (Statut_Approbation_Dossier != null) res.dossierAppelCommission.Statut_Approbation_Dossier = Statut_Approbation_Dossier;
    // Update other properties in a similar way
    const updatedDossier = await res.dossierAppelCommission.save();
    res.json(updatedDossier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', getDossierAppelCommission, async (req, res) => {
  try {
    await res.dossierAppelCommission.deleteOne({ _id: req.params.id });
    res.json({ message: 'Dossier Appel Commission supprimé avec succès !' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get a Dossier Appel Commission by ID
async function getDossierAppelCommission(req, res, next) {
  try {
    const dossierAppelCommission = await DossierAppelCommission.findById(req.params.id);
    if (dossierAppelCommission == null) {
      return res.status(404).json({ message: 'Dossier Appel Commission non trouvé !' });
    }
    res.dossierAppelCommission = dossierAppelCommission;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
