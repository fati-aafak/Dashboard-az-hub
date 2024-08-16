import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import InputField from 'components/fields/InputField';

const API_URL = 'https://driving-laraine-az-hub-0af57591.koyeb.app/api/';

const SignIn = () => {
  let initialFormData = {
    email: "",
    password: ""
  }

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
    }
  }, []);

  useEffect(() => {
    if (location.state && location.state.message) {
      setMessage(location.state.message);
    }
  }, [location]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}loginuser`, formData);
      localStorage.setItem('token', response.data.token);
      navigate('/admin');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Une erreur est survenue');
      } else {
        setError('Une erreur est survenue');
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full px-2 mt-16 mb-16 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">Se connecter</h4>
        <p className="ml-1 text-base text-gray-600 mb-9">Entrez votre email et votre mot de passe pour vous connecter !</p>
        
        {message && <p className="mb-4 text-green-500">{message}</p>}
        
        <form onSubmit={handleSubmit}>
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="mail@exemple.com"
            id="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            variant="auth"
            extra="mb-3"
            label="Mot de passe*"
            placeholder="Min. 8 caractères"
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" type="submit">
            Se connecter
          </button>
        </form>
        <div className="mt-4">
          <span className="text-sm font-medium text-navy-700 dark:text-gray-600">Pas encore inscrit ?</span>
          <a href="/auth/register" className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white">Créer un compte</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;