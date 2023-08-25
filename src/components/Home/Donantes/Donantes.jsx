import './donantes.css'
import Onu from '../../../assets/img/Onu.png'
function Donantes() {
    return (
     <>
<section class="donantes ">
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h2 class="text-center titleDonante">Nuestros Socios y Donantes</h2>
        <p class="text-center parrafoDonante">Gracias a nuestros generosos donantes, podemos seguir haciendo la diferencia en la comunidad.</p>
      </div>
    </div>
    <div class="containerImg">
      <div class="col-md-12 text-center">
        <div class="donantes-img-container">
          <img src={Onu} alt="Donante 2" class="donantes-img img-fluid" id="onu"/>
        </div>
      </div>
  </div>
  </div>
</section>
     </>
    );
  }
  
  export default Donantes;