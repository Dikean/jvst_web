
import './information.css'
import Imagen01 from '../../../assets/img/Informacion_01.jpg'
function Information() {
    return (
     <>
<section class="information">
  <div class="image-container">
    <img src={Imagen01} alt="Imagen de fondo"/>
    <div class="content-box">
      <div class="container_information">
        <h4>Acerca de Nosotros</h4>
        <h2>Nuestro objetivo es ayudar</h2>
        <p>Unidos por la ayuda, extendemos la mano hacia un mundo mejor. 
          Nuestra pasión es servir y marcar la diferencia
           en la vida de quienes nos rodean. </p>
           <div class="container_boxazul">
            <div class="row">
              <div class="col-md-6 mt-5">

                <div class="icono-texto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>

                  <span>Colaboración comunitaria </span>
                </div>      
                
                <div class="icono-texto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
</svg>

                  <span>Educación inclusiva </span>
                </div>  

                <div class="icono-texto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
</svg>

                  <span>Sostenibilidad ambiental</span>
                </div>  
                
              </div>
              <div class="col-md-6 d-none d-sm-block">
                <div class="blue-box">
                  <div class="content_blue_box">
                    <h1>10 +</h1>
                    <p>Años de experiencia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
      </div>
    </div>
  </div>
</section>

     </>
    );
  }
  
  export default Information;