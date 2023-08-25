import React from 'react';
import FooterAdmin from '../../Footers/FooterAdmin';
import { cisApi } from '../../../../services/CisApi';
//library
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Cookies from 'js-cookie';
class CisContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      userCis: [], // Documento CIS del usuario actual
    };
  }

      // Función para formatear la fecha
       formatearFecha = (fecha) => {
        const fechaDesdeBD = new Date(fecha);
    
        const opcionesDeFormato = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return fechaDesdeBD.toLocaleDateString('es-ES', opcionesDeFormato);
      };

  componentDidMount() {
    // Llamar a la función para cargar el documento CIS del usuario al montar el componente
    this.cargarDocumentoCIS();
  }

  cargarDocumentoCIS = () => {
    const UserID = Cookies.get('User_id');
  
    // Llamada a la API para obtener el documento CIS del usuario actual
    cisApi.obtenerDocumentosCis(UserID)
      .then(response => {
        const userCis = response.data;
        console.log("Obtener cis", userCis);
  
        // Asegúrate de que userCis sea un array
        if (Array.isArray(userCis)) {
          this.setState({ userCis });
        } else {
          // Si no es un array, asigna un array vacío
          this.setState({ userCis: [] });
        }
      })
      .catch(error => {
        console.error("Error al obtener el documento CIS del usuario:", error);
      });
  };
  

  handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    this.setState({ selectedFile });
  };

  handleUploadFile = () => {
    const { selectedFile } = this.state;
    const UserID = Cookies.get('User_id');

    
    if (selectedFile) {

     // Preparar los datos para enviar

     const formData = new FormData();
     formData.append("file", selectedFile);
     formData.append("date", new Date().toISOString());
     formData.append("description", "CIS");
     formData.append("users_id", UserID);


     this.setState({ selectedFile, formData }); // Actualiza el estado con el formDat
     // Enviar la solicitud POST a la API
     cisApi.enviarDatos(formData)
       .then((response) => {
         console.log('Archivo enviado exitosamente:', response.data);
         Swal.fire({
           icon: 'success',
           title: 'Archivo enviado!',
           text: 'El archivo se ha enviado correctamente.',
         }).then(() => {
          // Redirigir a la página actual para recargar
          window.location.reload();
        });
         this.setState({ selectedFile: null }); // Reiniciar el estado
       })
       .catch((error) => {
         console.error('Error al enviar archivo:', error);
         Swal.fire({
           icon: 'error',
           title: 'Error',
           text: 'Ha ocurrido un error al enviar el archivo.',
         });
       });
   } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, selecciona un archivo antes de enviarlo.',
      });
    }

        // Después de subir el documento, llama a cargarDocumentoCIS nuevamente para mostrar el nuevo documento
        this.cargarDocumentoCIS();
  };

  handleClearFile = () => {
    this.setState({ selectedFile: null });
  };
 
  handleDeleteCis = async (CisId) => {
    // Mostrar una confirmación antes de eliminar
    const willDelete = await Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar este documento?',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
  
    if (willDelete.isConfirmed) {
      try {
        await cisApi.eliminarCis(CisId);
        this.cargarDocumentoCIS(); // Cargar nuevamente el documento CIS después de eliminar
        Swal.fire({
          icon: 'success',
          title: 'Documento eliminado',
          text: 'El documento se ha eliminado correctamente.',
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al eliminar el documento.',
        });
      }
    } else {
      // El usuario canceló la eliminación, no se hace nada
    }
  };
  
  // Función para formatear la fecha
  formatearFecha = (fecha) => {
    const fechaDesdeBD = new Date(fecha);

    const opcionesDeFormato = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return fechaDesdeBD.toLocaleDateString('es-ES', opcionesDeFormato);
  };

  render() {
    const { selectedFile, userCis } = this.state;
    return (
      <>
        <div className="flex items-center">
          <div className="bg-blue-500 p-2 rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
          </div>
          <h1 className="p-5 font-bold text-xl">Subir Cis</h1>
        </div>
        <p className="p-5">Descarga el 
        <a
        className="ml-3 mr-2
        .. bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        href="/CIS.pdf" // Ruta relativa al documento en la carpeta public
        download="CIS.pdf" // El atributo "download" indica que se debe descargar el archivo
>
 documento
</a>
 , luego fírmalo y súbelo nuevamente:</p>

        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center w-full">
            <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            onDrop={(e) => {
              e.preventDefault();
              this.handleFileChange({ target: { files: e.dataTransfer.files } });
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Haz clic para subir</span> o arrastra y suelta</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG o GIF (MÁX. 800x400 px)</p>
              </div>
              <input id="dropzone-file" name="userFile"  type="file" className="hidden" onChange={this.handleFileChange} />
            </label>
          </div>
           {/* Banner */}
           {selectedFile && (
            <div className="mt-5 rounded-md bg-blue-500 py-4 px-8">
              <div className="flex items-center justify-between">
                <span className="truncate pr-3 text-base font-medium text-white">
                  {selectedFile.name}
                </span>
                <button className="text-white" onClick={this.handleClearFile}>
                  {/* Icono para eliminar */}
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
          )}

          <div className="mt-6">
            <button
              className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              onClick={this.handleUploadFile}
            >
              Enviar archivo
            </button>
          </div>
        </div>


        {/* Start Table cis */}
          {/* <!-- component --> */}
<div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 ">
  <table class=" w-full border-collapse bg-white text-left text-sm text-gray-500 ">
    <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">id</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Fecha</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">documentos</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Acciones</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-100 border-t border-gray-100">  

    {userCis.map(item => (
      <tr class="hover:bg-gray-50">
        <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
          <div class="text-sm">
            <div class="font-medium text-gray-700">{item.id}</div>
          </div>
        </th>

        <td class="px-6 py-4">
         <div class="text-sm">
           <span
            class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
            {this.formatearFecha(item.date)}
          </span>
          </div>
        </td>

        <td class="px-6 py-4">
          <div class="flex gap-2">
            <span
              class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
            >
             <span
              class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
            >
                 <a 
        href={"https://example-api-5zs0.onrender.com" + item.file} 
        alt="Voucher"
         target="_blank"
         className="bg-red">
         Ver
          </a>
            </span>
            </span>
          </div>
        </td>
        
        <td class="px-6 py-4">
          <div class="flex justify-center gap-4">
            <a x-data="{ tooltip: 'Delete' }" href="#"
             onClick={() => this.handleDeleteCis(item.id)}>
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
        <FooterAdmin />
      </>
    );
  }
}

export default CisContent;
