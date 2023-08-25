import React, { useEffect, useState } from "react";
import NavbarAuth from "../NavbarAuth";

import { UserApi } from "../../../services/UserApi";
import Cookies from 'js-cookie';

function PerfilUser() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const UserID = Cookies.get('User_id');
  const [DataPersonal, setDataPersonal] = useState([]);

  useEffect(() => {

    UserApi.obtenePorID(UserID)
    .then(response => {
      const dataArray = Object.values(response.data);
      if (Array.isArray(dataArray)) {
        console.log("Respuesta de la API operfil data:", response.data);
        setDataPersonal(response.data);
      } else {
        console.log("Usuario no tiene documentos");
        setDataPersonal([]); // Establecer documentos como un array vacío
      }
    })
    .catch(error => {
      console.error('Error al obtener documentos:', error);
    });
  

    const name = Cookies.get('name');
    setName(name);

    const email = Cookies.get('email');
    setEmail(email);
    
  }, [UserID]);

  return (
    <>
   
   <main className="profile-page mt-5">
        <section className="relative block h-500-px mt-[140px]">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {name}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                    {email}
                  </div>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                    {DataPersonal.city} - {DataPersonal.country}
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      {DataPersonal.about_me}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>


    </>
  );
}

export default PerfilUser;