'use client';

import { Footer } from 'flowbite-react';
import { BsDribble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

//COMPONENTS
import LogoFooterLg from '../../../assets/img/Logo_footer.png'
function Footer_common() {

  const fechaActual = new Date();
   const añoActual = fechaActual.getFullYear();

  return (
   <>
    <Footer container bgDark >
      <div className="w-full text-white">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
          <a href="/" className=" hidden lg:block">
          <img
           src={LogoFooterLg} // Asegúrate de importar la imagen correctamente para pantallas grandes
            alt="Logo jvst"
           className="ml-[135px] w-[200px] " // Esto asegurará que la imagen mantenga su proporción
           />
         </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="Enlaces Rapidos" />
              <Footer.LinkGroup col>
                <Footer.Link href="/About_us">
                 Quienes somos
                </Footer.Link>
                <Footer.Link href="#">
                Contacto
                </Footer.Link>
                <Footer.Link href="Register">
                Registro
                </Footer.Link>
                <Footer.Link href="/Login">
                  Login
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Siguenos" />
              <Footer.LinkGroup col>
              <Footer.Link href="https://www.facebook.com/profile.php?id=100093964540748&mibextid=ZbWKwL">
                  Facebook
                </Footer.Link>
                <Footer.Link href="https://instagram.com/ajesucristovensintardar?igshid=MzRlODBiNWFlZA==">
                  Instagram
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="/Privacy_policy">
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href="/Terms&Conditions">
                  Terms & Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        {/* Footer small */}
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            by="Dikean"
            href="https://dikean.org/"
            year={añoActual}
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon
              href="https://www.facebook.com/profile.php?id=100093964540748&mibextid=ZbWKwL"
              icon={BsFacebook}
            />
            <Footer.Icon
              href="https://instagram.com/ajesucristovensintardar?igshid=MzRlODBiNWFlZA=="
              icon={BsInstagram}
            />
          </div>
        </div>
      </div>
    </Footer>
   </>
  );
}

export default  Footer_common;
