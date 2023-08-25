import MisionImg from '../../assets/img/Informacion_01.jpg'
import VIsionImg from '../../assets/img/SobreNosotros_01.jpeg'
function Mision() {
    return (
     <>
     {/* <!-- component --> */}
<section class="container bg-white dark:bg-gray-900">
    <div class="container px-6 py-10 mx-auto">
        
        <div class="mt-8 lg:-mx-6 lg:flex lg:items-center">
            <img class="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src={MisionImg}alt="Img_Mision"/>

            <div class="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                <p class="text-sm text-blue-500 uppercase  font-popins font-bold  text-2xl">Misión</p>

                <p class="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm font-popins   text-2xl">
                Implementar la transformación social integral como mecanismo que
                 permita impactar positivamente en la sociedad, medio ambiente
                  y economía, desarrollando acciones transformacionales que
                   cambien la dinámica de los territorios a travéz del
                    fortalecimiento del ser humano.
                </p>

            </div>
        </div>
    </div>
</section>
     </>
    );
  }

function Vision() {
    return (
     <>
     {/* <!-- component --> */}
     <section className="md:mt-[90px] md:mb-[95px] bg-white dark:bg-gray-900 ">
      <div className="container px-6 py-10 mx-auto">
        <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
          <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
            <p className="text-sm text-blue-500 uppercase font-poppins font-bold text-2xl">Visión</p>

            <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm font-poppins   text-2xl">
               Somos una organización social comprometida con la vida
               y la transformación social integral de alcance global,
               a través de iniciativas, acciones colaborativas y
               estratégicas que contribuyan con el mejoramiento
               de las condiciones de vida para el ser humano y
               los entornos naturales a través de la aplicación de principios universales.
            </p>

         
          </div>

          <img className="object-cover w-full lg:w-1/2 rounded-xl h-72 lg:h-96" src={VIsionImg} alt="" />
        </div>
      </div>
    </section>
     </>
    );
  }

function About_usContent() {
    return (
     <>
     <div className="mt-[80px] container mx-auto px-5 lg:px-[50px]">
          <Mision></Mision>
          <Vision ></Vision>
      </div>

     
     </>
    );
  }
  
  export default About_usContent;