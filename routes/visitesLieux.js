const express = require('express');
const router = express.Router();
const VisitesLieux = require('../models/VisitesLieux'); // Assuming you have a model for VisitesLieux
const AppelOffre = require('../models/AppelOffre')
// Route handlers for Visites_Lieux Table
router.post('/', async (req, res) => {
  try {
    const { ID_Appel_Offre, Date_Visite, Lieu_Visite } = req.body;

    const existingAppelOffre = await AppelOffre.findById(ID_Appel_Offre);
    if (!existingAppelOffre) {
      return res.status(404).json({ message: 'Appel d\'Offre not found!' });
    }
    const nouvelleVisiteLieux = new VisitesLieux({ 
        ID_Appel_Offre, 
        Date_Visite, 
        Lieu_Visite });

    const savedVisiteLieux = await nouvelleVisiteLieux.save();
    res.status(201).json(savedVisiteLieux);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const visitesLieux = await VisitesLieux.find();
    res.json(visitesLieux);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', getVisiteLieux, (req, res) => {
  res.json(res.visiteLieux);
});

router.put('/:id', getVisiteLieux, async (req, res) => {
  try {
    const { ID_Appel_Offre, Date_Visite, Lieu_Visite } = req.body;
    if (ID_Appel_Offre != null) res.visiteLieux.ID_Appel_Offre = ID_Appel_Offre;
    if (Date_Visite != null) res.visiteLieux.Date_Visite = Date_Visite;
    if (Lieu_Visite != null) res.visiteLieux.Lieu_Visite = Lieu_Visite;
    // Update other properties in a similar way
    const updatedVisiteLieux = await res.visiteLieux.save();
    res.json(updatedVisiteLieux);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', getVisiteLieux, async (req, res) => {
  try {
    await res.visiteLieux.deleteOne({ _id: req.params.id });
    res.json({ message: 'Visite du Lieu de l\'Appel d\'Offre supprimée avec succès !' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get a Visite du Lieu d'Appel d'Offre by ID
async function getVisiteLieux(req, res, next) {
  try {
    const visiteLieux = await VisitesLieux.findById(req.params.id);
    if (visiteLieux == null) {
      return res.status(404).json({ message: 'Visite du Lieu de l\'Appel d\'Offre non trouvée !' });
    }
    res.visiteLieux = visiteLieux;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
