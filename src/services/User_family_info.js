// api/user_family_info
import axios from 'axios';
import { Apiurl } from './Auth';
const BASE_URL = Apiurl +'api'; // Cambia esto si tu base URL es diferente

export const User_family_info = {

  obtenerTodos: () => {
    return axios.get(`${BASE_URL}/family`);
  },

  obtenerPorId: (userId) => {
    return axios.get(`${BASE_URL}/family/${userId}/family`);
  },
  
  enviarDatos: (nuevosDatos) => {
    return axios.post(`${BASE_URL}/family`, nuevosDatos);
  },
  eliminarPorId: (userId) => {
    return axios.delete(`${BASE_URL}/family/${userId}`);
  },

  obtenerPorName: (name) => {
    return axios.get(`${BASE_URL}/family/byname/${name}`);
  },
};
