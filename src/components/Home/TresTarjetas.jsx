import React from 'react';

const Tarjeta = () => {
  return (
    <div className="bg-[#1465BB] max-w-sm w-full  border border-gray-200 rounded-lg shadow  mb-4">
      <a href="#">
        <img
          className="w-full rounded-t-lg"
          src="/docs/images/blog/image-1.jpg"
          alt=""
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Plan Estratégico</h5>
        </a>
        <p className="mb-3 font-normal text-white dark:text-gray-400">
        El plan estratégico de la Fundación a Jesucristo Ven sin Tardar
         integra información importante que permite al equipo staff de
          la organización, sus directivas, personal administrativo,
           social, operacional y asistencial contar con un lenguaje 
           unificado, el cual permita generar procesos estandarizados
            de conceptualización, planeación, organización, diseño,
             implementación y evaluación de acciones transformacionales,
              acciones y procesos de fortalecimiento al interior de la organización.
        </p>
      </div>
    </div>
  );
};

const Tarjeta_02 = () => {
  return (
    <div className=" max-w-sm w-full bg-[#1465BB] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
      <a href="#">
        <img
          className="w-full rounded-t-lg"
          src="/docs/images/blog/image-1.jpg"
          alt=""
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Plan Organizacional</h5>
        </a>
        <p className="mb-3 font-normal text-white dark:text-gray-400">
        Una organización requiere de un panorama general, específico y
         detallado que permita adaptarlo de acuerdo a la visión que tenga
          el equipo staff y las directivas, la cual debe estar alineada
           con las verdaderas necesidades de las comunidades, las poblaciones,
            públicos y territorios, de ahí la importancia de entender e 
            interpretar este plan que puede generar un proceso de transformación
             integral en la sociedad, impactando de forma positiva a todos los involucrados.
         </p>
       
      </div>
    </div>
  );
};

const Tarjeta_03 = () => {
  return (
    <div className=" max-w-sm w-full bg-[#1465BB] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
      <a href="#">
        <img
          className="w-full rounded-t-lg"
          src="/docs/images/blog/image-1.jpg"
          alt=""
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Conceptos</h5>
        </a>
        <p className="mb-3 font-normal text-white dark:text-gray-400">
        Los conceptos que se aplican en el diseño de este plan estratégico de la Fundación Ven a Jesucristo sin Tardar son:
        Apreciación,Delegación, Empatía, Honestidad, Liderazgo, Organización, Orientación, Planeación, Proyección, Transformación
        </p>
      </div>
    </div>
  );
};

const TresTarjetas = () => {
  return (
    <>
     <h1 class=" title_caracteristicas">Nuestro objetivo es Ayudar</h1>

     <div className="p-7 flex flex-wrap justify-between">
      <Tarjeta />
      <Tarjeta_02 />
      <Tarjeta_03 />
    </div>

    </>
   
  );
};

export default TresTarjetas;
