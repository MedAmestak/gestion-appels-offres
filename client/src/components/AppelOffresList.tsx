import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

interface AppelOffre {
  _id: string;
  Titre: string;
  Type_Appel_Offre: string;
  Categorie: string;
  User: string;
  Statut_Approbation: string;
   // Assuming there is a Category property in the AppelOffre interface
}

const AppelOffresList: React.FC = () => {
  const { user } = useUser();
  const [appelOffres, setAppelOffres] = useState<AppelOffre[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategorie, setSelectedCategorie] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');

  useEffect(() => {
    if (user) {
      // Fetch only approved and rejected Appels d'Offres
      axios
        .get<AppelOffre[]>('http://localhost:5000/appelsOffres', {
          params: {
            statutApprobation: ['Approuvé', 'Rejeté'],
          },
        })
        .then((response) => {
          setAppelOffres(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const filteredAppelOffres = appelOffres.filter(
    (appelOffre) =>
      appelOffre.Titre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategorie === '' || appelOffre.Categorie === selectedCategorie) &&
      (selectedType === '' || appelOffre.Type_Appel_Offre === selectedType)
  );

  const categories = ['Construction', 'Technologie de l\'information', 'Santé', 'Consultation'];
  const types = [
    'Appel d\'offre ouvert',
    'Appel d\'offre avec présélection',
    'Appel d\'offre restreint',
    'Concours',
    'Marché négocié avec publicité',
    'Marché négocié sans publicité',
    'Contrats et conventions de droit commun',
    'Concours architectural',
    'Consultation architecturale',
    'Consultation architecturale négociée'
  ];

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
      <h1 style={{ textAlign: 'center' }}>Liste des Appels d'Offres</h1>
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Rechercher des Appels d'Offres"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: '10px', marginRight: '20px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <select
          value={selectedCategorie}
          onChange={(e) => setSelectedCategorie(e.target.value)}
          style={{ padding: '10px', marginRight: '20px', borderRadius: '5px', border: '1px solid #ddd' }}
        >
          <option value="">Toutes les Catégories</option>
          {categories.map((categorie, index) => (
            <option value={categorie} key={index}>
              {categorie}
            </option>
          ))}
        </select>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
        >
          <option value="">Tous les Types</option>
          {types.map((type, index) => (
            <option value={type} key={index}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {filteredAppelOffres.map((appelOffre) => (
          <li
            key={appelOffre._id}
            style={{ border: '1px solid #eaeaea', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}
          >

            <Link to={`/appelsOffres/${appelOffre._id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <h3>
                {appelOffre.Titre} ({appelOffre.Type_Appel_Offre})
              </h3>
            </Link>
            <p>Ajouté par : {appelOffre.User}</p>
            {appelOffre.Statut_Approbation === 'Approuvé' && (
              <Link to={`/appelsOffres/${appelOffre._id}`} style={{ textDecoration: 'none', color: 'blue' }}>
                Détails
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppelOffresList;
