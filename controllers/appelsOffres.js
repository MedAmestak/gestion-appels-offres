const express = require('express');
const router = express.Router();
const { authorizeDirector } = require('../controllers/authMiddleware');
const AppelOffre = require('../models/AppelOffre');

// Route handlers for AppelsOffres Table
router.post('/', async (req, res) => {
  try {
    const { Type_Appel_Offre, Titre, Expression_Besoin, User, Categorie } = req.body;

    const Statut_Appel_Offre = 'En attente';
    const Statut_Approbation = 'En attente';
    const Date_Creation_Appel_Offre = new Date();

    const nouvelAppelOffre = new AppelOffre({
      User: User.username,
      Type_Appel_Offre,
      Titre,
      Expression_Besoin,
      Categorie, 
      Date_Creation_Appel_Offre,
      Statut_Appel_Offre,
      Statut_Approbation,
    });

    const savedAppelOffre = await nouvelAppelOffre.save();
    res.status(201).json(savedAppelOffre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { statutApprobation, categorie, typeAppelOffre } = req.query;

    let query = { Statut_Approbation: 'Approuvé' };

    if (categorie) {
      query.Categorie = categorie;
    }

    if (typeAppelOffre) {
      query.Type_Appel_Offre = typeAppelOffre;
    }

    const appelsOffres = await AppelOffre.find(query).populate('User', 'username');
    res.json(appelsOffres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




router.get('/:id', getAppelOffre, async (req, res) => {
  try {
    const appelOffre = await AppelOffre.findById(req.params.id).populate('User', 'username');
    if (appelOffre == null) {
      return res.status(404).json({ message: 'Appel d\'Offre non trouvé !' });
    }
    res.json(appelOffre);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put('/:id', getAppelOffre, async (req, res) => {
  try {
    const { Type_Appel_Offre, Titre, Expression_Besoin, Date_Creation_Appel_Offre, Date_Validation_Appel_Offre, Date_Publication, Date_Ouverture_Plis, Statut_Appel_Offre, Statut_Approbation, Categorie } = req.body; 
    if (Type_Appel_Offre != null) res.appelOffre.Type_Appel_Offre = Type_Appel_Offre;
    if (Titre != null) res.appelOffre.Titre = Titre;
    if (Categorie != null) res.appelOffre.Categorie = Categorie; 
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

router.put('/:id/approbation', authorizeDirector, async (req, res) => {
  try {
    const { statutApprobation } = req.body;

    // Check if the admin is approving the "Appel d'Offre"
    if (statutApprobation === 'Approuvé') {
      // Update the "Statut d'Approbation" to 'Approuvé'
      await AppelOffre.findByIdAndUpdate(
        req.params.id,
        { $set: { Statut_Approbation: 'Approuvé' } }
      );

      // Update the "Statut de l'Appel d'Offre" to 'Publié' to trigger publication
      await AppelOffre.findByIdAndUpdate(
        req.params.id,
        { $set: { Statut_Appel_Offre: 'Publié' } }
      );

      res.json({ message: 'Appel d\'Offre approuvé avec succès !' });
    } else if (statutApprobation === 'Rejeté') {
      // If the admin rejects, update only "Statut d'Approbation" to 'Rejeté'
      await AppelOffre.findByIdAndUpdate(
        req.params.id,
        { $set: { Statut_Approbation: 'Rejeté' } }
      );
      res.json({ message: 'Appel d\'Offre rejeté !' });
    } else {
      res.status(400).json({ message: 'Invalid statutApprobation value' });
    }
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
