import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from 'constants/config';

const API_BASE_URL = BASE_URL;

const OfferList = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/offre`);
      console.log('Offers fetched:', response.data);
      setOffers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des offres:', error);
      setError('Une erreur est survenue lors du chargement des offres.');
      setLoading(false);
    }
  };

  const handleAddOffer = () => {
    navigate('/admin/gestion-offres');
  };

  const handleDeleteOffer = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/offre/${id}`);
      fetchOffers();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'offre:', error);
      setError('Une erreur est survenue lors de la suppression de l\'offre.');
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="card w-[70rem] p-4">
      <div className="flex items-center justify-between p-3 rounded-t-3xl">
        <div className="text-lg font-bold text-navy-700 dark:text-white">
          Liste des Offres
        </div>
        <button
          onClick={handleAddOffer}
          className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20"
        >
          Ajouter une offre
        </button>
      </div>
      <div className="w-full px-4 overflow-x-scroll md:overflow-x-hidden">
        <table className="w-full min-w-[500px] overflow-x-scroll">
          <thead>
            <tr>
              <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">Titre</th>
              <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">Location</th>
              <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">Département</th>
              <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">Type de Contrat</th>
              <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer._id}>
                <td className="py-3 text-sm">{offer.title}</td>
                <td className="py-3 text-sm">{offer.location}</td>
                <td className="py-3 text-sm">{offer.departement}</td>
                <td className="py-3 text-sm">{offer.contract}</td>
                <td className="py-3 text-sm">
                  <button className="text-red-500" onClick={() => handleDeleteOffer(offer._id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OfferList;