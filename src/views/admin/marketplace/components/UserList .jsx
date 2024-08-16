import React, { useState } from 'react';
import Card from 'components/card';

const UserList = () => {
  const [users, setUsers] = useState([
    { name: "John Doe", email: "john@example.com", status: "Online", role: "Admin" },
    { name: "Jane Smith", email: "jane@example.com", status: "Offline", role: "User" },
    { name: "Sam Johnson", email: "sam@example.com", status: "Online", role: "Moderator" },
    { name: "Chris Lee", email: "chris@example.com", status: "Online", role: "User" },
    { name: "Alex Brown", email: "alex@example.com", status: "Offline", role: "Admin" },
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '', status: 'Offline', role: 'User' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    setUsers([...users, newUser]);
    setNewUser({ name: '', email: '', status: 'Offline', role: 'User' });
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <Card extra={"mt-3 !z-5 overflow-hidden w-[70rem]"}>
      <div className="flex items-center justify-between rounded-t-3xl p-3">
        <div className="text-lg font-bold text-navy-700 dark:text-white">
          Utilisateurs Connectés
        </div>
        <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
          See all
        </button>
      </div>

      <div className="w-full  overflow-x-scroll px-4 md:overflow-x-hidden">
        <table className="w-full min-w-[500px] overflow-x-scroll">
          <thead>
            <tr>
              <th className="py-3 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">Nom</th>
              <th className="py-3 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">Email</th>
              <th className="py-3 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">Statut</th>
              <th className="py-3 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">Rôle</th>
              <th className="py-3 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="py-3 text-sm">{user.name}</td>
                <td className="py-3 text-sm">{user.email}</td>
                <td className="py-3 text-sm">{user.status}</td>
                <td className="py-3 text-sm">{user.role}</td>
                <td className="py-3 text-sm">
                  <button className="text-red-500" onClick={() => handleDeleteUser(index)}>Delete</button>
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
            name="name"
            value={newUser.name}
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
          <select
            name="status"
            value={newUser.status}
            onChange={handleChange}
            className="border rounded p-2"
          >
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
          <input
            type="text"
            name="role"
            value={newUser.role}
            onChange={handleChange}
            placeholder="Rôle"
            className="border rounded p-2"
          />
          <button onClick={handleAddUser} className="bg-blue-500 text-white rounded p-2">Ajouter</button>
        </div>
      </div>
    </Card>
  );
};

export default UserList;
