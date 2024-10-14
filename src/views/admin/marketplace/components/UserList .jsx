import React, { useState, useEffect, useCallback } from "react";
import Card from "components/card";
import { BASE_URL } from "constants/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import httpClient from "utils/httpClient";

const api = {
  getUsers: () => httpClient.get(`/admin`),
  addUser: (user) => httpClient.post(`/admin`, user),
  deleteUser: (id) => httpClient.delete(`/admin/${id}`),
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "Admin",
  });

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Une erreur est survenue lors du chargement des admins.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = async () => {
    try {
      setLoading(true);
      const response = await api.addUser(newUser);
      console.log("API response:", response.data);

      if (response.data && response.data.admin) {
        setUsers((prevUsers) => [...prevUsers, response.data.admin]);
        setNewUser({ fullname: "", email: "", password: "", role: "Admin" });
      } else {
        console.error("Unexpected API response structure:", response.data);
        setError("Unexpected response from server when adding user.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      setError(`Une erreur est survenue lors de l'ajout de l'utilisateur.`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      setLoading(true);
      await api.deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(
        `Une erreur est survenue lors de la suppression de l'utilisateur.`
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <Card extra={"mt-3 !z-5 overflow-hidden w-[70rem]"}>
      <div className="flex items-center justify-between p-3 rounded-t-3xl">
        <div className="text-lg font-bold text-navy-700 dark:text-white">
          Utilisateurs Connectés
        </div>
        <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-[#f06739] transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
          Voir plus
        </button>
      </div>

      <div className="w-full px-4 overflow-x-scroll md:overflow-x-hidden">
        <table className="w-full min-w-[500px] overflow-x-scroll">
          <thead>
            <tr>
              <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">
                Nom
              </th>
              <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">
                Email
              </th>
              <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">
                Rôle
              </th>
              <th className="py-3 tracking-wide text-gray-600 uppercase text-start sm:text-xs lg:text-xs">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="py-3 text-sm">{user.fullname}</td>
                <td className="py-3 text-sm">{user.email}</td>
                <td className="py-3 text-sm">{user.role}</td>
                <td className="py-3 text-sm">
                  <button
                    className="text-red-500"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">
          Ajouter un utilisateur
        </h2>
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            name="fullname"
            value={newUser.fullname}
            onChange={handleChange}
            placeholder="Nom"
            className="p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
            placeholder="Password"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="role"
            value={newUser.role}
            onChange={handleChange}
            placeholder="Rôle"
            className="p-2 border rounded"
          />
          <button
            onClick={handleAddUser}
            className="rounded bg-[#f06739] p-2 text-white"
          >
            Ajouter
          </button>
        </div>
      </div>
    </Card>
  );
};

export default UserList;
