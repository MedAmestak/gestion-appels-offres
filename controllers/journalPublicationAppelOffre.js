const express = require('express');
const router = express.Router();
const JournalPublicationAppelOffre = require('../models/JournalPublicationAppelOffre'); 
const AppelOffre = require('../models/AppelOffre'); 

// Route handlers for Journal_Publication_Appel_Offre Table
router.post('/', async (req, res) => {
  try {
    const { ID_Appel_Offre, Date_Publication, Statut_Publication } = req.body;
    const nouveauJournalPublication = new JournalPublicationAppelOffre({
      ID_Appel_Offre,
      Date_Publication,
      Statut_Publication
    });

    const existingAppelOffre = await AppelOffre.findById(ID_Appel_Offre);
      if (!existingAppelOffre) {
        return res.status(404).json({ message: 'Appel d\'Offre not found!' });
      }

    const savedJournalPublication = await nouveauJournalPublication.save();
    res.status(201).json(savedJournalPublication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const journalPublicationAppelOffre = await JournalPublicationAppelOffre.find();
    res.json(journalPublicationAppelOffre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', getJournalPublicationAppelOffre, (req, res) => {
  res.json(res.journalPublicationAppelOffre);
});

router.put('/:id', getJournalPublicationAppelOffre, async (req, res) => {
  try {
    const { ID_Appel_Offre, Date_Publication, Statut_Publication } = req.body;
    if (ID_Appel_Offre != null) res.journalPublicationAppelOffre.ID_Appel_Offre = ID_Appel_Offre;
    if (Date_Publication != null) res.journalPublicationAppelOffre.Date_Publication = Date_Publication;
    if (Statut_Publication != null) res.journalPublicationAppelOffre.Statut_Publication = Statut_Publication;
    // Update other properties in a similar way
    const updatedJournalPublication = await res.journalPublicationAppelOffre.save();
    res.json(updatedJournalPublication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', getJournalPublicationAppelOffre, async (req, res) => {
  try {
    await res.journalPublicationAppelOffre.deleteOne({ _id: req.params.id });
    res.json({ message: 'Journal Publication Appel Offre supprimé avec succès !' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get a Journal Publication Appel Offre by ID
async function getJournalPublicationAppelOffre(req, res, next) {
  try {
    const journalPublicationAppelOffre = await JournalPublicationAppelOffre.findById(req.params.id);
    if (journalPublicationAppelOffre == null) {
      return res.status(404).json({ message: 'Journal Publication Appel Offre non trouvé !' });
    }
    res.journalPublicationAppelOffre = journalPublicationAppelOffre;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
