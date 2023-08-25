//  /api/user_medicine_info
import axios from 'axios';
import { Apiurl } from './Auth';
const BASE_URL = Apiurl + 'api';

export const User_contacto = {

  obtenerTodos: () => {
    return axios.get(`${BASE_URL}/contacts`);
  },

  obtenerPorId: (userId) => {
    return axios.get(`${BASE_URL}/contacts/${userId}/contacts`);
  },

  enviarDatos: (nuevosDatos) => {
    return axios.post(`${BASE_URL}/contacts`, nuevosDatos);
  },

  eliminarPorId: (userId) => {
    return axios.delete(`${BASE_URL}/contacts/${userId}`);
  },

  obtenerPorName: (name) => {
    return axios.get(`${BASE_URL}/contacts/byname/${name}`);
  },

};
