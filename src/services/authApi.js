import axios from 'axios';

const API_URL = 'http://localhost:5001';

const api = axios.create({
  baseURL: API_URL,
});

//chekk
export const authApi = {
  checkUsername: async (username) => {
    const response = await api.get(`/users?username=${username}`);
    return response.data;
  },

//new
  createUser: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },
//e-m
  getUserByEmail: async (email) => {
    const response = await api.get(`/users?email=${email}`);
    return response.data;
  },

// refre-id-coll
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  }
};