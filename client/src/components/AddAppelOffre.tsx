import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const AddAppelOffre: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  console.log('User:', user);

  const [typeAppelOffre, setTypeAppelOffre] = useState('');
  const [titre, setTitre] = useState('');
  const [expressionBesoin, setExpressionBesoin] = useState('');
  const [categorie, setCategorie] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) {
      console.error('User is not logged in.');
      return;
    }

    try {
      const newAppelOffre = {
        User: { username: user.username },
        Type_Appel_Offre: typeAppelOffre,
        Titre: titre,
        Expression_Besoin: expressionBesoin,
        Categorie: categorie,
        Statut_Approbation: 'En attente', // Set to "En attente"
      };

      const response = await axios.post('http://localhost:5000/appelsOffres', newAppelOffre);

      if (response.status === 201) {
        console.log('Appel d\'Offre added successfully:', response.data);
        navigate('/appelsOffres'); // Navigate to the appelsOffres list page
      }
    } catch (error) {
      console.error('Error adding Appel d\'Offre:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Add Appel d'Offre</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="typeAppelOffre" className="form-label">Type d'Appel d'Offre</label>
          <select
            className="form-select"
            id="typeAppelOffre"
            value={typeAppelOffre}
            onChange={(e) => setTypeAppelOffre(e.target.value)}
            required
          >
          <option value="">Sélectionnez un type</option>
    <option value="Appel d'offres ouvert">Appel d'offres ouvert</option>
    <option value="Appel d'offres avec présélection">Appel d'offres avec présélection</option>
    <option value="Appel d'offres restreint">Appel d'offres restreint</option>
    <option value="Concours">Concours</option>
    <option value="Marché négocié avec publicité">Marché négocié avec publicité</option>
    <option value="Marché négocié sans publicité">Marché négocié sans publicité</option>
    <option value="Contrats et conventions de droit commun">Contrats et conventions de droit commun</option>
    <option value="Concours architectural">Concours architectural</option>
    <option value="Consultation architecturale">Consultation architecturale</option>
    <option value="Consultation architecturale négociée">Consultation architecturale négociée</option>
  </select>
</div>
<div className="mb-3">
          <label htmlFor="categorie" className="form-label">Catégorie d'Appel d'Offre</label>
          <select
            className="form-select"
            id="categorie"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            required
          >
            <option value="">Sélectionnez une catégorie</option>
            <option value="Construction">Construction</option>
            <option value="Technologie de l'information">Technologie de l'information</option>
            <option value="Santé">Santé</option>
            <option value="Consultation">Consultation</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="titre" className="form-label">Titre</label>
          <input
            type="text"
            className="form-control"
            id="titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="expressionBesoin" className="form-label">Expression de Besoin</label>
          <textarea
            className="form-control"
            id="expressionBesoin"
            value={expressionBesoin}
            onChange={(e) => setExpressionBesoin(e.target.value)}
            required
          />
        </div>


        <button type="submit" className="btn btn-primary">Add Appel d'Offre</button>
      </form>
    </div>
  );
};

export default AddAppelOffre;