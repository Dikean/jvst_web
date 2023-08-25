//library
'use client';
import React, { useState, useEffect } from "react";
import { Tabs } from 'flowbite-react';
import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
//componets
import CardBarChart from "../cards/CardBarChart";
import TableFacturacion from "./TableFacturacion";
import TableAllUser from "./TableAllUser";
import TableAllCIS from "./TableAllCis";
import TableAllConsigment from "./TableAllConsigment";
import TableAllDocuments from "./TableAllDocuments";

import FooterAdmin from "../Footers/FooterAdmin";
export default function AdminContent() {

  const [valorInput, setValorInput] = useState('');

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setValorInput(inputValue);
    console.log('Valor del input en Componente A:', inputValue);
  };



  return (
    <>
      {/* Separador */}
      <div className="flex items-center mb-2">
    <div className="bg-blue-500 p-2 rounded-lg shadow-md">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
    </svg>
  </div>
  <h1 className="p-5 font-bold text-xl">Datos </h1>
      </div>


       {/* end Separador */}
     <div className="flex flex-wrap ">
        <div className="w-full lg:w-8/12 px-4">
          <CardBarChart />
        </div>
        <div className="w-full lg:w-4/12 px-4 ">
     
        </div>
      </div>
      {/* Separador */}
      <div className="flex items-center">
      <div className="bg-blue-500 p-2 rounded-lg shadow-md">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
</svg>

    </div>
    <h1 className="p-5 font-bold text-xl">Tablas</h1>
     </div>
    {/* end Separador */}

{/* sEARCH */}
<div class="mt-6 md:flex md:items-center md:justify-between">
       
       <div class="relative flex items-center mt-4 md:mt-0">
           <span class="absolute">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
               </svg>
           </span>

           <input type="text" id="search" 
           value={valorInput}
           onChange={handleInputChange}
           placeholder="Search" class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
       </div>
   </div>

      <Tabs.Group
      className="mt-2"
       aria-label="Tabs with icons"
      style="underline"
    >
      {/* Usuarios */}
      <Tabs.Item
        active
        icon={HiUserCircle}
        title="Usuarios"
      >
      <TableAllUser valorProp={valorInput} />
      </Tabs.Item>
       {/* Documentos */}
      <Tabs.Item
        icon={MdDashboard}
        title="Documentos"
      ><TableAllDocuments valorProp={valorInput}/>
      </Tabs.Item>
       {/* Consignaciones */}
      <Tabs.Item
        icon={HiAdjustments}
        title="Consignaciones"
      ><TableAllConsigment valorProp={valorInput} />
      </Tabs.Item>
       {/* Cis */}
      <Tabs.Item
        icon={HiClipboardList}
        title="cis"
      >
        <TableAllCIS valorProp={valorInput}/> 
      </Tabs.Item>
    </Tabs.Group>

      <FooterAdmin/>
    </>
  );
}