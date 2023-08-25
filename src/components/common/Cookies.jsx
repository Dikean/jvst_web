import React, { useState, useEffect } from 'react';

function CookiesComponent() {
  const [acceptedCookies, setAcceptedCookies] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted) {
      setAcceptedCookies(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setAcceptedCookies(true);
  };

  return (
    <>
      {!acceptedCookies && (
        <section className="fixed max-w-2xl p-4 mx-auto bg-white border border-gray-200 md:gap-x-4 left-12 bottom-16 dark:bg-gray-900 md:flex md:items-center dark:border-gray-700 rounded-2xl">
          <div className="flex items-center gap-x-4">
            <span className="inline-flex p-2 text-blue-500 rounded-lg shrink-0 dark:bg-gray-800 bg-blue-100/80">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* El contenido del SVG */}
              </svg>
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Utilizamos cookies para asegurarnos de brindarle la mejor experiencia en nuestro sitio web. Si continúa, nos está autorizando.
              {/* <a href="#" className="text-blue-500 hover:underline">Leer políticas de cookies</a>. */}
            </p>
          </div>
          <div className="flex items-center mt-6 gap-x-4 shrink-0 lg:mt-0">
            <button
              onClick={handleAcceptCookies}
              className="text-xs w-1/2 md:w-auto font-medium bg-gray-800 rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none"
            >
              Aceptar cookies
            </button>
          </div>
        </section>
      )}
    </>
  );
}

export default CookiesComponent;
