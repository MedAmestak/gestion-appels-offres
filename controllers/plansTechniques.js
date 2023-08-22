const express = require('express');
const router = express.Router();
const PlansTechniques = require('../models/PlansTechniques');
const AppelOffre = require('../models/AppelOffre')

// Route handlers for Plans_Techniques Table
router.post('/', async (req, res) => {
  try {
    const { ID_Appel_Offre, Plan_Nom, Plan_Description, Plan_Fichier } = req.body;
    const nouveauPlanTechnique = new PlansTechniques({
      ID_Appel_Offre,
      Plan_Nom,
      Plan_Description,
      Plan_Fichier
    });
    const existingAppelOffre = await AppelOffre.findById(ID_Appel_Offre);
    if (!existingAppelOffre) {
      return res.status(404).json({ message: 'Appel d\'Offre not found!' });
    }
    const savedPlanTechnique = await nouveauPlanTechnique.save();
    res.status(201).json(savedPlanTechnique);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const plansTechniques = await PlansTechniques.find();
    res.json(plansTechniques);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', getPlanTechnique, (req, res) => {
  res.json(res.planTechnique);
});

router.put('/:id', getPlanTechnique, async (req, res) => {
  try {
    const { ID_Appel_Offre, Plan_Nom, Plan_Description, Plan_Fichier } = req.body;
    if (ID_Appel_Offre != null) res.planTechnique.ID_Appel_Offre = ID_Appel_Offre;
    if (Plan_Nom != null) res.planTechnique.Plan_Nom = Plan_Nom;
    if (Plan_Description != null) res.planTechnique.Plan_Description = Plan_Description;
    if (Plan_Fichier != null) res.planTechnique.Plan_Fichier = Plan_Fichier;
    // Update other properties in a similar way
    const updatedPlanTechnique = await res.planTechnique.save();
    res.json(updatedPlanTechnique);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', getPlanTechnique, async (req, res) => {
  try {
    await res.planTechnique.deleteOne({ _id: req.params.id });
    res.json({ message: 'Plan Technique supprimé avec succès !' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get a Plan Technique by ID
async function getPlanTechnique(req, res, next) {
  try {
    const planTechnique = await PlansTechniques.findById(req.params.id);
    if (planTechnique == null) {
      return res.status(404).json({ message: 'Plan Technique non trouvé !' });
    }
    res.planTechnique = planTechnique;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
