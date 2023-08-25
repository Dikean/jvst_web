import HeaderLanding from "../components/common/Header/HeaderLanding";
import Footer_common from "../components/common/Footer/Footer_common";
import ImgTerms from '../assets/img/Terms_of_service.jpg'
function Terms() {
    return (
     <>
 <HeaderLanding></HeaderLanding>
 <section class="lg:mt-[110px] mt-8 mb-[50px] bg-white dark:bg-gray-900 ">
    <div class="container px-6 py-12 mx-auto">
     

        <img class="object-cover w-full h-64 mt-10 rounded-lg lg:h-96" src={ImgTerms} alt=""/>
        
        <div class="mt-10">

            <h1 className="font-poppins font-bold text-3xl">Poli­tica de Privacidad para a Jesucristo ven sin tardar</h1>
            <p className="mt-2 font-poppins ">Bienvenido(a) a Jesucristo ven sin tardar. Antes de utilizar nuestro sitio
             web y servicios, te pedimos que leas detenidamente los siguientes terrminos y condiciones:</p>

             <div className="mt-5">
             <h1 className="font-poppins font-bold text-3xl">1. Aceptacion de los terrminos</h1>
             <p className="mt-2 font-poppins ">Al acceder y utilizar nuestro sitio web,
             estas aceptando cumplir con estos terminos y condiciones. Si no estas
              de acuerdo con alguno de estos terminos, por favor no utilices nuestro sitio web.</p>
             </div>

             <div className="mt-5">
             <h1 className="font-poppins font-bold text-3xl">2. Uso del Sitio Web</h1>
             <p className="mt-2 font-poppins ">El contenido de nuestro sitio web es solo para fines
              informativos. No garantizamos la precision, integridad o actualidad
               del contenido. El uso del sitio web es bajo tu propio riesgo y no
                nos hacemos responsables por cualquier perdida o dato que puedas
                 sufrir al utilizarlo.</p>
             </div>

             <div className="mt-5">
             <h1 className="font-poppins font-bold text-3xl">3. Propiedad Intelectual</h1>
             <p className="mt-2 font-poppins ">Todos los derechos de propiedad intelectual
              del contenido y materiales del sitio web son propiedad de
               jesucristo ven sin tardar o de terceros con licencia.
                Esta prohibido copiar, distribuir, transmitir o modificar 
                cualquier parte del contenido sin nuestro consentimiento expreso por escrito.</p>
             </div>

             <div className="mt-5">
             <h1 className="font-poppins font-bold text-3xl">4. Enlaces a Sitios de Terceros</h1>
             <p className="mt-2 font-poppins ">Nuestro sitio web puede contener enlaces
              a sitios web de terceros. No nos hacemos responsables por el 
              contenido o las practicas de privacidad de esos sitios. Te
               recomendamos revisar las poli­ticas de privacidad y terminos 
               de uso de esos sitios antes de utilizarlos.</p>
             </div>

             <div className="mt-5">
             <h1 className="font-poppins font-bold text-3xl">5. Modificaciones</h1>
             <p className="mt-2 font-poppins ">Nos reservamos el derecho de modificar o actualizar
              estos terminos en cualquier momento. Te recomendamos revisar
               periodicamente esta pÃ¡gina para estar informado sobre cualquier cambio..</p>
             </div>

             <div className="mt-5">
             <h1 className="font-poppins font-bold text-3xl">6. Limitacion de Responsabilidad</h1>
             <p className="mt-2 font-poppins ">En la maxima medida permitida por la ley, 
             a Jesucristo ven sin tardar no sera responsable por ningÃºn dato directo,
              indirecto, incidental, especial o consecuente que resulte del uso o
               la imposibilidad de uso del sitio web.</p>
             </div>

             <div className="mt-5">
             <h1 className="font-poppins font-bold text-3xl">7. Ley Aplicable</h1>
             <p className="mt-2 font-poppins ">Estos terminos y condiciones se regiran
             e interpretaran de acuerdo con las leyes de Colombia, sin dar efecto
              a ningun principio de conflictos de leyes.</p>
             </div>

             <div className="mt-5">
             <h1 className="font-poppins font-bold text-3xl">8. Contacto</h1>
             <p className="mt-2 font-poppins ">Si tienes preguntas o inquietudes sobre estos
             terminos de servicio, por favor contactanos a traves de
               Funajesucristovensintardar@gmail.com.
             Gracias por utilizar nuestro sitio web y por apoyar a a Jesucristo ven sin tardar.</p>
             </div>

          

        </div>
    </div>
</section>
<Footer_common></Footer_common>
     </>
    );
  }
  
  export default Terms;