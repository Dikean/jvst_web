// api/consignments
import axios from 'axios';
import { Apiurl } from './Auth';
const BASE_URL = Apiurl +'api'; // Cambia esto si tu base URL es diferente

export const ConsignmentApi = {

  obtenerTodos: () => {
    return axios.get(`${BASE_URL}/amount`);
  },

  obtenerPorId: (userId) => {
    return axios.get(`${BASE_URL}/amount/${userId}/amount`);
  },

  obtenerPorName: (name) => {
    return axios.get(`${BASE_URL}/amount/user/${name}/amount`);
  },


  enviarDatos: (nuevosDatos) => {
    return axios.post(`${BASE_URL}/amount`, nuevosDatos);
  },

  eliminarPorId: (consignmentId) => {
    return axios.delete(`${BASE_URL}/amount/${consignmentId}`);
  },

  obtenerBancolombia: () => {
    return axios.get(`${BASE_URL}/amount/bancolombia/total`);
  },

  obtenerNequi: () => {
    return axios.get(`${BASE_URL}/amount/nequi/total`);
  },

  //monto por mes chart
  obtenerMontoporMes: async () => {
    return axios.get(`${BASE_URL}/amount`);
  },
  

  
  // Agrega más métodos aquí si es necesario
};