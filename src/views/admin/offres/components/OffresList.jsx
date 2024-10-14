import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "constants/config";
import httpClient from "utils/httpClient";

const API_BASE_URL = BASE_URL;
const ITEMS_PER_PAGE = 10;

const OfferList = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOffers();
  }, [currentPage]);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      console.log("Fetching offers from:", `${API_BASE_URL}/offre`);
      console.log("With params:", { page: currentPage, limit: ITEMS_PER_PAGE });

      const response = await httpClient.get(`/offre`, {
        params: {
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        },
      });

      const fullResponse = await httpClient.get(`/offre`);

      console.log("Full API response:", fullResponse);
      console.log("Response data:", response.data);

      let offersData = [];
      if (response.data && Array.isArray(response.data)) {
        offersData = response.data;
      } else if (response.data && Array.isArray(response.data.offers)) {
        offersData = response.data.offers;
      } else {
        console.error("Unexpected data structure:", response.data);
      }

      console.log("Processed offers data:", offersData);

      setOffers(offersData);

      const total = fullResponse.data.length;
      console.log("Total offers:", total);
      const calculatedTotalPages = Math.max(
        1,
        Math.ceil(total / ITEMS_PER_PAGE)
      );
      console.log("Calculated total pages:", calculatedTotalPages);
      setTotalPages(calculatedTotalPages);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching offers:", error);
      console.error(
        "Error details:",
        error.response ? error.response.data : "No response data"
      );
      setError("Une erreur est survenue lors du chargement des offres.");
      setOffers([]);
      setTotalPages(1);
      setLoading(false);
    }
  };

  const handleAddOffer = () => {
    navigate("/admin/gestion-offres");
  };

  const handleDeleteOffer = async (id) => {
    try {
      await httpClient.delete(`/offre/${id}`);
      fetchOffers();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'offre:", error);
      setError("Une erreur est survenue lors de la suppression de l'offre.");
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="card w-[70rem] p-4">
      <div className="flex items-center justify-between p-3 rounded-t-3xl">
        <div className="text-lg font-bold text-navy-700 dark:text-white">
          Liste des Offres (Total: {offers.length})
        </div>
        <button
          onClick={handleAddOffer}
          className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-[#258585] transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20"
        >
          Ajouter une offre
        </button>
      </div>
      <div className="w-full px-4 overflow-x-scroll md:overflow-x-hidden">
        {offers.length > 0 ? (
          <table className="w-full min-w-[500px] overflow-x-scroll">
            <thead>
              <tr>
                <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">
                  Titre
                </th>
                <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">
                  Location
                </th>
                <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">
                  Département
                </th>
                <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">
                  Type de Contrat
                </th>
                <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer, index) => (
                <tr key={offer._id || index}>
                  <td className="py-3 text-sm">{offer.title || "N/A"}</td>
                  <td className="py-3 text-sm">{offer.location || "N/A"}</td>
                  <td className="py-3 text-sm">{offer.departement || "N/A"}</td>
                  <td className="py-3 text-sm">{offer.contract || "N/A"}</td>
                  <td className="py-3 text-sm">
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteOffer(offer._id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-4 text-center">Aucune offre disponible</div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Précédent
          </button>
          <span className="px-4 py-2 text-sm font-medium text-gray-700">
            Page {currentPage} sur {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 ml-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};

export default OfferList;
