// api/user_info
import axios from 'axios';
import { Apiurl } from './Auth';
const BASE_URL = Apiurl +'api'; // Cambia esto si tu base URL es diferente

export const User_info = {

  obtenerTodos: () => {
    return axios.get(`${BASE_URL}/user_info`);
  },
  obtenerPorId: (userId) => {
    return axios.get(`${BASE_URL}/user_info/${userId}`);
  },
  enviarDatos: (nuevosDatos) => {
    return axios.post(`${BASE_URL}/user_info`, nuevosDatos);
  },
};
