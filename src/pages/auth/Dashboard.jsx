import React from "react";
//componentes
import NavbarAuth from "../../components/auth/NavbarAuth";
import SiderAuth from "../../components/auth/SiderAuth";
import HeaderStats from "../../components/auth/Headers/HeaderStats";
import UserPerfil from "../../components/auth/Perfil/UserPerfil";
import UploadConsignment from "../../components/auth/Upload/Cis/Consignment/Consigment";
import UploadDocument from "../../components/auth/Upload/Cis/Consignment/Documents/UploadDocuments";
import Medicina_info from "../../components/auth/Perfil/InformationUser/Medicina_info";
import Familiares_info from "../../components/auth/Perfil/InformationUser/Familiares_info";
import Referencias_info from "../../components/auth/Perfil/InformationUser/Referencias";
import AdminContent from "../../components/auth/Admin/AdminContent";
import HeaderNormal from "../../components/auth/Headers/HeaderNormal";
import Error404 from "../Error404";
//library
import { useLocation } from 'react-router-dom'; // Importa useLocation

function Dashboard() {
  const location = useLocation(); // Obtiene la ruta actual

  // Función para renderizar el contenido en función de la ruta
  const renderContent = () => {

    //Consignacion
    if (location.pathname === "/dashboard/admin") {
      return <AdminContent />;
    }

    //Documentos
    else if (location.pathname === "/dashboard/uploadConsignment") {
      return <UploadConsignment />;
    } 

    //Documentos
    else if (location.pathname === "/dashboard/uploadDocuments") {
      return <UploadDocument />;
    } 
    //Perfil usuario
    else if (location.pathname === "/dashboard/Medicina_info") {
      return <Medicina_info />;
    }

    else if (location.pathname === "/dashboard/Familiares_info") {
      return <Familiares_info />;
    }

    else if (location.pathname === "/dashboard/Referencias_info") {
      return <Referencias_info />;
    }

    else if (location.pathname === "/dashboard/") {
      return <UserPerfil />;
    }
     else {
      return <Error404 />;
    }
  };

  //mostar componente en url especifica¿
  // Verificar si la ruta actual coincide con la URL en la que deseas mostrar HeaderStats
  const shouldShowHeaderStats = location.pathname === '/dashboard/admin';


  return (
    <>
      <SiderAuth></SiderAuth>
      <div className="relative md:ml-64 bg-blue-500">
        <NavbarAuth></NavbarAuth>
        {/* Header */}
       
        {shouldShowHeaderStats ? <HeaderStats /> : <HeaderNormal />}
        <div className="px-4 md:px-10 mx-auto w-full -m-24 bg-[#F1F5F9]">
          {/* Renderiza el contenido en función de la ruta */}
          {renderContent()}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
