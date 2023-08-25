import React, { useState, useEffect } from "react";

// components
import Cookies from 'js-cookie';
import CardStats from "../cards/CardStats";

//Api
import { ConsignmentApi } from "../../../services/ConsignmentApi";

export default function HeaderStats() {
  const rolUsuario = Cookies.get('rol');

  //api
  const [sumaAbnColombia, setSumaAbnColombia] = useState(0);
  const [sumaNequi, setSumaNequi] = useState(0);


  useEffect(() => { 
    async function fetchSumas() {
      try {
        const response = await ConsignmentApi.obtenerNequi();
        const responseBancolombia = await ConsignmentApi.obtenerBancolombia();
        
        // Format the numbers with thousands separators
        const formattedSumaAbnColombia = responseBancolombia.data.toLocaleString('es-CO');
        const formattedSumaNequi = response.data.toLocaleString('es-CO');
        
        console.log("bancolombia " + formattedSumaAbnColombia);
        setSumaAbnColombia(formattedSumaAbnColombia);
        setSumaNequi(formattedSumaNequi);
      } catch (error) {
        console.error("Error al obtener consignaciones", error);
      }
    }
  
    fetchSumas();
  }, []);
  
  
  return (
    <>
       {(rolUsuario === 'admin' || rolUsuario === 'superadmin') && ( 
         
         <>
          {/* Header */}
       <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Bancolombia"
                  statTitle={'$ '+sumaAbnColombia}
                  statArrow="up"
                  statPercent=""
                  statPercentColor="text-emerald-500"
                  statDescripiron=""
                  statIconName="https://www.bancolombia.com/wcm/connect/b8e4c3f2-36a9-497d-a125-ac04f83b0bf8/LogoBancolombia.png?MOD=AJPERES"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Nequi"
                  statTitle={'$ '+sumaNequi}
                  statArrow="down"
                  statPercent=""
                  statPercentColor="text-red-500"
                  statDescripiron=""
                  statIconName="https://seeklogo.com/images/N/nequi-logo-58FBE82BA6-seeklogo.com.png"
                  statIconColor="bg-orange-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
         </>
         
        )}
      
    </>
  );
}
