
//Components
import HeaderLanding from "../components/common/Header/HeaderLanding";
import MapContact from "../components/Contact/Map";
import Footer_common from "../components/common/Footer/Footer_common";
import Whatssapcomponent from "../components/common/Whatssap/Whatssap";
import Contact_us from "../components/Contact/Contact_us";
import Donantes from "../components/common/Donar/Donar";
function Contact() {
    return (
     <>
     <HeaderLanding></HeaderLanding>
     <Contact_us></Contact_us>
     <MapContact></MapContact>
       {/* Botones chat y DOnar */}
     <Whatssapcomponent/>
     <Donantes></Donantes>
     <Footer_common></Footer_common>
     </>
    );
  }
  
  export default Contact;