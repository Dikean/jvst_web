import React, { useState, useEffect } from "react";
import FooterAdmin from "../../../Footers/FooterAdmin";
import { ConsignmentApi } from "../../../../../services/ConsignmentApi";
//library
import Swal from 'sweetalert2'
import Cookies from 'js-cookie';
import { Pagination } from 'flowbite-react';
import BigNumber from 'bignumber.js';

export default function TableConsigment({ color }) {



  const [selectedFile, setSelectedFile] = useState(null);
  const [valorConsignado, setValorConsignado] = useState("");
  const [entidadBancaria, setEntidadBancaria] = useState("No_bank")
  const UserID = Cookies.get('User_id');
  const [consigment, setConsigment] = useState([]);

  //pagination
  const consignacionesPorPagina = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    
  };

  const handleClearFile = () => {
    setSelectedFile(null);
  };

  const handleEliminarConsignacion = async (consignmentId) => {
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
        await ConsignmentApi.eliminarPorId(consignmentId);
        // Actualizar el estado de consigment eliminando la consignación eliminada
        setConsigment((prevConsigment) =>
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
  
  

  const handleEnviarEmail = async (e) => {
    e.preventDefault();
  
    if (!selectedFile) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, sube un archivo.",
      });
      return;
    }
  
    if (valorConsignado === "" || isNaN(valorConsignado)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, coloca un monto válido.",
      });
      return;
    }
    
  
    if (entidadBancaria === "No_bank") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, elige una entidad bancaria.",
      });
      return;
    }
  
    // Eliminar el punto decimal del valor antes de guardarlo
    const valorSinDecimal = valorConsignado.replace(".", "");
  
    // Mostrar SweetAlert de carga
    Swal.fire({
      title: "Cargando...",
      allowOutsideClick: false, // Evita que el usuario cierre la alerta haciendo clic fuera de ella
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
  
    const formData = new FormData();
    formData.append("voucher", selectedFile);
    formData.append("date", new Date().toISOString());
    formData.append("amount", valorSinDecimal);
    formData.append("bank", entidadBancaria);
    formData.append("users_id", UserID);
  
    try {
      const response = await ConsignmentApi.enviarDatos(formData);
  
      // Ocultar SweetAlert de carga
      Swal.close();
  
      console.log(response.data.date);
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Datos enviados correctamente.",
      }).then(() => {
        // Recargar la página después de darle "OK"
        window.location.reload();
      });
  
      // Realiza cualquier acción adicional después de enviar los datos
    } catch (error) {
      console.error("Error al enviar los datos:", error);
  
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Server Response Data:", error.response.data);
        console.error("Server Response Status:", error.response.status);
        console.error("Server Response Headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received. Request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error setting up the request:", error.message);
      }
  
      // Ocultar SweetAlert de carga en caso de error
      Swal.close();
  
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error al enviar los datos.",
      });
    }
  };
  

  //Consumir la api y traer datos
  useEffect(() => {
    console.log('entra a consultar los montos');
    ConsignmentApi.obtenerPorId(UserID)
      .then(response => {
        console.log("Respuesta de la API:", response.data);
        setConsigment(response.data);
      })
      .catch(error => {
        console.error('Error al obtener consignaciones:', error);
      });
  }, [UserID]);

    // Función para formatear la fecha
    const formatearFecha = (fecha) => {
      const fechaDesdeBD = new Date(fecha);
  
      const opcionesDeFormato = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      return fechaDesdeBD.toLocaleDateString('es-ES', opcionesDeFormato);
    };


  // Calculate the total number of pages based on the items per page
const pageCount = Math.ceil(consigment.length / consignacionesPorPagina);

// Calculate the start and end indices for the current page
const startIndex = (currentPage - 1) * consignacionesPorPagina;
const endIndex = startIndex + consignacionesPorPagina;

// Get the consignations for the current page
const consignacionesPaginaActual = consigment.slice(startIndex, endIndex);
  
// Function to handle page change
const handlePageChange = (page) => {
  setCurrentPage(page);
};

function formatNumber(number) {
  return new Intl.NumberFormat('es-CO').format(Math.round(number));
}




  // Función para formatear el valor al cambiar el input
  const handleValorChange = (e) => {
    // Obtener el valor del input y eliminar todos los caracteres que no sean dígitos
    const inputNumber = e.target.value.replace(/[^\d]/g, "");

    // Formatear el número con separadores de miles
    const formattedNumber = parseFloat(inputNumber).toLocaleString("es-CO");

    // Actualizar el estado con el valor formateado
    setValorConsignado(formattedNumber);
  };

  return (
    <>
    <div className="flex items-center">
    <div className="bg-blue-500 p-2 rounded-lg shadow-md">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
    </svg>
  </div>
  <h1 className="p-5 font-bold text-xl">Subir Consignación</h1>
</div>

{/* <!-- component --> */}
<div class="flex items-center justify-center p-12">
  {/* <!-- Author: FormBold Team -->*/}
  <div class="mx-auto w-full max-w-[550px] bg-white">
    <form
     encType="multipart/form-data"
      class="py-6 px-9"
      method="POST"
       onSubmit={handleEnviarEmail}
    >

      <div class="mb-5">
        <label
          for="email"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          Valor Consignado

        </label>
        <input
  type="text"
  id="value_consigment"
  value={valorConsignado}
  onChange={handleValorChange}
  placeholder="Ingrese el Monto"
  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
/>


      </div>

      <div class="mb-5">
        <label
          for="email"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          Entidad bancaria
        </label>
        <select
           value={entidadBancaria}
           onChange={(e) => setEntidadBancaria(e.target.value)}
        id="Bank"  class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
  <option disabled value="No_bank" >Elije una entidad</option>
  <option value="bancolombia">Bancolombia</option>
  <option value="nequi">Nequi</option>
</select>

      </div>


      <div class="mb-6 pt-4">
        <label class="mb-5 block text-xl font-semibold text-[#07074D]">
          Comprobante
        </label>

        <div class="mb-8"
  onDrop={(e) => {
    e.preventDefault();
    handleFileChange({ target: { files: e.dataTransfer.files } });
  }}
  onDragOver={(e) => {
    e.preventDefault();
  }}
>
        <input type="file" name="file" id="file" className="sr-only" onChange={handleFileChange} />
        <label
          htmlFor="file"
          className={`relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center ${
            selectedFile ? 'hidden' : 'block'
          }`}
        >
            <div>
              <span class="mb-2 block text-xl font-semibold text-[#07074D]">
              Arrastra y suelta 
              </span>
              <span class="mb-2 block text-base font-medium text-[#6B7280]">
                O
              </span>
              <span
                class="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]"
              >
                Buscar
              </span>
            </div>
          </label>
        </div>

      </div>

{/* Banner */}
{selectedFile && (
<div class="rounded-md bg-[#F5F7FB] py-4 px-8">
          <div class="flex items-center justify-between">
            <span class="truncate pr-3 text-base font-medium text-[#07074D]">
            {selectedFile.name}
            </span>
            <button class="text-[#07074D]"  onClick={handleClearFile}>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                  fill="currentColor"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <div class="relative mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
            <div
              class="absolute left-0 right-0 h-full w-[100%] rounded-lg bg-[#6A64F1]"
            ></div>
          </div>
        </div>
          )}
{/* End banner */}

      <div className="mt-6">
        <button
        type="submit"    class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
        >
          Enviar 
        </button>
      </div>
    </form>
  </div>
</div>

    {/* <!-- component --> */}
<div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 ">
  <table class=" w-full border-collapse bg-white text-left text-sm text-gray-500 ">
    <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">id</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Fecha</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Monto</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Entidad bancaria</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Comprobante</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Acciones</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-100 border-t border-gray-100">      
    {consigment !== null ? (
      consignacionesPaginaActual.map((item) => (
      <tr class="hover:bg-gray-50">
        <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
        
          <div class="text-sm">
            <div class="font-medium text-gray-700">{item.id}</div>
          </div>
        </th>
        <td class="px-6 py-4">
          <span
            class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
            {formatearFecha(item.date)}
          </span>
        </td>
        <td class="px-6 py-4">$ {formatNumber(item.amount)}</td>
        <td class="px-6 py-4">
          <div class="flex gap-2">
            <span
              class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
            >
              {item.bank}
            </span>
          </div>
        </td>
        <td class="px-6 py-4">
        <div class="font-medium text-gray-700">
        <span
              class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
            >
                 <a 
        href={"https://example-api-5zs0.onrender.com" + item.voucher} 
        alt="Voucher"
         target="_blank"
         className="bg-red">
         Ver
          </a>
            </span>
    
       </div>
        </td>
        
        <td class="px-6 py-4">
            <a x-data="{ tooltip: 'delete' }"  onClick={() => handleEliminarConsignacion(item.id)} className="cursor-pointer">
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
       ))
       ) : (
         <tr>
           <td colSpan="6">Cargando consignaciones...</td>
         </tr>
       )}
    </tbody>
  </table>
</div>

 <Pagination
          className="m-5"
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={pageCount}
        />


<FooterAdmin></FooterAdmin>
    </>
  );
}

