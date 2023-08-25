import React, { useState } from 'react';
//liberias
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Swal from 'sweetalert2'

//servicio
import { UserApi } from '../../services/UserApi';


   const imagenURL =
    'https://images.pexels.com/photos/4136469/pexels-photo-4136469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  const estiloFondo = {
    backgroundImage: `url(${imagenURL})`,
    /* Añadir más propiedades de estilo aquí, si es necesario */
  };

  function LoginTem() {

    const navigate = useNavigate();
    
    const [form, setForm] = useState({
      email: '',
      password: '',
    });

    const manejadorChange = (e) => {
      const { name, value } = e.target;
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
    
      // Mostrar SweetAlert de carga
      Swal.fire({
        title: 'Espere un momento...',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
    
      try {
        // Realiza la solicitud de inicio de sesión
        const response = await UserApi.iniciarSesion(form);
    
        // Resto del código para manejar el éxito
        const UserID = response.data.user.id;
        Cookies.set('User_id', UserID, { secure: true, sameSite: 'strict' });
    
        const rol = response.data.user.role;
        Cookies.set('rol', rol, { secure: true, sameSite: 'strict' });
    
        const name = response.data.user.name;
        Cookies.set('name', name, { secure: true, sameSite: 'strict' });
    
        const email = response.data.user.email;
        Cookies.set('email', email, { secure: true, sameSite: 'strict' });
    
        navigate('/dashboard/');
        Swal.close();
      } catch (error) {
        console.error('Error al enviar los datos:', error);
    
        // Verifica si la respuesta de error de la API contiene un mensaje
        if (error.response && error.response.data && error.response.data.error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data.error,
            timer: 5000, // Establece la duración en 5 segundos
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al enviar los datos.',
            timer: 5000, // Establece la duración en 5 segundos
          });
        }
      } 
    };
    

  return (
<>
<div style={estiloFondo} class="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center">
  <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
<div class="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
    <div class="text-center">
        <h2 class="mt-6 text-3xl font-bold text-gray-900">
            ¡Bienvenido de nuevo!
        </h2>
        <p class="mt-2 text-sm text-gray-600">Please sign in to your account</p>
    </div>
    <form class="mt-8 space-y-6" onSubmit={handleSubmit} id="loginForm" method="POST">
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
            <input class=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="mail@gmail.com"   onChange={manejadorChange} name="email"/>
        </div>
        {/* <!---Password--> */}
        <div class="relative">
            <div style={{ display: form.password.trim() !== '' ? 'block' : 'none' }} class="absolute right-0 mt-4"  id="checkIcon2"><svg xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <label class="text-sm font-bold text-gray-700 tracking-wide"> Password</label>
            <input class="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" placeholder="Ingrese su contraseña"  onChange={manejadorChange}  name="password"/>
        </div>
        <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 bg-indigo-500 focus:ring-indigo-400 border-gray-300 rounded"/>
                    <label for="remember_me" class="ml-2 block text-sm text-gray-900">
                        Remember me
                    </label>
                </div>
            <div class="text-sm">
                <a href="/Forgot_password" class="font-medium text-indigo-500 hover:text-indigo-500">
                         Olvidaste tú contraseña?
                </a>
            </div>
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
export default LoginTem;