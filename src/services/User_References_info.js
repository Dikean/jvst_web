// api/user_references_info
import axios from 'axios';
import { Apiurl } from './Auth';
const BASE_URL = Apiurl +'api'; // Cambia esto si tu base URL es diferente

export const User_references_info = {

  obtenerTodos: () => {
    return axios.get(`${BASE_URL}/references`);
  },
  obtenerPorId: (userId) => {
    return axios.get(`${BASE_URL}/references/${userId}/references`);
  },
  enviarDatos: (nuevosDatos) => {
    return axios.post(`${BASE_URL}/references`, nuevosDatos);
  },

  eliminarPorId: (userId) => {
    return axios.delete(`${BASE_URL}/references/${userId}`);
  },

  obtenerPorName: (name) => {
    return axios.get(`${BASE_URL}/references/byname/${name}`);
  },
};
