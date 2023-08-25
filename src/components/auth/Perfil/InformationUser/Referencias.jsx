//library
import React,  { useState, useEffect }from "react";
import { User_references_info } from "../../../../services/User_References_info";
import Swal from 'sweetalert2';

import Cookies from 'js-cookie';
// components
import PerfilUser from "../PerfilUser";
import Menu_perfil from "../Menu_perfil";


export default function Referencias_info() {

  const [Referencia_info, setReferencia_info] = useState ([]);
  const UserID = Cookies.get('User_id');
    
  const [formData, setFormData] = useState({
    name_references: "",
    document_references: "",
    email_references: "",
    phone_references: "",
    address_references: "",
    country_references: "",
    city_references: "",
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

 

    try {
      const nuevosDatos = {
        date: new Date().toISOString().split('T')[0],
        ...formData,
        users_id : UserID
      };

      const response = await User_references_info.enviarDatos(nuevosDatos);

      console.log('Archivo enviado exitosamente:', response.data);

      Swal.fire({
        icon: 'success',
        title: 'Archivo enviado!',
        text: 'El archivo se ha enviado correctamente.',
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



  
  const handleDelete = async (consignmentId) => {
    const confirmResult = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    });
  
    if (confirmResult.isConfirmed) {
      try {
        await User_references_info.eliminarPorId(consignmentId);
        // Actualizar el estado de consigment eliminando la consignación eliminada
        setReferencia_info((prevConsigment) =>
          prevConsigment.filter((item) => item.id !== consignmentId)
        );
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Consignación eliminada correctamente.",
        });
      } catch (error) {
        console.error("Error al eliminar la consignación:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha ocurrido un error al eliminar la consignación.",
        });
      }
    }
  };

    //Consumir la PAi y traer datos
    useEffect(() => {
  
      User_references_info.obtenerPorId(UserID)
      .then(response => {
        if (Array.isArray(response.data)) {
          console.log("Respuesta de la API al obtener documentos:", response.data);
          setReferencia_info(response.data);
        } else {
          console.log("Usuario no tiene documentos");
          setReferencia_info([]); // Establecer documentos como un array vacío
        }
      })
      .catch(error => {
        console.error('Error al obtener documentos:', error);
      });
    
       }, [UserID]);
    

  return (
    <>
      <div className="flex flex-wrap ">
        <div className="w-full lg:w-8/12 px-4">
        {/* Start Content */}
         
         <Menu_perfil></Menu_perfil>

         <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Información referencias personales</h6>
            <button
              className="bg-blue-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              onClick={handleSubmit}
            >
              Guardar
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            informacion de las referencias
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nombre 
                  </label>
                  <input
                  required
                    value={formData.name_references} 
                    onChange={handleInputChange}
                    id="name_references"
                    type="text"
                    placeholder="juanpe"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                   
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    DOCUMENTO IDENTIDAD
                  </label>
                  <input
                   required
                  value={formData.document_references} 
                  onChange={handleInputChange}
                  id="document_references"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Ingrese su cedula"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                  EMAIL
                  </label>
                  <input
                   required
                  value={formData.email_references} 
                  onChange={handleInputChange}
                  id="email_references"
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Celular
                  </label>
                  <input
                   required
                  value={formData.phone_references} 
                  onChange={handleInputChange}
                  id="phone_references"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Ingrese sus Apellidos"
                  />
                </div>
             </div> 
             <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    DIRECCION
                  </label>
                  <input
                   required
                  value={formData.address_references} 
                  onChange={handleInputChange}
                  id="address_references"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Ingrese sus Dirección"
                  />
                </div>
             </div> 

             <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    PAIS
                  </label>
                  <input
                   required
                  value={formData.country_references} 
                  onChange={handleInputChange}
                  id="country_references"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Colombia"
                  />
                </div>
             </div> 

             <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    CIUDAD
                  </label>
                  <input
                   required
                  value={formData.city_references} 
                  onChange={handleInputChange}
                  id="city_references"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Barranquilla"
                  />
                </div>
             </div> 


            </div>

          
          </form>
        </div>
      </div>
      {/* Table */}

      {/* <!-- component --> */}
<section class="antialiased bg-gray-100 text-gray-600 h-screen mt-[-180px]">
    <div class="flex flex-col justify-center h-full">
        {/* <!-- Table --> */}
        <div class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header class="px-5 py-4 border-b border-gray-100">
                <h2 class="font-semibold text-gray-800">Referencias</h2>
            </header>
            <div class="p-3">
                <div class="overflow-x-auto">
                    <table class="table-auto w-full">
                        <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Nombre</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Documento de Identidad</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Correo Electronico</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-center">Celular</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-center">Dirección</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-center">País</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-center">Ciudad</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-center">Acciones</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="text-sm divide-y divide-gray-100">
                        {Referencia_info.map((Referencia, index) => (
                            <tr key={Referencia.id}>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="font-medium text-gray-800">{Referencia.name_references}</div>
                                    </div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left">{Referencia.document_references}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left font-medium">{Referencia.email_references}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left text-center">{Referencia.phone_references}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left text-center">{Referencia.address_references}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left text-center">{Referencia.country_references}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left text-center">{Referencia.city_references}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                <a x-data="{ tooltip: 'delete' }"  onClick={() => handleDelete(Referencia.id)} className="cursor-pointer">
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </a>
                                </td>
                            </tr>
                                 ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
        {/* End Content */}
        </div>
        <div className="w-full lg:w-4/12 px-4 ">
          <PerfilUser />
        </div>
      </div>
      
    </>
  );
}