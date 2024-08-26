import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from 'constants/config';

const API_BASE_URL = BASE_URL;

const PostulationList = () => {
  const [postulations, setPostulations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPostulations();
  }, []);

  const fetchPostulations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/application`);
      console.log('Postulations fetched:', response.data);
      setPostulations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des postulations:', error);
      setError('Une erreur est survenue lors du chargement des postulations.');
      setLoading(false);
    }
  };

  const handleDeletePostulation = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/application/${id}`);
      fetchPostulations();
    } catch (error) {
      console.error('Erreur lors de la suppression de la postulation:', error);
      setError('Une erreur est survenue lors de la suppression de la postulation.');
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="card w-[70rem] p-4">
      <div className="flex items-center justify-between p-3 rounded-t-3xl">
        <div className="text-lg font-bold text-navy-700 dark:text-white">
          Liste des Postulations
        </div>
      </div>
      <div className="w-full px-4 overflow-x-scroll md:overflow-x-hidden">
        <table className="w-full min-w-[500px] overflow-x-scroll">
          <thead>
            <tr>
              <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">Nom</th>
              <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">Prénom</th>
              <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">Email</th>
              <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">Telephone</th>
              <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">Offre</th>
              <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">CV</th>
              <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">Actions</th>
            </tr>
          </thead>
          <tbody>
            {postulations.map((postulation) => (
              <tr key={postulation._id}>
                <td className="py-3 text-sm">{postulation.nom}</td>
                <td className="py-3 text-sm">{postulation.prenom}</td>
                <td className="py-3 text-sm">{postulation.email}</td>
                <td className="py-3 text-sm">{postulation.phone}</td>
                <td className="py-3 text-sm">{postulation.offre}</td>
                <td className="py-3 text-sm">
                  <a href={postulation.cv} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Voir CV</a>
                </td>
                <td className="py-3 text-sm">
                  <button className="text-red-500" onClick={() => handleDeletePostulation(postulation._id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostulationList;