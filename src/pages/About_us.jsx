import HeaderLanding from "../components/common/Header/HeaderLanding";
import About_usContent from "../components/About_us/About_usContent";
import Footer_common from "../components/common/Footer/Footer_common";
import Whatssapcomponent from "../components/common/Whatssap/Whatssap";
import Banner from "../components/About_us/Banner";
import Donantes from "../components/common/Donar/Donar";
function About_us() {
  return (
   <>
    <HeaderLanding></HeaderLanding>
     <About_usContent></About_usContent>
     <Banner></Banner>
     <Donantes></Donantes>
       {/* Botones chat y DOnar */}
     <Whatssapcomponent/>
    <Footer_common></Footer_common>
   </>
  );
}

export default About_us;