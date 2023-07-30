const express = require('express');
const router = express.Router();
const AppelOffre = require('../models/AppelOffre');



// Route handlers for AppelsOffres Table
router.post('/', async (req, res) => {
    try {
      const { Type_Appel_Offre, Titre, Expression_Besoin, Date_Creation_Appel_Offre, Date_Validation_Appel_Offre, Date_Publication, Date_Ouverture_Plis, Statut_Appel_Offre, Statut_Approbation } = req.body;
  
      const nouvelAppelOffre = new AppelOffre({
        Type_Appel_Offre,
        Titre,
        Expression_Besoin,
        Date_Creation_Appel_Offre,
        Date_Validation_Appel_Offre,
        Date_Publication,
        Date_Ouverture_Plis,
        Statut_Appel_Offre,
        Statut_Approbation
      });
  
      const savedAppelOffre = await nouvelAppelOffre.save();
      res.status(201).json(savedAppelOffre);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

router.get('/', async (req, res) => {
  try {
    const appelsOffres = await AppelOffre.find();
    res.json(appelsOffres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', getAppelOffre, (req, res) => {
  res.json(res.appelOffre);
});

router.put('/:id', getAppelOffre, async (req, res) => {
  try {
    const { Type_Appel_Offre, Titre, Expression_Besoin, Date_Creation_Appel_Offre, Date_Validation_Appel_Offre, Date_Publication, Date_Ouverture_Plis, Statut_Appel_Offre, Statut_Approbation } = req.body;
    if (Type_Appel_Offre != null) res.appelOffre.Type_Appel_Offre = Type_Appel_Offre;
    if (Titre != null) res.appelOffre.Titre = Titre;
    // Update other properties in a similar way
    const updatedAppelOffre = await res.appelOffre.save();
    res.json(updatedAppelOffre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', getAppelOffre, async (req, res) => {
    try {
      await AppelOffre.deleteOne({ _id: req.params.id });
      res.json({ message: 'Appel d\'Offre supprimé avec succès !' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Middleware to get an Appel d'Offre by ID
async function getAppelOffre(req, res, next) {
  try {
    const appelOffre = await AppelOffre.findById(req.params.id);
    if (appelOffre == null) {
      return res.status(404).json({ message: 'Appel d\'Offre non trouvé !' });
    }
    res.appelOffre = appelOffre;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
