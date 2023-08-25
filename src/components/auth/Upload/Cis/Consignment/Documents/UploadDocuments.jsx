import React, { useState, useEffect } from 'react';
import FooterAdmin from "../../../../Footers/FooterAdmin";
import { DocumentsApi } from '../../../../../../services/DocumentsApi';

//library
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Cookies from 'js-cookie';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


function UploadDocument() {

  const UserID = Cookies.get('User_id');
  const [uploadedFile, setUploadedFile] = useState([]); // Cambia el estado a un solo archivo
  const [documentos, setDocumentos] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files; // Get the selected files
    setUploadedFile([...uploadedFile, ...files]); // Append the files to the existing array
};

const handleDeleteFile = (index) => {
  const updatedFiles = [...uploadedFile];
  updatedFiles.splice(index, 1); // Remove the file at the specified index
  setUploadedFile(updatedFiles);
};


const handleUploadFile = async () => {
  if (uploadedFile.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, selecciona al menos un archivo antes de enviarlo.',
    });
    return;
  }

  let uploadedCount = 0;

  // Mostrar SweetAlert de carga
  Swal.fire({
    title: 'Cargando...',
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
  });

  for (let i = 0; i < uploadedFile.length; i++) {
    const file = uploadedFile[i];
    const description = `file${i + 1}`;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("date", new Date().toISOString().split('T')[0]);
      formData.append("users_id", UserID);
      formData.append("description", description);

      console.log('Datos a enviar:', formData);

      const response = await DocumentsApi.enviarDatos(formData);

      console.log('Archivo enviado exitosamente:', response.data);

      uploadedCount++;

      if (uploadedCount === uploadedFile.length) {
        // Ocultar SweetAlert de carga
        Swal.close();

        Swal.fire({
          icon: 'success',
          title: 'Archivos enviados!',
          text: 'Todos los archivos se han enviado correctamente.',
        }).then(() => {
          // Recargar la página
          window.location.reload();
        });
      }
    } catch (error) {
      console.error('Error al enviar el archivo:', error);

      // Ocultar SweetAlert de carga en caso de error
      Swal.close();

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al enviar el archivo.',
      });
    }
  }

  setUploadedFile([]);
};


const handleDeleteDocument = async () => {
  try {
    // Usar SweetAlert2 para mostrar un cuadro de diálogo de confirmación
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: '¿Se eliminaran todos, realmente deseas eliminar los documento?',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      // Si el usuario confirma la eliminación
      await DocumentsApi.eliminarAlldocumentFile(UserID);

      Swal.fire({
        icon: 'success',
        title: 'Documento eliminado',
        text: 'El documento se ha eliminado correctamente.',
      }).then(() => {
        // Recargar la página
        window.location.reload();
      });
    }
  } catch (error) {
    console.log('Error al eliminar el documento: ', error);

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un error al eliminar el documento.',
    });
  }
};

  //Consumir la PAi y traer datos
 useEffect(() => {
  
  DocumentsApi.obtenerDocumentosFile(UserID)
  .then(response => {
    console.log("data"+response.data);
    if (Array.isArray(response.data)) {
      setDocumentos(response.data);
    } else {
      console.log("Usuario no tiene documentos");
      setDocumentos([]); // Establecer documentos como un array vacío
    }
  })
  .catch(error => {
    console.error('Error al obtener documentos:', error);
  });

   }, [UserID]);


    //Consumir la PAi y traer datos

     // Función para formatear la fecha
     const formatearFecha = (fecha) => {
      const fechaDesdeBD = new Date(fecha);
  
      const opcionesDeFormato = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      return fechaDesdeBD.toLocaleDateString('es-ES', opcionesDeFormato);
    };
    

  
  return (
    <>
    <div className="flex items-center">
    <div className="bg-blue-500 p-2 rounded-lg shadow-md">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
    </svg>
  </div>
  <h1 className="p-5 font-bold text-xl">Subir Documentos</h1>
</div>
<p className="p-5">Arrastra todos los documentos en PDF, SVG o PNG:</p>
<ul className="p-5">
  <li>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="blue"
      className="w-6 h-6 inline-block mr-2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    RUT
  </li>
  <li><svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="blue"
      className="w-6 h-6 inline-block mr-2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>CÉDULA</li>
  <li><svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="blue"
      className="w-6 h-6 inline-block mr-2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>PASAPORTE</li>
  <li><svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="blue"
      className="w-6 h-6 inline-block mr-2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>ANTECEDENTES JUDICIALES</li>
  <li><svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="blue"
      className="w-6 h-6 inline-block mr-2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>FACTURA/RECIBO DE SERVICIO PÚBLICO</li>
</ul>

<div class="max-w-2xl mx-auto">

	<div class="flex items-center justify-center w-full">
           <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          > <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Haz clic para subir</span></p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              multiple
            />
        </label>
    </div> 

{/* Start Banner */}
{uploadedFile.map((file, index) => (
          <div key={index} className="rounded-md bg-blue-500 py-4 px-8 mt-5">
            <div className="flex items-center justify-between">
              <span className="truncate pr-3 text-base font-medium text-white">
                {file.name}
              </span>
             <button className="text-white" onClick={() => handleDeleteFile(index)}>
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
          </div>
        ))}
{/* End Banner */}
	
        <button
          class="mt-6 hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
          onClick={handleUploadFile} >
          Enviar
        </button>

    <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
</div>

  {/* <!-- Table --> */}
  <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 ">
  <table class=" w-full border-collapse bg-white text-left text-sm text-gray-500 ">
    <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">id</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">documentos</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">date</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Acciones</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-100 border-t border-gray-100">      
    {documentos.map((documento, index) => (
      <tr class="hover:bg-gray-50">
        <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
          <div class="text-sm">
            <div class="font-medium text-gray-700">{documento.id}</div>
          </div>
        </th>
        <td class="px-6 py-4 ">
          <span
            class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
            <a href={'https://example-api-5zs0.onrender.com'+documento.file}> ver </a>
          </span>
        </td>
        <td class="px-6 py-4"> 
        <span
            class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
            {formatearFecha(documento.date)}
          </span>
        </td>
        <td class="px-6 py-4">
          <div class=" gap-4">
            <a x-data="{ tooltip: 'Delete' }" href="#"
             onClick={() => handleDeleteDocument()}>
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
          </div>
        </td>
      </tr>
      ))}
      
    </tbody>
  </table>
</div>

<FooterAdmin></FooterAdmin>
    </>
  );
}

export default UploadDocument;