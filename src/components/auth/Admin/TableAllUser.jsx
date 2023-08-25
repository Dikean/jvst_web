'use client';
import React, { useState, useEffect } from 'react';
import { Tabs } from 'flowbite-react';
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';

//apis
import {UserApi} from '../../../services/UserApi'
import { User_references_info } from '../../../services/User_References_info';
import { User_family_info } from '../../../services/User_family_info';
import { User_healthy_conditions_info } from '../../../services/User_healty_conditions_info';
import { User_contacto } from '../../../services/User_contacto';

//library
import Swal from 'sweetalert2'
import { Pagination } from 'flowbite-react';

function TableAllUser({ valorProp }) {

     //Hook usuarios y editando
   const [usuarios, setUsuarios] = useState([]);
   const [usuariosByName, setUsuariosByName] = useState([]);
    const usuariosPorPagina = 10;
    const [currentPage, setCurrentPage] = useState(1);
  
     // Calculate the total number of pages based on the items per page
    const pageCount = Math.ceil(usuarios.length / usuariosPorPagina);

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * usuariosPorPagina;
    const endIndex = startIndex + usuariosPorPagina;
 
    // Get the consignations for the current page
    const usuariosdataPaginaActual = usuarios.slice(startIndex, endIndex);
  
    // Function to handle page change
    const handlePageChange = (page) => {
    setCurrentPage(page);
    };


//Hook contacto
const [contacts, setContact] = useState([]);
const [ContactByName, setContactByName] = useState([]);
const contactsPorPagina = 10;
const [currentPagecontacts, setCurrentPagecontacts] = useState(1);

 // Calculate the total number of pages based on the items per page
const pageCountcontacts = Math.ceil(contacts.length / contactsPorPagina);

// Calculate the start and end indices for the current page
const startIndexcontacts = (currentPagecontacts - 1) * contactsPorPagina;
const endIndexcontacts = startIndexcontacts + contactsPorPagina;

// Get the consignations for the current page
const contactsdataPaginaActual = contacts.slice(startIndexcontacts, endIndexcontacts);

// Function to handle page change
const handlePageChangecontacts = (page) => {
    setCurrentPagecontacts(page);
};

//Hook healty
const [healtys, setHealtys] = useState([]);

const [healtystByName, setHealtystByName] = useState([]);
const healtysPorPagina = 10;
const [currentPagehealtys, setCurrentPagehealtys] = useState(1);

 // Calculate the total number of pages based on the items per page
const pageCounthealtys = Math.ceil(healtys.length / healtysPorPagina);

// Calculate the start and end indices for the current page
const startIndexhealtys = (currentPagehealtys - 1) * healtysPorPagina;
const endIndexhealtys= startIndexhealtys + healtysPorPagina;

// Get the consignations for the current page
const healtysdataPaginaActual = healtys.slice(startIndexhealtys, endIndexhealtys);

// Function to handle page change
const handlePageChangehealtys = (page) => {
    setCurrentPagehealtys(page);
};

//Hook family
const [familys, setFamily] = useState([]);
const [familystByName, setFamilystByName] = useState([]);
const familysPorPagina = 10;
const [currentPagefamilys, setCurrentPagefamilys] = useState(1);

 // Calculate the total number of pages based on the items per page
const pageCountfamilys = Math.ceil(familys.length / familysPorPagina);

// Calculate the start and end indices for the current page
const startIndexfamilys = (currentPagefamilys - 1) * familysPorPagina;
const endIndexfamilys= startIndexfamilys + familysPorPagina;

// Get the consignations for the current page
const familysdataPaginaActual = familys.slice(startIndexfamilys, endIndexfamilys);

// Function to handle page change
const handlePageChangefamilys = (page) => {
    setCurrentPagefamilys(page);
};



//Hook references
const [references_info, setReferences_info] = useState([]);
const [references_infoByName, setReferences_infoByName] = useState([]);

const references_infoPorPagina = 10;
const [currentPagereferences_info, setCurrentPagereferences_info] = useState(1);

 // Calculate the total number of pages based on the items per page
const pageCountreferences_info = Math.ceil(references_info.length / references_infoPorPagina);

// Calculate the start and end indices for the current page
const startIndexreferences_info = (currentPagereferences_info - 1) * references_infoPorPagina;
const endIndexreferences_info= startIndexreferences_info + references_infoPorPagina;

// Get the consignations for the current page
const references_infodataPaginaActual = references_info.slice(startIndexreferences_info, endIndexreferences_info);

// Function to handle page change
const handlePageChangereferences_info = (page) => {
    setCurrentPagereferences_info(page);
};


 //Modal Usuarios All
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedUsuario, setSelectedUsuario] = useState(null);
 const [newRole, setNewRole] = useState('');
 const [IdnewRole, setIdNewRole] = useState('');

  const handleEditUsuario = (usuario) => {
    setSelectedUsuario(usuario);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //change rol
  const handleChangeRole = (e) => {
    const userIdToUpdate = selectedUsuario.id; // Replace with the actual user ID
  
    UserApi.changeRol(userIdToUpdate, newRole)
      .then(response => {
        Swal.fire(
            'Beun trabajo!',
            'You clicked the button!',
            'success'
          )
        console.log('Role updated successfully:', response.data);
      })
      .catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al actualizar rol!',
          })
        console.error('Error updating role:', error);
      });
  };
  

 useEffect(() => {

    //obtener all UsUARIO
      async function obtenerTodos() {
        try {
           let response;
          
           if (valorProp) {
             // Si valorProp tiene un valor, realiza la búsqueda filtrada
             response = await UserApi.obtenePorName(valorProp);
             console.log('array2' + response.data);
             setUsuariosByName(response.data);
           } else {
             // Si valorProp está vacío, obtén todas las consignaciones sin filtrar
             response = await UserApi.obtenerTodos();
           }
          setUsuarios(response.data);
         } catch (error) {
           console.error("Error al obtener consignaciones", error);
         }
       }
    

     //obtener contactos de emergency
     async function obtenerContactos() {
        try {
          let response;
          
          if (valorProp) {
            // Si valorProp tiene un valor, realiza la búsqueda filtrada
            response = await User_contacto.obtenerPorName(valorProp);
     
            setContactByName(response.data);
          } else {
            // Si valorProp está vacío, obtén todas las consignaciones sin filtrar
            response = await User_contacto.obtenerTodos();
          }
          
          setContact(response.data);
        } catch (error) {
          console.error("Error al obtener consignaciones", error);
        }
      }
  
          //obtener healty
      async function obtenerHealty() {
        try {
          let response;
          
          if (valorProp) {
            // Si valorProp tiene un valor, realiza la búsqueda filtrada
            response = await User_healthy_conditions_info.obtenerPorName(valorProp);
          
            setHealtystByName(response.data);
          } else {
            // Si valorProp está vacío, obtén todas las consignaciones sin filtrar
            response = await User_healthy_conditions_info.obtenerTodos();
          }
          
          setHealtys(response.data);
        } catch (error) {
          console.error("Error al obtener consignaciones", error);
        }
      }
  

        //obtener family
      async function obtenerFamily() {
        try {
          let response;
          
          if (valorProp) {
            // Si valorProp tiene un valor, realiza la búsqueda filtrada
            response = await User_family_info.obtenerPorName(valorProp);
       
            setFamilystByName(response.data);
          } else {
            // Si valorProp está vacío, obtén todas las consignaciones sin filtrar
            response = await User_family_info.obtenerTodos();
          }
          
          setFamily(response.data);
        } catch (error) {
          console.error("Error al obtener consignaciones", error);
        }
      }

           //obtener refrencias
      async function obtenerReference() {
        try {
          let response;
          
          if (valorProp) {
            // Si valorProp tiene un valor, realiza la búsqueda filtrada
            response = await User_references_info.obtenerPorName(valorProp);
            setReferences_infoByName(response.data);
          } else {
            // Si valorProp está vacío, obtén todas las consignaciones sin filtrar
            response = await User_references_info.obtenerTodos();
          }
          
          setReferences_info(response.data);
        } catch (error) {
          console.error("Error al obtener consignaciones", error);
        }
      }

      
       obtenerTodos();
       obtenerContactos();
       obtenerHealty();
       obtenerFamily();
       obtenerReference();
       

  }, [valorProp]);

  //Modal
  

  return (
    <>
<Tabs.Group
     className="flex justify-center"
    >

    <Tabs.Item 
    className=""
    icon={() => (
        <span className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
        
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>

        </span>
      )}
>

<div className="flex items-center justify-center">
  <div className="bg-blue-500 p-2 rounded-lg shadow-md">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>
  </div>
  <h1 className="p-5 font-bold text-xl">Usuarios </h1>
</div>

      {/* <!-- component --> */}
<section className="container px-4 mx-auto mb-5">
  

  <div className="flex flex-col mt-6">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                              <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  <button className="flex items-center gap-x-3 focus:outline-none">
                                      <span>id</span>

                                      <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                          <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                          <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                                      </svg>
                                  </button>
                              </th>

                              <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  Nombre
                              </th>

                              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  coreo
                              </th>

                              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Rol</th>

                              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                Fecha
                              </th>

                              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                Acciones
                              </th>
                          </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {usuariosdataPaginaActual.map((usuario) => (
                          <tr key={usuario.id}>
                              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                      <h2 className="font-medium text-gray-800 dark:text-white ">{usuario.id}</h2>
                                   </div>
                              </td>
                              <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                  <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                  {usuario.name}
                                  </div>
                              </td>
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <div>
                                     <p className="text-gray-500 dark:text-gray-400">{usuario.email}</p>
                                  </div>
                              </td>

                              
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <div>
                                      <h4 class="text-gray-700 dark:text-gray-200">{usuario.role}</h4>
                                      </div>
                              </td>

                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <div>
                                      <h4 className="text-gray-700 dark:text-gray-200">{usuario.date}</h4>
                                 </div>
                              </td>

                              <td className="px-6 py-4">
            <a x-data="{ tooltip: 'Edite' }"      onClick={() => handleEditUsuario(usuario)} >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6"
                x-tooltip="tooltip"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </a>
                               </td>
                          </tr>
                           ))}

                                                             {/* Mostar si no encuentra el nombre */}
    {usuariosdataPaginaActual.length === 0 && (
    <tr>
      <td colSpan="6" className="px-4 py-4 text-sm font-medium whitespace-nowrap">
      No se encontraron Documentos para el usuario "{valorProp}". Escriba el nombre del usuario completo de la persona a buscar
      </td>
    </tr>
  )}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  </div>

  <Pagination
          className="m-5"
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={pageCount}
        />

</section>

{/* Modal Start */}
{isModalOpen && (
<div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" >
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
  <div className="fixed inset-0 z-10 overflow-y-auto" >
     {/* Start Form */}
<div className="flex items-center justify-center p-12">

  <div className="mx-auto w-full max-w-[550px] bg-white">


  <form
      className="py-6 px-9"
    >
      


        {/* Name */}
      <div className="mb-5">
        <label
          for="email"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
        Nombre
        </label>
        <input
          type="text"
          id="nombre"
          value={selectedUsuario.name}
          readOnly
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
       {/* email */}
      <div className="mb-5">
        <label
          for="email"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
          Correo:
        </label>
        <input
          type="email"
          id="correo"
          value={selectedUsuario.email}
          readOnly
       
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
        {/* rol */}
        <div className="mb-5">
        <label
          for="email"
          className="mb-3 block text-base font-medium text-[#07074D]"
        >
         rol:
        </label>

        <input
           type="text"
           id="rol"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          placeholder={selectedUsuario.role}
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div>
   
         {/* Send */}
       

        <button onClick={handleChangeRole}
          className="mt-5 hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
        >
          Guardar
        </button>

        <button onClick={closeModal}
        className="mt-5 hover:shadow-form w-full rounded-md bg-[#ff200d] py-3 px-8 text-center text-base font-semibold text-white outline-none"
         >
         Cerrar
       </button>

      </div>
    </form>
  </div>
</div>

     {/* End form */}
  </div>
</div>
       )}      
              {/* End Chart */}
    </Tabs.Item>

      <Tabs.Item 
        icon={() => (
            <span className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
</svg>

    
            </span>
          )}>
            
<div className="flex items-center justify-center">
  <div className="bg-blue-500 p-2 rounded-lg shadow-md">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
</svg>
  </div>
  <h1 className="p-5 font-bold text-xl">Datos usuarios </h1>
</div>

          {/* <!-- component --> */}
<section class="container px-4 mx-auto mb-5">
  


  <div class="flex flex-col mt-6">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead class="bg-gray-50 dark:bg-gray-800">
                          <tr>
                              <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  <button class="flex items-center gap-x-3 focus:outline-none">
                                      <span>id</span>

                                      <svg class="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                          <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                          <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                                      </svg>
                                  </button>
                              </th>

                              <th scope="col" class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  Nombre
                              </th>

                              <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  Apellido
                              </th>

                              
                              <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  phone
                              </th>

                              <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  Direccion
                              </th>

                              <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  City
                              </th>

                              <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  Pais
                              </th>

                              <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  post code
                              </th>


                              <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  about me
                              </th>

                             
                           
                              <th scope="col" class="relative py-3.5 px-4">
                                  <span class="sr-only">Edit</span>
                              </th>
                          </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {usuariosdataPaginaActual.map(usuario => (
                          <tr  key={usuario.id}>
                              <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                      <h2 class="font-medium text-gray-800 dark:text-white ">{usuario.id}</h2>
                                   </div>
                              </td>
                              <td class="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                  <div class="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                  {usuario.name}
                                  </div>
                              </td>
                              <td class="px-4 py-4 text-sm whitespace-nowrap">
                                  <div>
                                      <p class="text-gray-500 dark:text-gray-400">{usuario.lastname}</p>
                                  </div>
                              </td>

                              <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                      <h2 class="font-medium text-gray-800 dark:text-white ">{usuario.phone}</h2>
                                   </div>
                              </td>

                              <td class="px-4 py-4 text-sm whitespace-nowrap">
                                 <p class="text-sm font-normal text-gray-600 dark:text-gray-400">{usuario.address}</p>
                                  
                              </td>


                              <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                     <p class="text-sm font-normal text-gray-600 dark:text-gray-400">{usuario.city}</p>
                                  </div>
                              </td>

                              <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                       <p class="text-sm font-normal text-gray-600 dark:text-gray-400">{usuario.country}</p>
                                  </div>
                              </td>

                              <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                      <p class="text-sm font-normal text-gray-600 dark:text-gray-400">{usuario.postal_code}</p>
                                  </div>
                              </td>

                            

                              <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                      <p class="text-sm font-normal text-gray-600 dark:text-gray-400">{usuario.about_me}</p>
                                  </div>
                              </td>

                          

                          </tr>

                      ))}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  </div>

  <Pagination
          className="m-5"
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={pageCount}
        />

</section>
          
              {/* End Chart */}
      </Tabs.Item>

      {/* Contactos de Emergencia */}
      <Tabs.Item 
           icon={() => (
            <span className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">   
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
           <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
           </svg>
            </span>
          )}>

 {/* Separador */}
 <div className="flex items-center justify-center">
  <div className="bg-blue-500 p-2 rounded-lg shadow-md">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
</svg>
  </div>
  <h1 className="p-5 font-bold text-xl">Contactos de Emergencia</h1>
</div>

    {/* end Separador */}

         {/* <!-- component --> */}
<section class="container px-4 mx-auto mb-5">
  



    <div class="flex flex-col mt-6">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead class="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <button class="flex items-center gap-x-3 focus:outline-none">
                                        <span>id</span>

                                        <svg class="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                            <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                            <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                                        </svg>
                                    </button>
                                </th>

                                <th scope="col" class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Nombre del contacto
                                </th>

                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Correo del contacto
                                </th>

                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Celular del contacto
                                </th>

                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Usurio
                                </th>

                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                         
                        {contactsdataPaginaActual.map(contact => (
                            <tr key={contact.id}>
                                <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                    <div>
                                        <h2 class="font-medium text-gray-800 dark:text-white ">{contact.id}</h2>
                                     </div>
                                </td>
                                <td class="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                    <div class="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                    {contact.name_emergency_contact}
                                    </div>
                                </td>
                                <td class="px-4 py-4 text-sm whitespace-nowrap">
                                    <div>
                                        <p class="text-gray-500 dark:text-gray-400">{contact.name_emergency_contact}</p>
                                    </div>
                                </td>
                                <td class="px-4 py-4 text-sm whitespace-nowrap">
                                <div>
                                        <p class="text-gray-500 dark:text-gray-400">{contact.phone_emergency_contact}</p>
                                    </div>
                                </td>

                                <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                    <div>
                                        <h2 class="font-medium text-gray-800 dark:text-white ">{contact.user_name}</h2>
                                       </div>
                                </td>
                            </tr>
                               ))}
                                 {/* Mostar si no encuentra el nombre */}
    {contactsdataPaginaActual.length === 0 && (
    <tr>
      <td colSpan="6" class="px-4 py-4 text-sm font-medium whitespace-nowrap">
      No se encontraron contactos de emergencia para el nombre "{valorProp}". Escriba el nombre completo de la persona a buscar
      </td>
    </tr>
  )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <Pagination
          className="m-5"
          currentPage={currentPagecontacts}
          onPageChange={handlePageChangecontacts}
          totalPages={pageCountcontacts}
        />
</section>
            
                {/* End Chart */}
      </Tabs.Item>

      <Tabs.Item 
        icon={() => (
            <span className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
</svg>


    
            </span>
          )}>


 {/* Separador */}
 <div className="flex items-center justify-center">
  <div className="bg-blue-500 p-2 rounded-lg shadow-md">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
</svg>
  </div>
  <h1 className="p-5 font-bold text-xl">Condición de salud </h1>
</div>

    {/* end Separador */}

         {/* <!-- component --> */}
<section class="container px-4 mx-auto mb-5">
  
    <div class="flex flex-col mt-6">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead class="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <button class="flex items-center gap-x-3 focus:outline-none">
                                        <span>id</span>

                                        <svg class="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                            <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                            <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                                        </svg>
                                    </button>
                                </th>

                                <th scope="col" class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Alergia
                                </th>

                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Enfermedad
                                </th>

                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    PrescripcionMedica
                                </th>
        
                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Incapacidad
                                </th>
 
                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Restriccion Alimenticia
                                </th>
                                
                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Usuario
                                </th>

                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                           
                        {healtysdataPaginaActual.map(healty => (
                            <tr key={healty.id}> 
                                <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                    <div>
                                        <h2 class="font-medium text-gray-800 dark:text-white ">{healty.id}</h2>
                                      </div>
                                </td>
                                <td class="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                <div>
                                         <p class="text-gray-500 dark:text-gray-400">{healty.alergia}</p>
                                    </div>
                                </td>
                                <td class="px-4 py-4 text-sm whitespace-nowrap">
                                    <div>
                                         <p class="text-gray-500 dark:text-gray-400">{healty.enfermedad}</p>
                                    </div>
                                </td>
                              
                                <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                    <div>
                                        <p class="text-sm font-normal text-gray-600 dark:text-gray-400">{healty.prescripcionMedica}</p>
                                    </div>
                                </td>

                                <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                    <div>
                                        <p class="text-sm font-normal text-gray-600 dark:text-gray-400">{healty.incapacidad}</p>
                                    </div>
                                </td>

                                <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                    <div>
                                        <p class="text-sm font-normal text-gray-600 dark:text-gray-400">{healty.restriccionAlimenticia}</p>
                                    </div>
                                </td>

                                <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                    <div>
                                        <h2 class="font-medium text-gray-800 dark:text-white ">{healty.user_name}</h2>
                                     </div>
                                </td>
                            </tr>
                            ))}
                                                           {/* Mostar si no encuentra el nombre */}
    {healtysdataPaginaActual.length === 0 && (
    <tr>
      <td colSpan="6" class="px-4 py-4 text-sm font-medium whitespace-nowrap">
      No se encontraron condiciones de salud para el nombre "{valorProp}". Escriba el nombre completo de la persona a buscar
      </td>
    </tr>
  )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <Pagination
          className="m-5"
          currentPage={currentPagehealtys}
          onPageChange={handlePageChangehealtys}
          totalPages={pageCounthealtys}
        />

</section>
            
                {/* End Chart */}
      </Tabs.Item>

      <Tabs.Item 
        icon={() => (
            <span className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
</svg>

            </span>
          )}>


 {/* Separador */}
 <div className="flex items-center justify-center">
  <div className="bg-blue-500 p-2 rounded-lg shadow-md">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
</svg>
  </div>
  <h1 className="p-5 font-bold text-xl">Familia </h1>
</div>

    {/* end Separador */}

          {/* <!-- component --> */}
<section class="container px-4 mx-auto mb-5">
  



  <div class="flex flex-col mt-6">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead class="bg-gray-50 dark:bg-gray-800">
                          <tr>
                              <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  <button class="flex items-center gap-x-3 focus:outline-none">
                                      <span>id</span>

                                      <svg class="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                          <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                          <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                                      </svg>
                                  </button>
                              </th>

                              <th scope="col" class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  Nombre
                              </th>

                              <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  Documento
                              </th>

                              <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  Relacion
                              </th>

                              <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  Fecha de Nacimiento
                              </th>

                              <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  Edad
                              </th>

                              <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  Usuario
                              </th>
                          </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {familysdataPaginaActual.map(family => (
                      
                          <tr key={family.id}>
                              <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                      <h2 class="font-medium text-gray-800 dark:text-white ">{family.id}</h2>
                                     </div>
                              </td>
                              <td class="px-12 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                     <p class="text-gray-500 dark:text-gray-400">{family.name_family}</p>
                                  </div>
                              </td>
                              <td class="px-4 py-4 text-sm whitespace-nowrap">
                                  <div>
                                      <h4 class="text-gray-700 dark:text-gray-200">{family.document_family}</h4>
                                     </div>
                              </td>
                              <td class="px-4 py-4 text-sm whitespace-nowrap">
                              <div>
                                 <p class="text-gray-500 dark:text-gray-400">{family.relationship_family}</p>
                                  </div>
                              </td>


                              <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                      <p class="text-sm font-normal text-gray-600 dark:text-gray-400">{family.birthdate_family}</p>
                                  </div>
                              </td>

                              <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                      <p class="text-sm font-normal text-gray-600 dark:text-gray-400">{family.age_family}</p>
                                  </div>
                              </td>

                              <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                      <h2 class="font-medium text-gray-800 dark:text-white ">{family.user_name}</h2>
                                   </div>
                              </td>
                          </tr>
                          ))}

                                               {/* Mostar si no encuentra el nombre */}
    {familysdataPaginaActual.length === 0 && (
    <tr>
      <td colSpan="6" class="px-4 py-4 text-sm font-medium whitespace-nowrap">
      No se encontraron datos de su nucleo familiar para el nombre "{valorProp}". Escriba el nombre completo de la persona a buscar
      </td>
    </tr>
  )}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  </div>

  <Pagination
          className="m-5"
          currentPage={currentPagefamilys}
          onPageChange={handlePageChangefamilys}
          totalPages={pageCountfamilys}
        />

</section>
          
              {/* End Chart */}
      </Tabs.Item>

      <Tabs.Item 
        icon={() => (
            <span className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
</svg>

    
            </span>
          )}>

{/* Separador */}
<div className="flex items-center justify-center">
  <div className="bg-blue-500 p-2 rounded-lg shadow-md">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
</svg>
  </div>
  <h1 className="p-5 font-bold text-xl">Referencias </h1>
</div>

    {/* end Separador */}

          {/* <!-- component --> */}
<section class="container px-4 mx-auto mb-5">
  


  <div class="flex flex-col mt-6">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead class="bg-gray-50 dark:bg-gray-800">
                          <tr>
                              <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  <button class="flex items-center gap-x-3 focus:outline-none">
                                      <span>id</span>

                                      <svg class="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                          <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                          <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                                      </svg>
                                  </button>
                              </th>

                              <th scope="col" class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  Nombre
                              </th>

                              <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  Documento
                              </th>

                              <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Email
                              </th>

                              <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  Celular
                              </th>

                              <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  Direccion
                              </th>

                              <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  Pais
                              </th>

                              <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  Ciudad
                              </th>

                              <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  Usuario
                              </th>
                          </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {references_infodataPaginaActual.map(reference => (    
                          <tr key={reference.id}>
                              <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                      <h2 class="font-medium text-gray-800 dark:text-white ">{reference.id}</h2>
                                  </div>
                              </td>
                              <td class="px-12 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                     <p class="text-gray-500 dark:text-gray-400">{reference.name_references}t</p>
                                  </div>
                              </td>
                              <td class="px-4 py-4 text-sm whitespace-nowrap">
                                  <div>
                                      <p class="text-gray-500 dark:text-gray-400">{reference.document_references}</p>
                                  </div>
                              </td>
                              <td class="px-4 py-4 text-sm whitespace-nowrap">
                              <div>
                                    <p class="text-gray-500 dark:text-gray-400">{reference.email_references}</p>
                                  </div>
                              </td>


                              <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                      <p class="text-sm font-normal text-gray-600 dark:text-gray-400">{reference.phone_references}</p>
                                  </div>
                              </td>

                              <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                      <p class="text-sm font-normal text-gray-600 dark:text-gray-400">{reference.address_references}</p>
                                  </div>
                              </td>

                              <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                      <p class="text-sm font-normal text-gray-600 dark:text-gray-400">{reference.country_references}</p>
                                  </div>
                              </td>

                              <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                      <p class="text-sm font-normal text-gray-600 dark:text-gray-400">{reference.city_references}</p>
                                  </div>
                              </td>

                              <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                      <h2 class="font-medium text-gray-800 dark:text-white ">{reference.user_name}</h2>
                                     </div>
                              </td>
                          </tr>
                           ))}

                                                                        {/* Mostar si no encuentra el nombre */}
    {references_infodataPaginaActual.length === 0 && (
    <tr>
      <td colSpan="6" class="px-4 py-4 text-sm font-medium whitespace-nowrap">
      No se encontraron datos de su nucleo familiar para el nombre "{valorProp}". Escriba el nombre completo de la persona a buscar
      </td>
    </tr>
  )}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  </div>

  <Pagination
          className="m-5"
          currentPage={currentPagereferences_info}
          onPageChange={handlePageChangereferences_info}
          totalPages={pageCountreferences_info}
        />

</section>
          
              {/* End Chart */}
      </Tabs.Item>
      
    </Tabs.Group>
   
    


    </>
  );
}

export default TableAllUser;