const express = require('express');
const router = express.Router();
const EchangesConcurrents = require('../models/EchangesConcurrents');
const AppelOffre = require('../models/AppelOffre');

router.post('/', async (req, res) => {
  try {
    const { ID_Appel_Offre, Type_Echange, Date_Echange, Incidence_Delais, Incidence_Echeances, Incidence_Type_Appel_Offre } = req.body;
    const nouvelEchange = new EchangesConcurrents({
      ID_Appel_Offre,
      Type_Echange,
      Date_Echange,
      Incidence_Delais,
      Incidence_Echeances,
      Incidence_Type_Appel_Offre
    });
    const existingAppelOffre = await AppelOffre.findById(ID_Appel_Offre);
      if (!existingAppelOffre) {
        return res.status(404).json({ message: 'Appel d\'Offre not found!' });
      }
    const savedEchange = await nouvelEchange.save();
    res.status(201).json(savedEchange);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const echanges = await EchangesConcurrents.find();
    res.json(echanges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', getEchange, (req, res) => {
  res.json(res.echange);
});

router.put('/:id', getEchange, async (req, res) => {
  try {
    const { ID_Appel_Offre, Type_Echange, Date_Echange, Incidence_Delais, Incidence_Echeances, Incidence_Type_Appel_Offre } = req.body;
    if (ID_Appel_Offre != null) res.echange.ID_Appel_Offre = ID_Appel_Offre;
    if (Type_Echange != null) res.echange.Type_Echange = Type_Echange;
    if (Date_Echange != null) res.echange.Date_Echange = Date_Echange;
    if (Incidence_Delais != null) res.echange.Incidence_Delais = Incidence_Delais;
    if (Incidence_Echeances != null) res.echange.Incidence_Echeances = Incidence_Echeances;
    if (Incidence_Type_Appel_Offre != null) res.echange.Incidence_Type_Appel_Offre = Incidence_Type_Appel_Offre;

    const updatedEchange = await res.echange.save();
    res.json(updatedEchange);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', getEchange, async (req, res) => {
  try {
    await res.echange.deleteOne({ _id: req.params.id });
    res.json({ message: 'Echange concurrent has been deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get an Echange by ID
async function getEchange(req, res, next) {
  try {
    const echange = await EchangesConcurrents.findById(req.params.id);
    if (!echange) {
      return res.status(404).json({ message: 'Echange not found' });
    }
    res.echange = echange;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
