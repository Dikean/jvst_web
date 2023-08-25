// api/usuarios
import axios from 'axios';
import { Apiurl } from './Auth';
const BASE_URL = Apiurl +'api'; // Cambia esto si tu base URL es diferente

export const UserApi = {

    // Nuevo método de inicio de sesión
  iniciarSesion: (credentials) => {
    const url = `${BASE_URL}/auth`; // Ajusta la URL para iniciar sesión en tu API
    return axios.post(url, credentials);
  },

    // Método PUT para actualizar información de usuario
    actualizarUsuario: (userId, userData) => {
      const url = `${BASE_URL}/users/${userId}`; // Ajusta la URL para actualizar un usuario específico en tu API
      return axios.put(url, userData);
    },

  registrarUsuario: (userData) => {
    const url = `${BASE_URL}/users`; // Ajusta la URL de registro en tu API
    return axios.post(url, userData);
  },

  recuperarContrasena: (email) => {
    const url = `${BASE_URL}/forgot-password`; // Cambia la URL según tu enpoint
    return axios.post(url, { email });
  },

  // obtener all users
  obtenerTodos: () => {
    return axios.get(`${BASE_URL}/users`);
  },

   // obtener  users por ID
   obtenePorID: (userId) => {
    return axios.get(`${BASE_URL}/users/${userId}`);
  },

   // obtener  users por ID
   obtenePorName: (Name) => {
    return axios.get(`${BASE_URL}/users/byname/${Name}`);
  },

  changeRol: (userId, newRole) => {
    const url = `${BASE_URL}/users/${userId}/change-role`;
    const requestData = { role: newRole }; // Create an object with the new role
    return axios.put(url, requestData); // Send the PUT request with the role data
  }
  


};