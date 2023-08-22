import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

interface AppelOffre {
  _id: string;
  Titre: string;
  Type_Appel_Offre: string;
  User: string;

}

const AppelOffresList: React.FC = () => {
  const { user } = useUser();
  const [appelOffres, setAppelOffres] = useState<AppelOffre[]>([]);

  useEffect(() => {
    if (user) { // Check if the user is logged in
      axios.get<AppelOffre[]>('http://localhost:5000/appelsOffres')
        .then(response => {
          setAppelOffres(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [user]); 

  if (!user) {
    return null; 
  }

  return (
    <div>
      <h1>List of Appel Offres</h1>
      <ul>
        {appelOffres.map(appelOffre => (
          <li key={appelOffre._id}>
            <Link to={`/appelsOffres/${appelOffre._id}`}>
              {appelOffre.Titre} ({appelOffre.Type_Appel_Offre}) <p>Added by: ({appelOffre.User})</p>
 

            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppelOffresList;
