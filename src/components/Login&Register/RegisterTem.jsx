import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UserApi } from '../../services/UserApi';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2'
function RegisterTerm() {

    const imagenURL =
    'https://images.pexels.com/photos/4136469/pexels-photo-4136469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  const estiloFondo = {
    backgroundImage: `url(${imagenURL})`,
    /* Añadir más propiedades de estilo aquí, si es necesario */
  };

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Confirmpassword, ConfirmsetPassword] = useState('');
    const [phone, setPhone] = useState('');
  
    const navigate = useNavigate();

    const handleNameChange = (event) => {
        setName(event.target.value);
      };

      const handleLastnameChange = (event) => {
        setLastname(event.target.value);
      };

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
      ConfirmsetPassword(event.target.value);
    };

    const handlePhoneChange = (event) => {
      setPhone(event.target.value);
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

       // Verifica si todos los campos obligatorios están llenos
  if (!name || !lastname || !email || !password || !Confirmpassword) {
    // Algunos campos están vacíos, muestra un SweetAlert de error
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, complete todos los campos obligatorios.',
    });
    return; // Evita que el código siga ejecutándose
  }

  // Verifica si las contraseñas coinciden
  if (password !== Confirmpassword) {
    // Las contraseñas no coinciden, muestra un SweetAlert de error
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Las contraseñas no coinciden',
    });
    return; // Evita que el código siga ejecutándose
  }

    // Verifica si la contraseña tiene al menos 7 caracteres y al menos una letra mayúscula
    if (password.length < 7 || !/[A-Z]/.test(password)) {
      // La contraseña no cumple con los requisitos, muestra un SweetAlert de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La contraseña debe tener al menos 7 caracteres y al menos una letra mayúscula.',
      });
      return; // Evita que el código siga ejecutándose
    }
  
      const registrationData = {
        name,
        lastname,
        email,
        password, 
        role: 'user',
        date: new Date().toISOString().split('T')[0],
      };
  
      try {
        const response = await UserApi.registrarUsuario(registrationData);
          //COOKIES
          const rolUsuario = 'user'; //user -admin -superadmin
          Cookies.set('rol', rolUsuario, { secure: true, sameSite: 'strict' });
           
          const UserID =  response.data.id
          Cookies.set('User_id', UserID, { secure: true, sameSite: 'strict' });
          
          const name = response.data.name; 
          Cookies.set('name', name, { secure: true, sameSite: 'strict' });
      
          const email = response.data.email; 
          Cookies.set('email', email, { secure: true, sameSite: 'strict' });
      
 

          navigate('/dashboard/');
          Swal.close();
        // Rest of the code for handling success
      } catch (error) {
        console.error('Error al enviar los datos:', error);
  
        // If the error contains a server response
        if (error.response) {
          console.log('Respuesta del servidor:', error.response.data);
          console.log('Código de estado:', error.response.status);
        }
  
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al enviar los datos.',
        });
      }
    }



  return (
    <>
<div style={estiloFondo} class="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center">
  <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
<div class="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
    <div class="text-center">
        <h2 class="mt-6 text-3xl font-bold text-gray-900">
            ¡Bienvenido de nuevo!
        </h2>
        <p class="mt-2 text-sm text-gray-600">Inicie sesión en su cuenta</p>
    </div>
    <form class="mt-8 space-y-6" onSubmit={handleSubmit} method="POST" id="loginForm">
        <input type="hidden" name="remember" value="true"/>
        {/* <!---Name--> */}
        <div class="relative">
            <div class="absolute right-0 mt-4" style={{ display: name.trim() !== '' ? 'block' : 'none' }} id="checkIcon"><svg xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <label class="text-sm font-bold text-gray-700 tracking-wide">Nombre Completo *</label>
            <input class=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="Ingrese su Nombre"  value={name}   onChange={handleNameChange} id="name"/>
        </div>
          {/* <!---lastname--> */}
          <div class="relative">
            <div class="absolute right-0 mt-4" style={{ display: lastname.trim() !== '' ? 'block' : 'none' }} id="checkIcon"><svg xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <label class="text-sm font-bold text-gray-700 tracking-wide">Apellido *</label>
            <input class=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="Ingrese su Apellido"  value={lastname}   onChange={handleLastnameChange} id="lastname"/>
        </div>
        {/* <!---email--> */}
        <div class="relative">
            <div class="absolute right-0 mt-4"     style={{ display: email.trim() !== '' ? 'block' : 'none' }} id="checkIcon2"><svg xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <label class="text-sm font-bold text-gray-700 tracking-wide"> Email *</label>
            <input class="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="email" placeholder="Ingrese su email"  value={email} onChange={handleEmailChange} id="email"/>
        </div>
          {/* <!---password-->*/}
          <div class="relative">
            <div class="absolute right-0 mt-4"     style={{ display: password.trim() !== '' ? 'block' : 'none' }} id="checkIcon3"><svg xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <label class="text-sm font-bold text-gray-700 tracking-wide"> Contraseña *</label>
            <input class="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" placeholder="Ingrese su Contraseña"   value={password} onChange={handlePasswordChange} id="password"/>
        </div>
       
          {/* <!---PASSWPRD-->*/}
          <div class="relative">
            <div class="absolute right-0 mt-4"     style={{ display: Confirmpassword.trim() !== '' ? 'block' : 'none' }} id="checkIcon3"><svg xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <label class="text-sm font-bold text-gray-700 tracking-wide">Confirmar Contraseña *</label>
            <input class="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" placeholder="Ingrese su Contraseña"  value={Confirmpassword} onChange={handleConfirmPasswordChange} id="Confirmpassword"/>
        </div>

         {/* <!---phone--> */}
         <div class="relative">
            <div class="absolute right-0 mt-4" style={{ display: phone.trim() !== '' ? 'block' : 'none' }} id="checkIcon"><svg xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <label class="text-sm font-bold text-gray-700 tracking-wide">Celular *</label>
            <input class=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="Ingrese su Nombre"  value={phone}   onChange={handlePhoneChange} id="phone"/>
        </div>


      



        <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 bg-indigo-500 focus:ring-indigo-400 border-gray-300 rounded"/>
                    <label for="remember_me" class="ml-2 block text-sm text-gray-900">
                        Recuerdame
                    </label>
                </div>
            <div class="text-sm">
                <a href="/Forgot_password" class="font-medium text-indigo-500 hover:text-indigo-500">
                            Olvidaste tú contraseña?
                </a>
            </div>
        </div>
        <div>
            <button  onclick="submitLoginForm()" type="submit" class="w-full flex justify-center bg-indigo-500 text-gray-100 p-4  rounded-full tracking-wide
                            font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300">
                            Registrarse
            </button>
        </div>
        <p class="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
            <span>Ya tienes una cuenta?</span>
            <a href="/Login"  type="submit" class="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300">Iniciar sección</a>
        </p>
    </form>
</div></div>
    </>
  );
}

export default RegisterTerm;