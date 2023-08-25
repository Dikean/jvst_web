//librery
import React from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { useNavigate } from "react-router-dom";
//componentes
import NotificationDropdown from "./NotificationDropdown";
import UserDropdown from "./UserDropdown";
import LogoSidebar from '../../assets/img/Logo.png'
import LogoSidebarMovil from '../../assets/img/LogoMovil.png'

 function SiderAuth() {

  const navigate = useNavigate();

  const rolUsuario = Cookies.get('rol');
  const [collapseShow, setCollapseShow] = React.useState("hidden");

  const deleteAllCookies = () => {
    try {
      // Intenta eliminar las cookies
      Cookies.remove('User_id', { secure: true, sameSite: 'strict' });
      Cookies.remove('rol', { secure: true, sameSite: 'strict' });
      Cookies.remove('name', { secure: true, sameSite: 'strict' });
      Cookies.remove('email', { secure: true, sameSite: 'strict' });
  
      // Redirige al usuario a la página principal
      navigate('/');
    } catch (error) {
      // Muestra una alerta SweetAlert2 en caso de error
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar cookies',
        text: 'Ocurrió un error al eliminar las cookies.',
      });
      console.error('Error al eliminar cookies:', error);
      // Puedes agregar aquí cualquier otro manejo de errores que desees
    }
  };

  
  return (
    <>
      <nav className=" md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6 scrollbar-thin scrollbar-thumb-blueGray-300 scrollbar-track-blueGray-100">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/dashboard/"
          >
            <img
  src={LogoSidebar} // Reemplaza con la ruta de tu imagen
  alt="Logo Sidebar"
  className="hidden lg:block " // Clases para controlar el tamaño y el margen derecho, y ocultar en otros tamaños
/>

<img
  src={LogoSidebarMovil} // Reemplaza con la ruta de tu imagen
  alt="Logo Sidebar"
  className="lg:hidden" // Oculta en tamaños de pantalla grandes (lg) y muestra en sm y md
/>



          </Link>
          {/* User
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              ssss
            </li>
          </ul> */}
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    A jesucristo ven sin tardar
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>

                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

           {/* Panel admin  */}

             {/* Enlace al Panel Admin si el usuario tiene el rol adecuado */}
        {(rolUsuario === 'admin' || rolUsuario === 'superadmin') && (
       <div>
       {/* Divider */}
            <hr className="my-4 md:min-w-full"/>
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Panel Admin
            </h6>
          <Link
  className={
    "text-xs uppercase py-3 font-bold flex items-center " +
    (window.location.href.indexOf("/admin/dashboard") !== -1
      ? "text-lightBlue-500 hover:text-lightBlue-600"
      : "text-blueGray-700 hover:text-blueGray-500")
  }
  to="/dashboard/admin"
>
  <div className="bg-blue-500 p-2 rounded-lg shadow-md">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
</svg>


  </div>


  <div className="flex items-center ml-4">
    Dashboard
  </div>

</Link>
          </div>
        )}

      
            {/* Navigation */}

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Usuario
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
              <Link
  className={
    "text-xs uppercase py-3 font-bold flex items-center " +
    (window.location.href.indexOf("/admin/dashboard") !== -1
      ? "text-lightBlue-500 hover:text-lightBlue-600"
      : "text-blueGray-700 hover:text-blueGray-500")
  }
  to="/dashboard/"
>
  <div className="bg-blue-500 p-2 rounded-lg shadow-md">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>

  </div>


  <div className="flex items-center ml-4">
    Perfil de Usuario
  </div>

</Link>

              </li>

              <li className="items-center">
              <Link
  className={
    "text-xs uppercase py-3 font-bold flex items-center " +
    (window.location.href.indexOf("/admin/dashboard") !== -1
      ? "text-lightBlue-500 hover:text-lightBlue-600"
      : "text-blueGray-700 hover:text-blueGray-500")
  }
  to="/dashboard/uploadConsignment"
>
  <div className="bg-blue-500 p-2 rounded-lg shadow-md">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
</svg>

  </div>


  <div className="flex items-center ml-4">
    Subir Consignacion
  </div>

</Link>
              </li>

              <li className="items-center">
              <Link
  className={
    "text-xs uppercase py-3 font-bold flex items-center " +
    (window.location.href.indexOf("/admin/dashboard") !== -1
      ? "text-lightBlue-500 hover:text-lightBlue-600"
      : "text-blueGray-700 hover:text-blueGray-500")
  }
  to="/dashboard/uploadDocuments"
>
  <div className="bg-blue-500 p-2 rounded-lg shadow-md">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
</svg>

  </div>


  <div className="flex items-center ml-4">
    Subir documentos
  </div>

</Link>
              </li>

              <li className="items-center">
              <Link
  className={
    "text-xs uppercase py-3 font-bold flex items-center " +
    (window.location.href.indexOf("/admin/dashboard") !== -1
      ? "text-lightBlue-500 hover:text-lightBlue-600"
      : "text-blueGray-700 hover:text-blueGray-500")
  }
  to="/dashboard/uploadCis"
>
  <div className="bg-blue-500 p-2 rounded-lg shadow-md">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
</svg>

  </div>


  <div className="flex items-center ml-4">
   SUBIR Cis
  </div>

</Link>

              </li>

  {/* Divider */}
  <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Log out
            </h6>
<li className="items-center">
<Link
className={
"text-xs uppercase py-3 font-bold flex items-center " +
(window.location.href.indexOf("/admin/dashboard") !== -1
? "text-lightBlue-500 hover:text-lightBlue-600"
: "text-blueGray-700 hover:text-blueGray-500")
}
to="/"
>
<div className="bg-blue-500 p-2 rounded-lg shadow-md">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
</svg>


</div>


<div className="flex items-center ml-4" onClick={deleteAllCookies}>
  Cerrar session
</div>

</Link>
</li>
            </ul>

           
          </div>
        </div>
      </nav>
    </>
  );
};

export default SiderAuth;
