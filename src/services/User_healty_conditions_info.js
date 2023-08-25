// api/user_healthy_conditions_info
import axios from 'axios';
import { Apiurl } from './Auth';
const BASE_URL = Apiurl +'api'; // Cambia esto si tu base URL es diferente

export const User_healthy_conditions_info = {

  obtenerTodos: () => {
    return axios.get(`${BASE_URL}/healthy`);
  },

  obtenerPorName: (name) => {
    return axios.get(`${BASE_URL}/healthy/byname/${name}`);
  },

  obtenerPorId: (userId) => {
    return axios.get(`${BASE_URL}/healthy/${userId}/healthy`);
  },
  
  enviarDatos: (nuevosDatos) => {
    return axios.post(`${BASE_URL}/user_healthy_conditions_info`, nuevosDatos);
  },

     // Método PUT para actualizar información de usuario
     actualizarUsuario: (userId, userData) => {
      const url = `${BASE_URL}/users/${userId}/healthy`; // Ajusta la URL para actualizar un usuario específico en tu API
      return axios.put(url, userData);
    },
};
