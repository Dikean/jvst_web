import { HashRouter, Route } from 'react-router-dom';

import HeaderLanding from "../components/common/Header/HeaderLanding";
import Footer_common from "../components/common/Footer/Footer_common";
import TresTarjetas from "../components/Home/TresTarjetas";
import Carrousel from "../components/Home/Carrosel";
import Whatssapcomponent from "../components/common/Whatssap/Whatssap";
import DonarComponent from "../components/common/Donar/Donar";
import HowParticipe from "../components/Home/HowParticipe";
import CookiesComponent from "../components/common/Cookies";
import Information from "../components/Home/information/Information";
import Number from "../components/Home/Number/Number";
import Donantes from "../components/Home/Donantes/Donantes";
import CardHomeComponent from "../components/Home/Card/CardHome";
function Inicio() {
  return (
   <>
   <div className="bg-white">
   <HeaderLanding></HeaderLanding>
   <Carrousel></Carrousel>
   <TresTarjetas></TresTarjetas>
   <Information/>
   <Number></Number>
   <Donantes></Donantes>
   <HowParticipe/>
   {/* Botones chat y DOnar */}
   <Whatssapcomponent/>
   <DonarComponent/>
   <CookiesComponent/>
   <Footer_common></Footer_common>
   </div>
   </>
  );
}

export default Inicio;
