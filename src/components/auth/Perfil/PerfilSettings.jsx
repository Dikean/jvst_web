//library
import React, { useState, useEffect } from "react";
import { UserApi } from "../../../services/UserApi";
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

// components
import Menu_perfil from "./Menu_perfil";

export default function PerfilSettings() {

  const navigate = useNavigate();
  const [Personals, setPersonal] = useState ([]);  
  const UserID = Cookies.get('User_id');
    
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    postal_code: "",
    about_me: "",
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validar que todos los campos estén llenos
    for (const key in formData) {
      if (!formData[key]) {
        Swal.fire({
          icon: 'error',
          title: 'Campos vacíos',
          text: 'Por favor, complete todos los campos antes de guardar.',
        });
        return; // Detener el envío del formulario si hay campos vacíos
      }
    }
  
    // Mostrar SweetAlert de carga
    Swal.fire({
      title: 'Cargando...',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
  
    try {
      const cambios = {}; // Objeto para almacenar los campos que han cambiado
  
      // Compara formData con Personals y agrega los campos cambiados al objeto cambios
      for (const key in formData) {
        if (formData[key] !== Personals[key]) {
          cambios[key] = formData[key];
        }
      }
  
      if (Object.keys(cambios).length === 0) {
        // No se han realizado cambios
        Swal.fire({
          icon: 'info',
          title: 'Sin cambios',
          text: 'No has realizado cambios para guardar.',
        });
        return;
      }
  
      const nuevosDatos = {
        date: new Date().toISOString(),
        users_id: UserID,
        name: formData.name,
        address: formData.address,
        postal_code: formData.postal_code,
        city: formData.city,
        country: formData.country,
        about_me: formData.about_me,
      };
  
      // Utiliza Axios para enviar la solicitud PUT al servidor
      const response = await UserApi.actualizarUsuario(UserID, nuevosDatos);
  
      // Ocultar el SweetAlert de carga
      Swal.close();
  
      Swal.fire({
        icon: 'success',
        title: 'Datos enviados!',
        text: 'Los datos se han enviado correctamente.',
        confirmButtonText: 'OK',
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al enviar',
        text: 'Ocurrió un error al enviar los datos.',
      });
    }
  };
  

      //Consumir la PAi y traer datos
 useEffect(() => {
  UserApi.obtenePorID(UserID)
  .then(response => {
    const dataArray = Object.values(response.data);

    if (Array.isArray(dataArray)) {
      setPersonal(response.data);
    } else {
      console.log("Usuario no tiene perfil");
      setPersonal([]); // Establecer documentos como un array vacío
    }
  })
  .catch(error => {
    console.error('Error al obtener documentos:', error);
  });

   }, [UserID]);


  return (
    <>

<Menu_perfil></Menu_perfil>

      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Información personal</h6>
            <button
              className="bg-blue-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              onClick={handleSubmit}
            >
              Guardar
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit}>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            informacion del usuario
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                   Nombre y apellido Completo
                  </label>
                  <input
                   value={formData.name} 
                   onChange={handleInputChange}
                   id="name"
                    type="text"
                    placeholder={Personals.name}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4 hidden">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Apellidos
                  </label>
                  <input
                   value="sdasdsa"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                 
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Contact Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Dirección
                  </label>
                  <input
                    placeholder={Personals.address}
                  value={formData.address}
                      onChange={handleInputChange}
                   id="address"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                 
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Ciudad
                  </label>
                  <input
                    placeholder={Personals.city}
                  value={formData.city}
                      onChange={handleInputChange}
                   id="city"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                   
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Pais
                  </label>
                  <input
                  value={formData.country}
                      onChange={handleInputChange}
                  id="country"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder={Personals.country}
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Postal Code
                  </label>
                  <input
                  value={formData.postal_code}
                    onChange={handleInputChange}
                    id="postal_code"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder={Personals.postal_code}
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              About Me
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    About me
                  </label>
                  <textarea
                  value={formData.about_me}
                      onChange={handleInputChange}
                  id="about_me"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder={Personals.about_me} 
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
