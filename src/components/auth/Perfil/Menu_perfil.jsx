import React from "react";
import { Link } from 'react-router-dom';
// components

export default function Menu_perfil() {


  const isActive = (path) => {
    return window.location.pathname === path;
  };

  return (
    <>

<div className="flex items-center">
    <div className="bg-blue-500 p-2 rounded-lg shadow-md">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
    </svg>
  </div>
  <h1 className="p-5 font-bold text-xl">Perfil de Usuario</h1>
</div>

<ol class="sm:p-4 ml-1 mb-5 flex items-center w-full space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700  sm:space-x-4">
      {/* Boton*/}
      <Link to="/dashboard/" className={`flex items-center ${isActive("/dashboard/") ? "text-blue-600 dark:text-blue-500" : ""}`}>
     <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
       1
     </span>
      Personal
     <svg className="w-3 h-3 ml-2 sm:ml-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
     </svg>
    </Link>
   {/* Boton*/}
   <Link to="/dashboard/Medicina_info" className={`flex items-center ${isActive("/dashboard/Medicina_info") ? "text-blue-600 dark:text-blue-500" : ""}`}>
     <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
       2
     </span>
      Medicina
     <svg className="w-3 h-3 ml-2 sm:ml-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
     </svg>
    </Link>
    {/* Boton*/}
    <Link to="/dashboard/Familiares_info" className={`flex items-center ${isActive("/dashboard/Familiares_info") ? "text-blue-600 dark:text-blue-500" : ""}`}>
     <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
       3
     </span>
      Familiares 
     <svg className="w-3 h-3 ml-2 sm:ml-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
     </svg>
    </Link>
   {/* Boton*/}
   <Link to="/dashboard/Referencias_info" className={`flex items-center ${isActive("/dashboard/Referencias_info") ? "text-blue-600 dark:text-blue-500" : ""}`}>
     <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
       4
     </span>
      Referencias
    </Link>
</ol>

    </>
  );
}