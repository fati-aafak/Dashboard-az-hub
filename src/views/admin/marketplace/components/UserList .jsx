import React, { useState, useEffect, useCallback } from 'react';
import Card from 'components/card';
import { BASE_URL } from 'constants/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = {
  getUsers: () => axios.get(`${BASE_URL}/admin`),
  addUser: (user) => axios.post(`${BASE_URL}/admin`, user),
  deleteUser: (id) => axios.delete(`${BASE_URL}/admin/${id}`),
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({ fullname: '', email: '', password: '', role: 'Admin' });

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Une erreur est survenue lors du chargement des admins.');
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
      console.log('API response:', response.data);

      if (response.data && response.data.admin) {
        setUsers(prevUsers => [...prevUsers, response.data.admin]);
        setNewUser({ fullname: '', email: '', password: '', role: 'Admin' });
      } else {
        console.error('Unexpected API response structure:', response.data);
        setError('Unexpected response from server when adding user.');
      }

    } catch (error) {
      console.error('Error adding user:', error);
      setError(`Une erreur est survenue lors de l'ajout de l'utilisateur.`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      setLoading(true);
      await api.deleteUser(id);
      setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError(`Une erreur est survenue lors de la suppression de l'utilisateur.`);
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
      <div className="flex items-center justify-between rounded-t-3xl p-3">
        <div className="text-lg font-bold text-navy-700 dark:text-white">
          Utilisateurs Connectés
        </div>
        <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-[#662483] transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
          See all
        </button>
      </div>

      <div className="w-full overflow-x-scroll px-4 md:overflow-x-hidden">
        <table className="w-full min-w-[500px] overflow-x-scroll">
          <thead>
            <tr>
              <th className="py-3 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">Nom</th>
              <th className="py-3 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">Email</th>
              <th className="py-3 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">Rôle</th>
              <th className="py-3 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="py-3 text-sm">{user.fullname}</td>
                <td className="py-3 text-sm">{user.email}</td>
                <td className="py-3 text-sm">{user.role}</td>
                <td className="py-3 text-sm">
                  <button className="text-red-500" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">Ajouter un utilisateur</h2>
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            name="fullname"
            value={newUser.fullname}
            onChange={handleChange}
            placeholder="Nom"
            className="border rounded p-2"
          />
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            placeholder="Email"
            className="border rounded p-2"
          />
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
            placeholder="Password"
            className="border rounded p-2"
          />
          <input
            type="text"
            name="role"
            value={newUser.role}
            onChange={handleChange}
            placeholder="Rôle"
            className="border rounded p-2"
          />
          <button onClick={handleAddUser} className="bg-[#662483] text-white rounded p-2">Ajouter</button>
        </div>
      </div>
    </Card>
  );
};

export default UserList;