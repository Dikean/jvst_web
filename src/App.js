//library
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

//database

//Components
import Inicio from './pages/Inicio';
import About_us from './pages/About_us';
import Login from './pages/Login';
import Register from './pages/Register';
import Error404 from './pages/Error404';
import Dashboard from './pages/auth/Dashboard'; // Asegúrate de que esté correctamente importado
import Contact from './pages/Contact'
import Privacy_policy from './pages/Privacy_policy';
import Terms from './pages/Terms';
import Forgot_password from './pages/Forgot_password';
// Función para verificar el rol del usuario (simulado)
const checkUserRole = () => {
  
  // Simulando que obtienes el rol del usuario desde donde lo tengas almacenado
  const userRole = Cookies.get('rol');// Reemplaza con el rol real del usuario
  return userRole;
};

// Componente Dashboard con lógica de redireccionamiento
const DashboardWithAuthorization = () => {
  const userRole = checkUserRole();

  // Verificar si el rol del usuario está en los roles permitidos
  if (userRole === "user" || userRole === "admin" || userRole === "superadmin") {
    return <Dashboard></Dashboard>
  } else {
    // Redirigir si el rol no es permitido
    return <Navigate to="/error" />;
  }
};


function App() {

  //database


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/About_us" element={<About_us />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Forgot_password" element={<Forgot_password />} />
        <Route path="/Privacy_policy" element={<Privacy_policy />} />
        <Route path="/Terms&Conditions" element={<Terms />} />
        <Route path="/dashboard/*" element={<DashboardWithAuthorization />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
