const express = require('express');
const router = express.Router();
const CircuitApprobation = require('../models/CircuitApprobation'); // Assuming you have a model for CircuitApprobation
const WorkflowApprobationAppelOffre = require('../models/WorkflowApprobationAppelOffre'); 

// Route handlers for Circuit_Approbation Table
router.post('/', async (req, res) => {
  try {
    const { Type_Appel_Offre, Niveau_Approbation, ID_Approbateur } = req.body;
    const nouveauCircuit = new CircuitApprobation({
      Type_Appel_Offre,
      Niveau_Approbation,
      ID_Approbateur
    });
    const existingWorkflowApprobationAppelOffre = await WorkflowApprobationAppelOffre.findById(ID_Approbateur);
    if (!existingWorkflowApprobationAppelOffre) {
      return res.status(404).json({ message: 'Approbateur not found!' });
    }
    const savedCircuit = await nouveauCircuit.save();
    res.status(201).json(savedCircuit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const circuitsApprobation = await CircuitApprobation.find();
    res.json(circuitsApprobation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', getCircuitApprobation, (req, res) => {
  res.json(res.circuitApprobation);
});

router.put('/:id', getCircuitApprobation, async (req, res) => {
  try {
    const { Type_Appel_Offre, Niveau_Approbation, ID_Approbateur } = req.body;
    if (Type_Appel_Offre != null) res.circuitApprobation.Type_Appel_Offre = Type_Appel_Offre;
    if (Niveau_Approbation != null) res.circuitApprobation.Niveau_Approbation = Niveau_Approbation;
    if (ID_Approbateur != null) res.circuitApprobation.ID_Approbateur = ID_Approbateur;
    // Update other properties in a similar way
    const updatedCircuit = await res.circuitApprobation.save();
    res.json(updatedCircuit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', getCircuitApprobation, async (req, res) => {
  try {
    await res.circuitApprobation.deleteOne({ _id: req.params.id });
    res.json({ message: 'Circuit Approbation supprimé avec succès !' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get a Circuit Approbation by ID
async function getCircuitApprobation(req, res, next) {
  try {
    const circuitApprobation = await CircuitApprobation.findById(req.params.id);
    if (circuitApprobation == null) {
      return res.status(404).json({ message: 'Circuit Approbation non trouvé !' });
    }
    res.circuitApprobation = circuitApprobation;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
