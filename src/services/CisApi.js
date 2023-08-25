//library
import Swal from 'sweetalert2'

// api/cis
import axios from 'axios';
import { Apiurl } from './Auth';
const BASE_URL = Apiurl +'api'; // Cambia esto si tu base URL es diferente

export const cisApi = {

  obtenerTodos: () => {
    return axios.get(`${BASE_URL}/file`);
  },

  eliminarCis: async (CisId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/file/${CisId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  obtenerPorName: (name) => {
    return axios.get(`${BASE_URL}/files/cis/user/${name}`);
  },


  enviarDatos: async (nuevosDatos) => {
      return axios.post(`${BASE_URL}/file`, nuevosDatos);
  },

  //por ID
  obtenerDocumentosCis: (userId) => {
    return axios.get(`${BASE_URL}/file/${userId}/file/cis`);
  },

  // all documents
    obtenerAllDocumentosCis: () => {
      return axios.get(`${BASE_URL}/files/cis`);
    },
  
  // Agrega más métodos aquí si es necesario
};