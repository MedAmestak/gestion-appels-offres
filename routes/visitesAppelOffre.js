const express = require('express');
const router = express.Router();
const VisitesAppelOffre = require('../models/VisitesAppelOffre'); // Assuming you have a model for VisitesAppelOffre
const AppelOffre = require('../models/AppelOffre'); 

// Route handlers for Visites_Appel_Offre Table
router.post('/', async (req, res) => {
  try {
    const { ID_Appel_Offre, Date_Visite, Lieu_Visite } = req.body;
    const nouvelleVisiteAppelOffre = new VisitesAppelOffre({ 
        ID_Appel_Offre, 
        Date_Visite, 
        Lieu_Visite });

    const appelOffre = await AppelOffre.findById(ID_Appel_Offre);
        if (!appelOffre) {
          return res.status(404).json({ message: 'Appel d\'Offre not found' });
        }

    const savedVisiteAppelOffre = await nouvelleVisiteAppelOffre.save();
    res.status(201).json(savedVisiteAppelOffre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const visitesAppelOffre = await VisitesAppelOffre.find();
    res.json(visitesAppelOffre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', getVisiteAppelOffre, (req, res) => {
  res.json(res.visiteAppelOffre);
});

router.put('/:id', getVisiteAppelOffre, async (req, res) => {
  try {
    const { ID_Appel_Offre, Date_Visite, Lieu_Visite } = req.body;
    if (ID_Appel_Offre != null) res.visiteAppelOffre.ID_Appel_Offre = ID_Appel_Offre;
    if (Date_Visite != null) res.visiteAppelOffre.Date_Visite = Date_Visite;
    if (Lieu_Visite != null) res.visiteAppelOffre.Lieu_Visite = Lieu_Visite;
    // Update other properties in a similar way
    const updatedVisiteAppelOffre = await res.visiteAppelOffre.save();
    res.json(updatedVisiteAppelOffre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', getVisiteAppelOffre, async (req, res) => {
  try {
    await res.visiteAppelOffre.deleteOne({ _id: req.params.id });
    res.json({ message: 'Visite de l\'Appel d\'Offre supprimée avec succès !' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get a Visite d'Appel d'Offre by ID
async function getVisiteAppelOffre(req, res, next) {
  try {
    const visiteAppelOffre = await VisitesAppelOffre.findById(req.params.id);
    if (visiteAppelOffre == null) {
      return res.status(404).json({ message: 'Visite de l\'Appel d\'Offre non trouvée !' });
    }
    res.visiteAppelOffre = visiteAppelOffre;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
