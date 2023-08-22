const express = require('express');
const router = express.Router();
const StatutsAppelOffre = require('../models/StatutsAppelOffre'); 

// Route handlers for Statuts_Appel_Offre Table
router.post('/', async (req, res) => {
  try {
    const { Statut } = req.body;
    const nouveauStatutAppelOffre = new StatutsAppelOffre({ Statut });
    const savedStatutAppelOffre = await nouveauStatutAppelOffre.save();
    res.status(201).json(savedStatutAppelOffre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const statutsAppelOffre = await StatutsAppelOffre.find();
    res.json(statutsAppelOffre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', getStatutAppelOffre, (req, res) => {
  res.json(res.statutAppelOffre);
});

router.put('/:id', getStatutAppelOffre, async (req, res) => {
  try {
    const { Statut } = req.body;
    if (Statut != null) res.statutAppelOffre.Statut = Statut;
    // Update other properties in a similar way
    const updatedStatutAppelOffre = await res.statutAppelOffre.save();
    res.json(updatedStatutAppelOffre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', getStatutAppelOffre, async (req, res) => {
  try {
    await res.statutAppelOffre.deleteOne({ _id: req.params.id });
    res.json({ message: 'Statut de l\'Appel d\'Offre supprimé avec succès !' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get a Statut d'Appel d'Offre by ID
async function getStatutAppelOffre(req, res, next) {
  try {
    const statutAppelOffre = await StatutsAppelOffre.findById(req.params.id);
    if (statutAppelOffre == null) {
      return res.status(404).json({ message: 'Statut de l\'Appel d\'Offre non trouvé !' });
    }
    res.statutAppelOffre = statutAppelOffre;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
