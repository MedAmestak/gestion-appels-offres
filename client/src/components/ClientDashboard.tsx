import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface AppelOffreDetail {
  _id: string;
  User: string;
  Type_Appel_Offre: string;
  Titre: string;
  Expression_Besoin: string;
  Categorie: string;
  Date_Creation_Appel_Offre: string;
  Date_Validation_Appel_Offre?: string;
  Date_Publication?: string;
  Date_Ouverture_Plis?: string;
  Statut_Approbation: string;
}

const ClientDashboard: React.FC = () => {
  const [clientAppelsOffres, setClientAppelsOffres] = useState<AppelOffreDetail[]>([]);

  useEffect(() => {
    const fetchClientAppelsOffres = async () => {
      try {
        // Retrieve the user ID and authentication token from local storage
        const userId = localStorage.getItem('userId');
        const authToken = localStorage.getItem('authToken');

        if (!authToken || !userId) {
          console.error('No authentication token or user ID found');
          return;
        }
        console.log('Retrieved authentication token:', authToken);
        console.log('Retrieved user ID:', userId);

        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };

        // Use the retrieved user ID in the API endpoint
        const response = await axios.get<AppelOffreDetail[]>(`http://localhost:5000/api/users/${userId}/clientDashboard`, config);
        setClientAppelsOffres(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchClientAppelsOffres();
  }, []);

  return (
    <div>
      <h1>Client Dashboard</h1>
      {clientAppelsOffres.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {clientAppelsOffres.map((appelOffre) => (
            <li key={appelOffre._id}>
              <div>User: {appelOffre.User}</div>
              <div>Type: {appelOffre.Type_Appel_Offre}</div>
              <div>Titre: {appelOffre.Titre}</div>
              <div>Expression de Besoin: {appelOffre.Expression_Besoin}</div>
              <div>Categorie: {appelOffre.Categorie}</div>
              <div>Date de Création: {appelOffre.Date_Creation_Appel_Offre}</div>
              <div>Date de Validation: {appelOffre.Date_Validation_Appel_Offre || 'N/A'}</div>
              <div>Date de Publication: {appelOffre.Date_Publication || 'N/A'}</div>
              <div>Date d'Ouverture des Plis: {appelOffre.Date_Ouverture_Plis || 'N/A'}</div>
              <div>Statut d'Approbation: {appelOffre.Statut_Approbation}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientDashboard;
