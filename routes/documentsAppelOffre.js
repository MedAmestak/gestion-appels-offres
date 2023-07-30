const express = require('express');
const router = express.Router();
const DocumentAppelOffre = require('../models/DocumentAppelOffre'); 
const AppelOffre = require('../models/AppelOffre'); 

router.post('/', async (req, res) => {
    try {
      const { ID_Appel_Offre, Type_Document, Fichier_Document } = req.body;
  
      
      const existingAppelOffre = await AppelOffre.findById(ID_Appel_Offre);
      if (!existingAppelOffre) {
        return res.status(404).json({ message: 'Appel d\'Offre not found!' });
      }
  
      const nouveauDocument = new DocumentAppelOffre({
        ID_Appel_Offre, 
        Type_Document,
        Fichier_Document
      });
  
      const savedDocument = await nouveauDocument.save();
      res.status(201).json(savedDocument);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

router.get('/', async (req, res) => {
  try {
    const documentsAppelOffre = await DocumentAppelOffre.find();
    res.json(documentsAppelOffre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', getDocumentAppelOffre, (req, res) => {
  res.json(res.documentAppelOffre);
});

router.put('/:id', getDocumentAppelOffre, async (req, res) => {
  try {
    const { Type_Document, Fichier_Document } = req.body;
    if (Type_Document != null) res.documentAppelOffre.Type_Document = Type_Document;
    if (Fichier_Document != null) res.documentAppelOffre.Fichier_Document = Fichier_Document;
    const updatedDocument = await res.documentAppelOffre.save();
    res.json(updatedDocument);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', getDocumentAppelOffre, async (req, res) => {
    try {
      await DocumentAppelOffre.deleteOne({ _id: req.params.id });
      res.json({ message: 'Document Appel d\'Offre supprimé avec succès !' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
    

// Middleware to get a Document Appel d'Offre by ID
async function getDocumentAppelOffre(req, res, next) {
    try {
      const documentAppelOffre = await DocumentAppelOffre.findById(req.params.id);
      if (!documentAppelOffre) {
        return res.status(404).json({ message: 'Document Appel d\'Offre non trouvé !' });
      }
      res.documentAppelOffre = documentAppelOffre;
      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

module.exports = router;
