//library
import React, { useState, useEffect } from "react";
import { User_healthy_conditions_info } from "../../../../services/User_healty_conditions_info";
import { User_contacto } from "../../../../services/User_contacto";
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

// components
import PerfilUser from "../PerfilUser";
import Menu_perfil from "../Menu_perfil";


export default function Medicina_info() {

  const [healthys, sethealthy] = useState ([]);
  const [UserMedicine, setUserMedicine] = useState ([]);
  const UserID = Cookies.get('User_id');
    //Form 1
  const [formData, setFormData] = useState({
    name_emergency_contact: "",
    email_emergency_contact: "",
    phone_emergency_contact: "",
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
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
        await User_contacto.eliminarPorId(consignmentId);
        // Actualizar el estado de consigment eliminando la consignación eliminada
        setUserMedicine((prevConsigment) =>
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

  const handleSubmit = async (event) => {
    event.preventDefault();

 

    try {
      const nuevosDatos = {
        date: new Date().toISOString().split('T'),
        ...formData,
        users_id : UserID
      };

     // console.log('Datos a enviar:', nuevosDatos);

      const response = await User_contacto.enviarDatos(nuevosDatos);

    //  console.log('Archivo enviado exitosamente:', response.data);

    Swal.fire({
      icon: 'success',
      title: 'Archivo enviado!',
      text: 'El archivo se ha enviado correctamente.',
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

  //Form 2
  const [form2Data, setForm2Data] = useState({
    Alergia: "",
    Enfermedad: "",
    PrescripcionMedica: "",
    incapacidad: "",
    RestriccionAlimenticia: "",
  });

  const handleInputChange2 = (event) => {
    const { id, value } = event.target;
    setForm2Data((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();
  
    try {
      // Crear un objeto con los datos del formulario
      const nuevosDatos = {
        alergia: form2Data.Alergia,
        enfermedad: form2Data.Enfermedad,
        prescripcionMedica: form2Data.PrescripcionMedica,
        incapacidad: form2Data.incapacidad,
        RestriccionAlimenticia: form2Data.RestriccionAlimenticia,
        users_id: UserID,
      };
  
      console.log('Datos a enviar:', nuevosDatos);
  
      // Llamar a la función para enviar los datos
      const response = await User_healthy_conditions_info.actualizarUsuario(UserID, nuevosDatos);
  
      console.log('Datos enviados exitosamente:', response.data);
  
      Swal.fire({
        icon: 'success',
        title: 'Datos enviados!',
        text: 'Los datos se han enviado correctamente.',
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
  
  User_contacto.obtenerPorId(UserID)
  .then(response => {
    const dataArray = Object.values(response.data);
    if (Array.isArray(dataArray)) {
      setUserMedicine(response.data);
    } else {
      console.log("Usuario no tiene contactos de emergencia");
      setUserMedicine([]); // Establecer documentos como un array vacío
    }
  })
  .catch(error => {
    console.error('Error al obtener contactos de emergencia:', error);
  });


  User_healthy_conditions_info.obtenerPorId(UserID)
  .then(response => {
    const dataArray = Object.values(response.data);

    if (Array.isArray(dataArray)) {
      console.log('datos a enviar', JSON.stringify(response.data));

      sethealthy(response.data);
    } else {
      console.log("Usuario no tiene contactos de emergencia");
      sethealthy([]); // Establecer documentos como un array vacío
    }
  })
  .catch(error => {
    console.error('Error al obtener contactos de emergencia:', error);
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
            <h6 className="text-blueGray-700 text-xl font-bold">Información Medica</h6>
            <button
              className="bg-blue-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              onClick={handleSubmit}
            >
              Guardar
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form >
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            informacion del contacto de emergencia
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
                     value={formData.name_emergency_contact} 
                     onChange={handleInputChange}
                     id="name_emergency_contact"
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
                    Email 
                  </label>
                  <input
                     value={formData.email_emergency_contact} 
                     onChange={handleInputChange}
                  id="email_emergency_contact"
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
                     value={formData.phone_emergency_contact} 
                     onChange={handleInputChange}
                  id="phone_emergency_contact"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="+57 325658988"
                  />
                </div>
              </div>
            
            
            </div>
             </form>

            <hr className="mt-6 border-b-1 border-blueGray-300" />
{/* Condiciones generales */}
   <form>
           <div className="text-center flex justify-between mt-4 mb-4">
            <h6 className="text-blueGray-700 text-xl font-bold">Información Medica</h6>
            
            <button
              className="bg-blue-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              onClick={handleSubmit2}
            >
              Guardar
            </button>
          </div>
                  

            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    ¿TIENE ALGUNA ALERGIA?
                  </label>
                  <textarea
                  value={formData.Alergia} 
                   onChange={handleInputChange2}
                    id="Alergia"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder={healthys.map((item) => item.alergia).join(', ')}
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    ¿TIENE USTED ALGUNA ENFERMEDAD?

                  </label>
                  <textarea
                   value={formData.Enfermedad} 
                   onChange={handleInputChange2}
                   id="Enfermedad"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder={healthys.map((item) => item.enfermedad).join(', ')}
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                  PRESCRIPCIÓN MÉDICA
                  </label>
                  <textarea
                   value={formData.PrescripcionMedica} 
                   onChange={handleInputChange2}
                  id="PrescripcionMedica"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder={healthys.map((item) => item.prescripcionMedica).join(', ')}
                     rows="4"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    ¿TIENE ALGUNA INCAPACIDAD?

                  </label>
                  <textarea
                   value={formData.incapacidad} 
                   onChange={handleInputChange2}
                  id="incapacidad"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder={healthys.map((item) => item.incapacidad).join(', ')}
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    ¿TIENE USTED ALGUNA RESTRICCIÓN ALIMENTICIA?

                  </label>
                  <textarea
                   value={formData.RestriccionAlimenticia} 
                   onChange={handleInputChange2}
                     id="RestriccionAlimenticia"
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder={healthys.map((item) => item.restriccionAlimenticia).join(', ')}
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>


          </form>
        </div>
      </div>

        {/* End Content */}

             {/* <!-- component --> */}
<section class="antialiased bg-gray-100 text-gray-600 h-screen mt-[-180px]">
    <div class="flex flex-col justify-center h-full">
        {/* <!-- Table --> */}
        <div class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header class="px-5 py-4 border-b border-gray-100">
                <h2 class="font-semibold text-gray-800">Contacto de emergencia</h2>
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
                                    <div class="font-semibold text-left">Email</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">phone</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-center">Acciones</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="text-sm divide-y divide-gray-100">
                        {UserMedicine.map((UserMedicina, index) => (
                            <tr key={UserMedicina.id}>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="font-medium text-gray-800">{UserMedicina.name_emergency_contact}</div>
                                    </div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left">{UserMedicina.email_emergency_contact}</div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                    <div class="text-left font-medium">{UserMedicina.phone_emergency_contact}</div>
                                </td>

                                <td class="p-2 whitespace-nowrap">
                                <a x-data="{ tooltip: 'delete' }"  onClick={() => handleDelete(UserMedicina.id)} className="cursor-pointer">
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

        </div>
        <div className="w-full lg:w-4/12 px-4 ">
          <PerfilUser />
        </div>
      </div>
      
    </>
  );
}