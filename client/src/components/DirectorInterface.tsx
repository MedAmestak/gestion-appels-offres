import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface AppelOffre {
  _id: string;
  Titre: string;
  Type_Appel_Offre: string;
  Categorie: string;
  User: string;
  Statut_Approbation: string;
}

const DirectorInterface: React.FC = () => {
  const [appelOffres, setAppelOffres] = useState<AppelOffre[]>([]);

  useEffect(() => {
    // Fetch the list of Appel Offres here
    axios.get<AppelOffre[]>('http://localhost:5000/appelsOffres')
      .then(response => {
        setAppelOffres(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await axios.put(`http://localhost:5000/appelsOffres/${id}`, {
        Statut_Approbation: newStatus
      });
      // Update the local state or refetch the list of Appel Offres
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Director Interface</h1>
      <ul>
        {appelOffres.map(appelOffre => (
          <li key={appelOffre._id}>
            <p>Titre: {appelOffre.Titre}</p>
            <p>Type: {appelOffre.Type_Appel_Offre}</p>
            <p>Type: {appelOffre.Categorie}</p>
            <p>Added by: {appelOffre.User}</p>
            <p>Statut: {appelOffre.Statut_Approbation}</p>
            {appelOffre.Statut_Approbation === 'En attente' && (
              <div>
                <button onClick={() => updateStatus(appelOffre._id, 'Approuvé')}>Approuver</button>
                <button onClick={() => updateStatus(appelOffre._id, 'Rejeté')}>Rejeter</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DirectorInterface;
