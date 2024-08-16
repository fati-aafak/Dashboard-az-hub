import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputField from 'components/fields/InputField';

const API_URL = 'https://driving-laraine-az-hub-0af57591.koyeb.app/api/';

const SignUp = () => {
  let initialFormData = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: ""
  }

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    try {
      const response = await axios.post(`${API_URL}registeruser`, {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password
      });
      navigate('/auth/sign-in', { state: { message: 'Inscription réussie. Veuillez vous connecter.' } });
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Une erreur est survenue');
      } else {
        setError('Une erreur est survenue');
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full px-2 mt-16 mb-16 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">S'inscrire</h4>
        <p className="ml-1 text-base text-gray-600 mb-9">Créez votre compte pour commencer !</p>
        
        <form onSubmit={handleSubmit}>
          <InputField
            variant="auth"
            extra="mb-3"
            label="Nom*"
            placeholder="John Doe"
            id="fullname"
            type="text"
            value={formData.fullname}
            onChange={handleChange}
          />
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="mail@exemple.com"
            id="email"
            type="email"
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
          <InputField
            variant="auth"
            extra="mb-3"
            label="Confirmer le mot de passe*"
            placeholder="Min. 8 caractères"
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button className="linear mt-2 w-full rounded-xl bg-[#662483] py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" type='submit'>
            S'inscrire
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">Déjà un compte ? <a href="/auth/sign-in" className="text-brand-500">Connectez-vous ici</a></p>
      </div>
    </div>
  );
};

export default SignUp;