// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const login = async (email, senha) => {
  const { data } = await api.post('/login', { email, senha });
  return data;
};

export const fetchUserProfile = async (token) => {
  const { data } = await api.get('/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
