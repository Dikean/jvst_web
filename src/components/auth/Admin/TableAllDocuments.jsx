//Api
import { DocumentsApi } from "../../../services/DocumentsApi";

//library
import React, { useState, useEffect } from 'react';
import { Pagination } from 'flowbite-react';
import { log } from "util";



function TableAllDocuments({ valorProp }) {

    //all Documents
    const documentosPorPagina = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [documentos, setDocumentos] = useState([]);

    const [documentosByName, setdocumentosByName] = useState([]);

   
     useEffect(() => {
      async function fetchdocumentos() {
        try {
          let response;
          
          if (valorProp) {
            // Si valorProp tiene un valor, realiza la búsqueda filtrada
            response = await DocumentsApi.obtenerPorName(valorProp);
            setdocumentosByName(response.data);
          } else {
            // Si valorProp está vacío, obtén todas las consignaciones sin filtrar
            response = await DocumentsApi.obtenerTodos();
          }
          
          setDocumentos(response.data);
        } catch (error) {
          console.error("Error al obtener consignaciones", error);
        }
      }
    
      fetchdocumentos();
    }, [valorProp]);
    
  

    const pageCount = Math.ceil(documentos.length / documentosPorPagina);
    const startIndex = (currentPage - 1) * documentosPorPagina;
    const endIndex = startIndex + documentosPorPagina;
    const documentosPaginaActual = documentos.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

     // Función para formatear la fecha
   const formatearFecha = (fecha) => {
    const fechaDesdeBD = new Date(fecha);

    const opcionesDeFormato = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return fechaDesdeBD.toLocaleDateString('es-ES', opcionesDeFormato);
  };

    return (
      <>
                              
               {/* <>
               <!-- component --> */}
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
                                      Documentos
                                  </th>
  
                                  <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                      Fecha
                                  </th>

                                  <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                      Usuario
                                  </th>

                              </tr>
                          </thead>
                          <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                          {documentosPaginaActual.map(documentos => (
                              <tr key={documentos.id}>
                                  <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                      <div>
                                          <h2 class="font-medium text-gray-800 dark:text-white ">{documentos.id}</h2>
                                      </div>
                                  </td>
                                  <td class="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                      <div class="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                    <a href={'https://example-api-5zs0.onrender.com'+documentos.file} target="_blank">
                                        Ver
                                    </a>
                                      
                                      </div>
                                  </td>
                                  <td class="px-4 py-4 text-sm whitespace-nowrap">
                                  <span
            class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
            {formatearFecha(documentos.date)}
          </span>
                                  </td>

                                  <td class="px-4 py-4 text-sm whitespace-nowrap">
                                      <div>
                                          <h4 class="text-gray-700 dark:text-gray-200">{documentos.user_name}</h4>
                                        </div>
                                  </td>
                                  
                                  {/* <td class="px-6 py-4">
            <a x-data="{ tooltip: 'Edite' }" href="#" >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
                x-tooltip="tooltip"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </a>
                               </td> */}
                              </tr>
                                ))}

                                    {/* Mostar si no encuentra el nombre */}
    {documentosPaginaActual.length === 0 && (
    <tr>
      <td colSpan="6" class="px-4 py-4 text-sm font-medium whitespace-nowrap">
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
          className="mt-5"
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={pageCount}
        />

  </section>
              
                  {/* End Chart */}
      
  
  
      </>
    );
  }
  
  export default TableAllDocuments;