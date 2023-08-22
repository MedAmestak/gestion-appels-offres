const express = require('express');
const router = express.Router();
const Workflow_Approbation_AppelOffre = require('../models/WorkflowApprobationAppelOffre'); 
const AppelOffre = require('../models/AppelOffre'); 


router.post('/', async (req, res) => {
    try {
      const { ID_Appel_Offre, Date_Approbation, Statut_Approbation } = req.body;
      const nouveauWorkflow = new Workflow_Approbation_AppelOffre({
        ID_Appel_Offre,
        Date_Approbation,
        Statut_Approbation
      });


    const appelOffre = await AppelOffre.findById(ID_Appel_Offre);
    if (!appelOffre) {
      return res.status(404).json({ message: 'Appel d\'Offre not found' });
    }
      const savedWorkflow = await nouveauWorkflow.save();
      res.status(201).json(savedWorkflow);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

router.get('/', async (req, res) => {
  try {
    const workflows = await Workflow_Approbation_AppelOffre.find();
    res.json(workflows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', getWorkflow, (req, res) => {
  res.json(res.workflow);
});

router.put('/:id', getWorkflow, async (req, res) => {
  try {
    const { ID_Appel_Offre, ID_Approbateur, Date_Approbation, Statut_Approbation } = req.body;
    if (ID_Appel_Offre != null) res.workflow.ID_Appel_Offre = ID_Appel_Offre;
    if (ID_Approbateur != null) res.workflow.ID_Approbateur = ID_Approbateur;
    if (Date_Approbation != null) res.workflow.Date_Approbation = Date_Approbation;
    if (Statut_Approbation != null) res.workflow.Statut_Approbation = Statut_Approbation;
    
    const updatedWorkflow = await res.workflow.save();
    res.json(updatedWorkflow);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', getWorkflow, async (req, res) => {
  try {
    await res.workflow.deleteOne({ _id: req.params.id });
    res.json({ message: 'Workflow d\'approbation de l\'Appel d\'Offre supprimé avec succès !' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get a Workflow by ID
async function getWorkflow(req, res, next) {
  try {
    const workflow = await Workflow_Approbation_AppelOffre.findById(req.params.id);
    if (workflow == null) {
      return res.status(404).json({ message: 'Workflow d\'approbation de l\'Appel d\'Offre non trouvé !' });
    }
    res.workflow = workflow;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
