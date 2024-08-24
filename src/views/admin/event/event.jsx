import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'components/card';
import axios from 'axios';

const API_BASE_URL = 'https://driving-laraine-az-hub-0af57591.koyeb.app/api'; // Assurez-vous que c'est la bonne URL

const EventList = () => {
  const [actualites, setActualites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchActualites();
  }, []);

  const fetchActualites = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/actualite`);
      setActualites(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des actualités:', error);
      setError('Une erreur est survenue lors du chargement des actualités.');
      setLoading(false);
    }
  };

  const handleAddEvent = () => {
    navigate('/admin/data-tables'); 
  };

  const handleDeleteActualite = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/actualite/${id}`);
      fetchActualites(); 
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'actualité:', error);
      setError('Une erreur est survenue lors de la suppression de l\'actualité.');
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Card extra="w-[70rem] p-4">
      <div className="flex items-center justify-between p-3 rounded-t-3xl">
        <div className="text-lg font-bold text-navy-700 dark:text-white">
          Liste des Actualités et Événements
        </div>
        <button 
          onClick={handleAddEvent}
          className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20"
        >
          Ajouter une actualité/événement
        </button>
      </div>

      <div className="w-full px-4 overflow-x-scroll md:overflow-x-hidden">
        <table className="w-full min-w-[500px] overflow-x-scroll">
          <thead>
            <tr>
              <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">Titre</th>
              <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">Description</th>
              <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">Date</th>
              <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">Catégorie</th>
              <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">Actions</th>
            </tr>
          </thead>
          <tbody>
            {actualites.map((item) => (
              <tr key={item._id}>
                <td className="py-3 text-sm">{item.title}</td>
                <td className="py-3 text-sm">{item.description}</td>
                <td className="py-3 text-sm">{new Date(item.eventDate).toLocaleDateString()}</td>
                <td className="py-3 text-sm">{item.category}</td>
                <td className="py-3 text-sm">
                  <button className="text-red-500" onClick={() => handleDeleteActualite(item._id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default EventList;