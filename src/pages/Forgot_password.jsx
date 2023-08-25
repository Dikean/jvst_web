import React, { useState } from 'react';
//liberias
import { useNavigate } from "react-router-dom";
import { UserApi } from '../services/UserApi';
import Swal from 'sweetalert2';


const imagenURL =
'https://images.pexels.com/photos/4136469/pexels-photo-4136469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

const estiloFondo = {
backgroundImage: `url(${imagenURL})`,
/* Añadir más propiedades de estilo aquí, si es necesario */
};

function Forgot_password() {

    const navigate = useNavigate();
    
    const [form, setForm] = useState({
      email: '',
    });

    const manejadorChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
      
        // Aquí accedemos al valor del email desde el estado form
        const emailValue = form.email;
      
        // Mostrar SweetAlert2 de carga
        Swal.fire({
          title: 'Cargando...',
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
      
        try {
          // Llamada para verificar si el correo existe
          const usersResponse = await UserApi.obtenerTodos();
          const users = usersResponse.data;
      
          // Verificar si el correo existe en la lista de usuarios
          const userWithEmail = users.find((user) => user.email === emailValue);
      
          if (!userWithEmail) {
            // Cerrar SweetAlert2 de carga
            Swal.close();
      
            // Mostrar un mensaje de error si el correo no existe
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'El correo electrónico no existe en nuestra base de datos.',
            });
            return;
          }
      
          // El correo existe, proceder con la solicitud de recuperación de contraseña
          const response = await UserApi.recuperarContrasena(emailValue);
          console.log('Respuesta de la API:', response.data);
      
          // Cerrar SweetAlert2 de carga
          Swal.close();
      
          navigate('/Login');
          // Aquí podrías mostrar un mensaje de éxito en la interfaz de usuario
        } catch (error) {
          console.error('Error al solicitar recuperación de contraseña:', error);
      
          // Cerrar SweetAlert2 de carga
          Swal.close();
      
          // Mostrar un mensaje de error con SweetAlert2
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al solicitar la recuperación de contraseña.',
          });
        }
      };
      
     
    return (
   <>
   <div style={estiloFondo} class="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center">
  <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
<div class="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
    <div class="text-center">
        <h2 class="mt-6 text-3xl font-bold text-gray-900">
            ¡Recuperar cuenta!
        </h2>
        <p class="mt-2 text-sm text-gray-600">Se le enviara una contraseña a su correo</p>
    </div>
    <form  onSubmit={handleSubmit} class="mt-8 space-y-6" id="loginForm" method="POST">
        <input type="hidden" name="remember" value="true"/>
        {/* <!---Email--> */}
        <div class="relative">
            <div style={{ display: form.email.trim() !== '' ? 'block' : 'none' }} class="absolute right-0 mt-4" id="checkIcon"><svg xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <label class="text-sm font-bold text-gray-700 tracking-wide">Email</label>
            <input class=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="email" placeholder="mail@gmail.com"  onChange={manejadorChange} required name="email"/>
        </div>
        <div>
            <button  type="submit" class="w-full flex justify-center bg-indigo-500 text-gray-100 p-4  rounded-full tracking-wide
                            font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300">
                            Iniciar sesión
            </button>
        </div>
        <p class="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
            <span>No tienes cuenta?</span>
            <a href="/Register" class="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300">Crear</a>
        </p>
    </form>
</div>
</div>
   </>
    );
  }
  
  export default Forgot_password;
  