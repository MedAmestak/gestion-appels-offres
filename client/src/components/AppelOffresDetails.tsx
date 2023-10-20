import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface AppelOffreDetail {
  _id: string;
  Type_Appel_Offre: string;
  Titre: string;
  Categorie: string;
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
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title mb-4 text-center">Appel Offre Details</h1>
          <div className="row mb-2">
            <div className="col-sm-4">
              <strong>Categorie: </strong>
            </div>
            <div className="col-sm-8">
              {appelOffre.Categorie}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-4">
              <strong>Type: </strong>
            </div>
            <div className="col-sm-8">
              {appelOffre.Type_Appel_Offre}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-4">
              <strong>Titre: </strong>
            </div>
            <div className="col-sm-8">
              {appelOffre.Titre}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-4">
              <strong>Expression de Besoin: </strong>
            </div>
            <div className="col-sm-8">
              {appelOffre.Expression_Besoin}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-4">
              <strong>Date de Création: </strong>
            </div>
            <div className="col-sm-8">
              {appelOffre.Date_Creation_Appel_Offre}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-4">
              <strong>Date de Validation: </strong>
            </div>
            <div className="col-sm-8">
              {appelOffre.Date_Validation_Appel_Offre || 'N/A'}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-4">
              <strong>Date de Publication: </strong>
            </div>
            <div className="col-sm-8">
              {appelOffre.Date_Publication || 'N/A'}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-4">
              <strong>Date d'Ouverture des Plis: </strong>
            </div>
            <div className="col-sm-8">
              {appelOffre.Date_Ouverture_Plis || 'N/A'}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-4">
              <strong>Statut d'Appel Offre: </strong>
            </div>
            <div className="col-sm-8">
              {appelOffre.Statut_Appel_Offre}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-4">
              <strong>Statut d'Approbation: </strong>
            </div>
            <div className="col-sm-8">
              {appelOffre.Statut_Approbation || 'N/A'}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-4">
              <strong>Added by: </strong>
            </div>
            <div className="col-sm-8">
              {appelOffre.User}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppelOffresDetails;
