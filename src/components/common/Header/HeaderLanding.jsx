'use client';

import { Dropdown, Navbar } from 'flowbite-react';
import Logo from '../../../assets/img/Logo.png'
import LogoMovil from '../../../assets/img/LogoMovil.png'
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function HeaderLanding() {

  const location = useLocation();
  const specificUrl = '/'; //Inicio
  const About_us_Url = '/About_us'; //Quienes somos
  const Contact_Url = '/Contact'; //Contacto
   
  //url
  const Inicio = location.pathname === specificUrl;
  const About_us = location.pathname === About_us_Url;
  const Contact = location.pathname === Contact_Url;

    return (
      <Navbar
      fluid
      className="shadow" 
      style={{ position: 'fixed', width: '100%', top: '0', zIndex: 300 }}
    >
      {/* Logo */}
      <Navbar.Brand href="/" >
        
      <a href="/" class=" hidden md:block flex items-center lg:ml-[130px]">
      <img src={Logo} class="" alt="Logo Header" />
      </a>

      <a href="/" class="block sm:hidden flex items-center ">
      <img src={LogoMovil} class="" alt="Logo Header" />
      </a>
      </Navbar.Brand>
      {/* Menu */}
      <div className="flex md:order-2 lg:mr-[150px]">
        <Dropdown
          inline
          label={<>
             <div className="inline-flex items-center font-popins">
             <img
          className="w-5 h-5 mr-2 rounded-full"
          src="https://logodownload.org/wp-content/uploads/2023/05/bandeira-colombia-flag.png"
          alt="Descripción de la imagen"
        />
        Español (CO)
      </div>
          </>}
        >
          <ul class="py-2 font-medium" role="none">
          <li>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
              <div class="inline-flex items-center font-popins">
              <img
          className="w-5 h-5 mr-2 rounded-full"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/800px-Flag_of_the_United_States.svg.png"
          alt="Descripción de la imagen"
        />
            English (US)
      
              </div>
            </a>
          </li>
        </ul>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      {/* Menu Movil */}
      <Navbar.Collapse>
        <Navbar.Link
          active
          href="/"
         
        >
          <p className={Inicio ? 'text-blue-500 font-popins hover:text-blue-800' : 'text-black font-popins'}>
            Inicio
          </p>
        </Navbar.Link>
        <Navbar.Link href="/About_us">
          <p className={About_us ? 'text-blue-500  font-popins hover:text-blue-800' : 'text-black font-popins'}>
            Quienes somos
          </p>
          
        </Navbar.Link>
        <Navbar.Link href="/Contact">
        <p className={Contact ? 'text-blue-500 font-popins hover:text-blue-800' : 'text-black font-popins'}>
            Contacto
          </p>
        </Navbar.Link>
        <Navbar.Link href="/Login" 
        >
          <p className='text-black font-popins'>
            Login
          </p>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
    );
  }

  
  
  export default HeaderLanding;