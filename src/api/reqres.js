import axios from 'axios';

const API = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    'x-api-key': 'reqres-free-v1',
  },
});

export const login = (credentials) => API.post('/login', credentials);
export const getUsers = (page = 1) => API.get(`/users?page=${page}`);
export const getUser = (id) => API.get(`/users/${id}`);
export const createUser = (user) => API.post('/users', user);
export const updateUser = (id, user) => API.put(`/users/${id}`, user);
export const deleteUser = (id) => API.delete(`/users/${id}`);
