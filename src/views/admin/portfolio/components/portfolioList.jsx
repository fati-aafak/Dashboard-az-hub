import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "constants/config";
import httpClient from "utils/httpClient";

const API_BASE_URL = BASE_URL;

const PortfolioList = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const response = await httpClient.get(`/portfolio`);
      console.log("Portfolios fetched:", response.data);
      setPortfolios(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des portfolios:", error);
      setError("Une erreur est survenue lors du chargement des portfolios.");
      setLoading(false);
    }
  };

  const handleAddPortfolio = () => {
    navigate("/admin/RTLDefault");
  };

  const handleDeletePortfolio = async (id) => {
    try {
      await httpClient.delete(`/portfolio/${id}`);
      fetchPortfolios();
    } catch (error) {
      console.error("Erreur lors de la suppression du portfolio:", error);
      setError("Une erreur est survenue lors de la suppression du portfolio.");
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="card w-[70rem] p-4">
      {" "}
      {/* Remplacez 'Card' par 'div' si 'Card' n'est pas défini */}
      <div className="flex items-center justify-between rounded-t-3xl p-3">
        <div className="text-lg font-bold text-navy-700 dark:text-white">
          Liste des Portfolios
        </div>
        <button
          onClick={handleAddPortfolio}
          className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20"
        >
          Ajouter un portfolio
        </button>
      </div>
      <div className="w-full overflow-x-scroll px-4 md:overflow-x-hidden">
        <table className="w-full min-w-[500px] overflow-x-scroll">
          <thead>
            <tr>
              <th className="py-3 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                Titre
              </th>
              <th className="py-3 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                Sous-titre
              </th>
              <th className="py-3 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                Description
              </th>
              <th className="py-3 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                Catégorie
              </th>
              <th className="py-3 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {portfolios.map((item) => (
              <tr key={item._id}>
                <td className="py-3 text-sm">{item.title}</td>
                <td className="py-3 text-sm">{item.subtitle}</td>
                <td className="py-3 text-sm">{item.description}</td>
                <td className="py-3 text-sm">{item.category}</td>
                <td className="py-3 text-sm">
                  <button
                    className="text-red-500"
                    onClick={() => handleDeletePortfolio(item._id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortfolioList;
