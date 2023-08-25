
// api/cis
import axios from 'axios';
import { Apiurl } from './Auth';
const BASE_URL = Apiurl +'api'; // Cambia esto si tu base URL es diferente


export const DocumentsApi = {

  obtenerTodos: () => {
    return axios.get(`${BASE_URL}/files/documents`);
  },

  eliminarDocumento: async (documentId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/file/${documentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  obtenerPorName: (name) => {
    return axios.get(`${BASE_URL}/files/documents/user/${name}`);
  },

  eliminarAlldocumentFile: async (documentId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/file/${documentId}/files`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  obtenerPorId: (userId) => {
    return axios.get(`${BASE_URL}/file/${userId}/file`);
  },

  enviarDatos: async (nuevosDatos) => {
      return axios.post(`${BASE_URL}/file`, nuevosDatos);

  },

  obtenerDocumentosFile: (userId) => {
    return axios.get(`${BASE_URL}/file/${userId}/files`);
  },

  // Agrega más métodos aquí si es necesario
};