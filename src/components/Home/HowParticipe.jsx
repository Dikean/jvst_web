import './HowParticipe.css'

function HowParticipe() {
  return (
    <>

<div className="bg-[#1465BB]" id="How_it_works?">
  <section className="container mx-auto ">
    <div  className="flex flex-col md:flex-row">
      <div className="ParticipeContent mb-12 md:w-1/3 p-12">
        {/* Contenido de la primera columna (1/3) */}
        <h1 className="titleparticipar mt-5 text-center text-white">¿Cómo participar?</h1>
        <p className="mt-3 parrafoparticipar sm:text-center ">A continuación, detallamos los pasos que debes seguir para formar parte de este Programa</p>
      </div>
      <div  className=" ParticipeContent md:w-2/3">
        {/* Contenido de la segunda columna (2/3) inicio paso uno y dos */}
        <div className="">
          <div className="flex flex-col md:flex-row" id="fila1">
            <div className="md:w-1/2 p-5">
              {/* Contenido de la primera columna (1/2) */}
              <div className="bg-white shadow p-4 pr-5 mb-4 squarework">
                <div className="flex flex-row">
                  <div className="md:w-1/4 md:d-block md:d-md-none md:d-lg-block">
                    {/* Contenido de la primera columna (2/6) con el círculo */}
                    <div className="circle-donar">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6" viewBox="0 0 24 24" style={{
    fill: 'rgba(255, 255, 255, 1)',
    transform: '',
    msFilter: ''
  }}><path d="M12 15c-1.84 0-2-.86-2-1H8c0 .92.66 2.55 3 2.92V18h2v-1.08c2-.34 3-1.63 3-2.92 0-1.12-.52-3-4-3-2 0-2-.63-2-1s.7-1 2-1 1.39.64 1.4 1h2A3 3 0 0 0 13 7.12V6h-2v1.09C9 7.42 8 8.71 8 10c0 1.12.52 3 4 3 2 0 2 .68 2 1s-.62 1-2 1z"></path><path d="M5 2H2v2h2v17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4h2V2H5zm13 18H6V4h12z"></path></svg>
                    </div>
                  </div>

                  <div className="md:w-3/4">
                    {/* Contenido de la segunda columna (4/6) */}
                    <h5 className="font-germania">Paso uno</h5>
                    🛑🛑🛑🛑🛑
                    <p>👉Realice la Consignacion en las cuentas autorizadas.</p>
                    <p>
                        <span class="H9lube">
                            <div class="flex flex-inline mt-2  eqA2re NjwKYd Vwoesf LCUpfd" aria-hidden="true">
                                <img class="XNo5Ab"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAXVBMVEVHcEwsKSgsKiksKigsKiksKikrJigsKSksKCksKSgsKiksKikrKSkkIiEaGBYQCwkCAABSUVCOjY2urq3Pz89ubGybmpq+vr7y8fH////e3t5eXV02NDRAPj6CgYGCTgCIAAAADXRSTlMAU5bM6/8MpBuP7u8hunAH+QAAATFJREFUeAGFk1USxEAIRGPEB4h77n/LNYZ41b7fxpphnAOu5wcAge+5zgNhBAei+KoncME7p6dwIwt3PYdH8i0fDhiDZEDQGplqSIxFWdWNjUhF90QlLtquH770DELy1WPRi3rYKY5NxD9Ww4EOdR+fANu/GZSxqyYDls9+QeBf864s+AMRguD+RpQedTkzfVQztd1Yoi7UBwsSES9qZLBGfCfYlsCNiILdRaAzctGpdDbiiL5KrlJX6wKCtMBd67t1ZmZ1EciQrCtoF/7NWupz+GKT6m9uC/wzUh9ceLIobIduYiQ1srtw7arNTAawu7uQx7Lg0cdq9LFCUHi0RqqG7VXFp4PGyhpBcz5tPWmz1C2IKmS3oyWEI+H/s1fC7C6nkq94Vz1xLsTnz7un//v+byhOJdTeK04XAAAAAElFTkSuQmCC"
                                style={{
                                  height: '18px',
                                  width: '18px'
                                }} alt="" data-atf="1" data-frt="0"/>&ensp;BANCOLOMBIA
                            </div>
                        </span>
                        Ahorros
                        47400010109
                    </p>
                    <p>Ó por</p>
                    <p>
                        <span class="H9lube">
                            <div class="flex flex-inline mt-2 eqA2re NjwKYd Vwoesf LCUpfd" aria-hidden="true">
                                <img class="XNo5Ab"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACCklEQVR4AWKgFIyCf9plgOrLACKCIArDpxKibKFI0iUpke0qAC5AVCpIJ2yRqpSpIISDCEiVQLUASioVqDgCBAcIYSEARgDg9Q/3uMZcrtsZtHwA8//73pv33nhAFPDcKT2++uAW5IC42zrvgGAWSEAF8sBzIe6BCFDz1TMNZvapu3qKduoy9J5cZ3Em78JACCi1eKCEKZkY/cFE1TTdtCzSV882mwhtigepzVPqa5hlwZIMJMY4KnZMnDQGQU/NtGSBcuGojLcuCJW+Sio7AJE6BIfFYnDtWBZS6Jd7pfKA9urnYosz3UfXBAOKPEiXNMDiL63LVoQZFG6xCQk8k7gP6LNLqGKyaoBN4AqzCd9kIA2I8+6C/rZ5arp8kqXC76PqnYkzGW8uMndLFIffu+LcABqWuUeoVpu8eOBO5wzUGHdLoQ8aUvi7F87EUV8srsj+CD8gZng868QAekuxgbSeAgmIJx4q1rqBt/Y1Fg+MQwcQg8ZhvR6M4pqJSZ77CkxBa+KrtTO/i+vRYCNDIztWDCzXzoSV7AJCda649aB+Amd1VLyOIRVZHCRjiEeJuN9H50aAVv2nQZUaFlzUoa0VPFR7XzlGkLbi6Tdp8w0QATIZMYgz9lZ13hsY3YhBPOfiNSQA6UYO25Zk8uyeO6oefusmbjUTEvgq3EAo9KvnKhI5EAKI/cPvGzeiv67WVcDqAAAAAElFTkSuQmCC"
                                style={{
                                  height: '18px',
                                  width: '18px'
                                }} alt="" data-atf="1" data-frt="0"/>&ensp;NEQUI
                            </div>
                        </span>
                            301 725 4451
                            Arelis Nagle Baldonado
                    </p>
                  </div>

                </div>
              </div>
            </div>
            <div className="md:w-1/2 p-5">
              {/* Contenido de la segunda columna (1/2) */}
              <div className="bg-white shadow p-4 pr-5 mb-4 squarework">
                <div className="flex flex-row">
                  <div className="md:w-1/4 md:d-block md:d-md-none md:d-lg-block">
                    {/* Contenido de la primera columna (2/6) con el círculo */}
                    <div className="circle-donar">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
               
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    {/* Contenido de la segunda columna (4/6) */}
                    <h5 className="font-germania">Paso dos</h5>
                    🛑🛑🛑🛑🛑
                    🛑🛑🛑🛑🛑
                  <p>📌Diligencie el Formulario y adjunte el Baucher. Por precaución, coloque su nombre legible en el Baucher.</p>
                  <p className='lg:mb-[30px]'>👇👇👇👇</p>
                    <a href='/Register' className='mt-5 mb-[25px] h-8 w-8 bg-blue-500 text-white p-4 rounded '>
                      Registrate
                    </a>
                    <div className='mb-5'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Contenido de la segunda columna (2/3) inicio paso tres y cuatro */}
        <div className="container">
          <div className="row" id="fila1">
        
            {/* square 2 */}
            <div className="">
          <div className="flex flex-col md:flex-row" id="fila1">
            <div className="md:w-1/2 p-5">
              {/* Contenido de la primera columna (1/2) */}
              <div className="bg-white shadow p-4 pr-5 mb-4 squarework">
                <div className="flex flex-row">
                  <div className="md:w-1/4 md:d-block md:d-md-none md:d-lg-block">
                    {/* Contenido de la primera columna (2/6) con el círculo */}
                    <div className="circle-donar">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                    
                    </div>
                  </div>

                  <div className="md:w-3/4 ">
                    {/* Contenido de la segunda columna (4/6) */}
                    <h5 className="font-germania">Paso tres</h5>
                    🛑🛑🛑🛑🛑
                    <p>👉CARPETA DE DOCUMENTOS PROYECTO DRAGONES AMARILLOS.</p>
                    <ul>
                          <ol>🛑 Copia (1) Soporte de Pago o Voucher</ol>
                          <ol>🛑 Copia (1) Cédula ampliada al 150%</ol>
                          <ol>🛑 Copia (1) Pasaporte ampliado al 150%.
                              <p>👉Foto de Pasaporte a libro Abierto a color en JPG ó PNG</p>
                          </ol>
                          <ol><span class="H9lube">
                                  <div class="flex flex-inline mt-2  eqA2re NjwKYd Vwoesf LCUpfd" aria-hidden="true">🛑 RUT -&ensp;
                                      <img class="XNo5Ab"
                                          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIAQEKAQkLDRYPDQwMDQ8UFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OisBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzg3Nys3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc1ODU3KzIrOCstK//AABEIABAAEAMBEQACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAEBQP/xAAjEAACAQQBAwUAAAAAAAAAAAABAgMEBgcRABIhMQUTIkGB/8QAFwEAAwEAAAAAAAAAAAAAAAAAAwQGBf/EAB0RAAIDAAIDAAAAAAAAAAAAAAECAAMRUXEEMWH/2gAMAwEAAhEDEQA/ALVLFSvEGuTNQs9/tPac6/Rx61DxIetKyus+HoxL0iinaexMjJkeNCA+gyld+Ox4lYkKaQELo2gQlPX04p44rrwTHdzR7+fW6k7O++ubFtJ0kGAS+sIFZAc+zV/UFanaCw8bR41RyC/SWYtrx3PE3q5hG8gFCiLgPuf/2Q=="
                                          style={{
                                            height: '18px',
                                            width: '18px'
                                          }} alt="" data-atf="1" data-frt="0"/>&ensp;DIAN
                                  </div>
                              </span>
                          </ol>
                          <ol>🛑 Factura o documento a nombre propio, con dirección igual a la registrada en el RUT</ol>
                          <ol>🛑 Antecedentes Penales ( Contraloría, Procuraduría y Policía Nacional./ Extranjeros Documento equivalente) </ol>
                          <ol>🛑 Formato Identificación Personal. (Descargar de la Plataforma) </ol>
                          <ol>🛑 Formato Adicional. (Descargar de la Plataforma) </ol>
                      </ul>
                      <p>👉NOTA: Estos documentos deben permanecer en carpeta física.</p>
                  </div>
                  
                </div>
              </div>
            </div>
            <div className="md:w-1/2 p-5">
              {/* Contenido de la segunda columna (1/2) */}
              <div className="bg-white shadow p-4 pr-5 mb-4 squarework">
                <div className="flex flex-row">
                  <div className="md:w-1/4 md:d-block md:d-md-none md:d-lg-block">
                    {/* Contenido de la primera columna (2/6) con el círculo */}
                    <div className="circle-donar">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    {/* Contenido de la segunda columna (4/6) */}
                    <h5 className="font-germania">Paso cuatro</h5>
                    🛑🛑🛑🛑🛑
                    <p>👉Grupos TELEGRAM.</p>
                                    <p>Serán ingresados a diversos grupos de Whatsapp y Telegram.</p>
                                    <p>Favor estar atentos a las reuniones y recomendaciones dados en estos grupos oficiales</p>
                                    <p>👇👇👇👇</p>
                                    <p>Guardar mucha Prudencia con la información suministrada</p>
               
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>  
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

    </>
  );
}

export default HowParticipe;