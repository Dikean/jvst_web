import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
//Imagenes
import imagen from '../../assets/img/Carrousel_01.jpg'
import imagen02 from '../../assets/img/Carrousel_02.jpg'
import imagen03 from '../../assets/img/Carrousel_03.jpg'

const images = [
  imagen,
  imagen02,
  imagen03,
];

function Carrousel() {
  return (
    <div className="lg:mt-[5px]  mb-5 h-[650px] flex items-center justify-center">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={5000}
        showArrows={false}
        showStatus={false}
        showIndicators={true}
        showThumbs={false}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index}`}  className="h-[650px] object-cover w-full "/>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
              <p className='font-popins text-blue-500 font-bold  text-xl'>Ayudanos a contribuir</p>
              <h1 className='mt-2 font-popins font-bold  text-5xl'>Conoce Nuestra Fundación</h1>
              <p  className="mt-3 font-popins font-bold ">Somos una fundación comprometida con mejorar
               vidas y generar un impacto positivo en la sociedad.
               Únete a nuestra causa y juntos marquemos la diferencia.</p>
               {/* Botones */}
               <div className="mt-5 lg:mt-[35px] flex justify-center">
                <a  href="/#/Register" className="font-raleway bg-blue-500 text-white px-4 py-2 rounded shadowmr-5">Registrate</a>
                <a href="/#/Login" className="font-raleway bg-blue-500 text-white px-4 py-2 rounded shadow ml-5">Login</a>
             
                </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Carrousel;



