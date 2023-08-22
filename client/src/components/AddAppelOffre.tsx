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
  const [dateCreation, setDateCreation] = useState('');
  const [dateValidation, setDateValidation] = useState('');
  const [datePublication, setDatePublication] = useState('');
  const [dateOuverturePlis, setDateOuverturePlis] = useState('');
  const [statutAppelOffre, setStatutAppelOffre] = useState('');
  const [statutApprobation, setStatutApprobation] = useState('');

  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) {
      console.error('User is not logged in.');
      return;
    }
    try {
      console.log('Sending request:', {
        User: { username: user.username },
      });               

      console.log('User:', user);

      const response = await axios.post('http://localhost:5000/appelsOffres', {
        User: { username: user.username },
        Type_Appel_Offre: typeAppelOffre,
        Titre: titre,
        Expression_Besoin: expressionBesoin,
        Date_Creation_Appel_Offre: dateCreation,
        Date_Validation_Appel_Offre: dateValidation,
        Date_Publication: datePublication,
        Date_Ouverture_Plis: dateOuverturePlis,
        Statut_Appel_Offre: statutAppelOffre,
        Statut_Approbation: statutApprobation

      });

      if (response.status === 201) {
        console.log('Appel d\'Offre added successfully:', response.data);
        navigate('/appelsOffres'); // Navigate to the appelsOffres list page
      }
    } catch (error) {
      console.error('Error adding Appel d\'Offre:', error);
    }
  };

  return (
    <div>
      <h1>Add Appel d'Offre</h1>
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
        <div className="mb-3">
          <label htmlFor="dateCreation" className="form-label">Date de Création</label>
          <input
            type="date"
            className="form-control"
            id="dateCreation"
            value={dateCreation}
            onChange={(e) => setDateCreation(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dateValidation" className="form-label">Date de Validation</label>
          <input
            type="date"
            className="form-control"
            id="dateValidation"
            value={dateValidation}
            onChange={(e) => setDateValidation(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="datePublication" className="form-label">Date de Publication</label>
  <input
    type="date"
    className="form-control"
    id="datePublication"
    value={datePublication}
    onChange={(e) => setDatePublication(e.target.value)}
    required
  />
</div>
<div className="mb-3">
  <label htmlFor="dateOuverturePlis" className="form-label">Date d'Ouverture des Plis</label>
  <input
    type="date"
    className="form-control"
    id="dateOuverturePlis"
    value={dateOuverturePlis}
    onChange={(e) => setDateOuverturePlis(e.target.value)}
    required
  />
</div>
<div className="mb-3">
  <label htmlFor="statutAppelOffre" className="form-label">Statut de l'Appel d'Offre</label>
  <select
    className="form-select"
    id="statutAppelOffre"
    value={statutAppelOffre}
    onChange={(e) => setStatutAppelOffre(e.target.value)}
    required
  >
    <option value="">Sélectionnez un statut</option>
    <option value="Création">Création</option>
    <option value="Validation">Validation</option>
    <option value="Publication">Publication</option>

  </select>
</div>

<div className="mb-3">
  <label htmlFor="statutApprobation" className="form-label">Statut d'Approbation</label>
  <select
    className="form-select"
    id="statutApprobation"
    value={statutApprobation}
    onChange={(e) => setStatutApprobation(e.target.value)}
    required
  >
    <option value="">Sélectionnez un statut</option>
    <option value="En attente">En attente</option>
    <option value="Approuvé">Approuvé</option>
    <option value="Rejeté">Rejeté</option>
  </select>
</div>


        <button type="submit" className="btn btn-primary">Add Appel d'Offre</button>
      </form>
    </div>
  );
};

export default AddAppelOffre;
