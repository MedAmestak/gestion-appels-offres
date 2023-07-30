const express = require('express');
const router = express.Router();
const MembreCommission = require('../models/MembreCommission'); // Assuming you have a model for MembreCommission

// Route handlers for Membres_Commission Table
router.post('/', async (req, res) => {
  try {
    const { Nom, Role } = req.body;
    const nouveauMembre = new MembreCommission({
      Nom,
      Role
    });
    const savedMembre = await nouveauMembre.save();
    res.status(201).json(savedMembre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const membresCommission = await MembreCommission.find();
    res.json(membresCommission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', getMembreCommission, (req, res) => {
  res.json(res.membreCommission);
});

router.put('/:id', getMembreCommission, async (req, res) => {
  try {
    const { Nom, Role } = req.body;
    if (Nom != null) res.membreCommission.Nom = Nom;
    if (Role != null) res.membreCommission.Role = Role;
    // Update other properties in a similar way
    const updatedMembre = await res.membreCommission.save();
    res.json(updatedMembre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', getMembreCommission, async (req, res) => {
  try {
    await res.membreCommission.deleteOne({ _id: req.params.id });
    res.json({ message: 'Membre Commission supprimé avec succès !' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get a Membre Commission by ID
async function getMembreCommission(req, res, next) {
  try {
    const membreCommission = await MembreCommission.findById(req.params.id);
    if (membreCommission == null) {
      return res.status(404).json({ message: 'Membre Commission non trouvé !' });
    }
    res.membreCommission = membreCommission;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
