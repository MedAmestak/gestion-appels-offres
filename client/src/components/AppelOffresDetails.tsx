import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface AppelOffreDetail {
  _id: string;
  Type_Appel_Offre: string;
  Titre: string;
  Expression_Besoin: string;
  Date_Creation_Appel_Offre: string;
  Date_Validation_Appel_Offre?: string;
  Date_Publication?: string;
  Date_Ouverture_Plis?: string;
  Statut_Appel_Offre: string;
  Statut_Approbation?: string;
  User: string;
}
          
const AppelOffresDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [appelOffre, setAppelOffre] = useState<AppelOffreDetail | null>(null);

  useEffect(() => {
    axios.get<AppelOffreDetail>(`http://localhost:5000/appelsOffres/${id}`)
      .then(response => {
        setAppelOffre(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  if (!appelOffre) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Appel Offre Details</h1>
      <div>
        <strong>Type: </strong>
        {appelOffre.Type_Appel_Offre}
      </div>
      <div>
        <strong>Titre: </strong>
        {appelOffre.Titre}
      </div>
      <div>
        <strong>Expression de Besoin: </strong>
        {appelOffre.Expression_Besoin}
      </div>
      <div>
        <strong>Date de Création: </strong>
        {appelOffre.Date_Creation_Appel_Offre}
      </div>
      <div>
        <strong>Date de Validation: </strong>
        {appelOffre.Date_Validation_Appel_Offre || 'N/A'}
      </div>
      <div>
        <strong>Date de Publication: </strong>
        {appelOffre.Date_Publication || 'N/A'}
      </div>
      <div>
        <strong>Date d'Ouverture des Plis: </strong>
        {appelOffre.Date_Ouverture_Plis || 'N/A'}
      </div>
      <div>
        <strong>Statut d'Appel Offre: </strong>
        {appelOffre.Statut_Appel_Offre}
      </div>
      <div>
        <strong>Statut d'Approbation: </strong>
        {appelOffre.Statut_Approbation || 'N/A'}
      </div>
      <div>
        <strong>Added by: </strong>
        {appelOffre.User}
      </div>
    </div>
  );
};

export default AppelOffresDetails;
