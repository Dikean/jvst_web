import React, { useEffect, useRef, useState } from 'react';
import { Chart, BarController, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { ConsignmentApi } from '../../../services/ConsignmentApi';

const CardBarChart = () => {
  const chartRef = useRef(null);
  const [montosPorMes, setMontosPorMes] = useState([]);

  useEffect(() => {
    // Obtener el contexto del lienzo (canvas) para el gráfico
    const ctx = chartRef.current.getContext('2d');

    // Registrar los controladores y escalas necesarios
    Chart.register(BarController, CategoryScale, LinearScale, BarElement);

    // Verificar si ya existe un gráfico en el lienzo y destruirlo si es necesario
    if (window.myBar) {
      window.myBar.destroy();
    }

    // Configurar y crear el gráfico de barras con los datos de montosPorMes
    window.myBar = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ],
        datasets: [
          {
            label: 'Monto por mes',
            backgroundColor: '#ed64a6',
            borderColor: '#ed64a6',
            data: montosPorMes,
            fill: false,
            barThickness: 20,
          },
        ],
      },
      options: {
        // Opciones del gráfico
      },
    });
  }, [montosPorMes]);


  // Función para obtener el nombre del mes a partir de su número (0 para enero, 1 para febrero, etc.)
function getMonthName(monthNumber) {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  if (monthNumber >= 0 && monthNumber < 12) {
    return months[monthNumber];
  }

  return '';
}


  useEffect(() => {
    async function fetchAndSetMontosPorMes() {
      try {
        const response = await ConsignmentApi.obtenerMontoporMes();
        const consignaciones = response.data;
    
        console.log("Consignaciones obtenidas:", consignaciones);
    
        // Crear un objeto para almacenar las sumas por mes
        const sumasPorMes = {
          Enero: 0,
          Febrero: 0,
          Marzo: 0,
          Abril: 0,
          Mayo: 0,
          Junio: 0,
          Julio: 0,
          Agosto: 0,
          Septiembre: 0,
          Octubre: 0,
          Noviembre: 0,
          Diciembre: 0,
        };
    
        // Iterar a través de las consignaciones y sumar los montos por mes
        consignaciones.forEach((consignacion) => {
          // Obtener la fecha de la consignación
          const date = new Date(consignacion.date);
    
          console.log("Fecha de consignación:", date);
    
          // Obtener el mes en formato de número (0 para enero, 1 para febrero, etc.)
          const month = date.getUTCMonth();
    
          console.log("Número de mes:", month);
    
          // Obtener el año
          const year = date.getUTCFullYear();
    
          console.log("Año:", year);
    
          // Verificar si el año es el año actual (si es necesario)
          // Esto evita que las consignaciones de años anteriores se incluyan en el cálculo
          const yearActual = new Date().getUTCFullYear();
    
          console.log("Año actual:", yearActual);
    
          if (year === yearActual) {
            // Sumar el monto al mes correspondiente
            sumasPorMes[getMonthName(month)] += parseInt(consignacion.amount);
          }
        });
    
        console.log("Sumas por mes:", sumasPorMes);
    
        // Convertir el objeto de sumas por mes en un arreglo
        const montosPorMes = Object.values(sumasPorMes);
    
        console.log("Montos por mes (arreglo):", montosPorMes);
    
        // Actualizar el estado con los montos por mes
        setMontosPorMes(montosPorMes);
      } catch (error) {
        console.error("Error al obtener montos por mes", error);
      }
    }
    
    fetchAndSetMontosPorMes();
  }, []);
  

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (window.myBar) {
        const cleanedData = montosPorMes.map((monto) => (monto !== null ? monto : 0));
        window.myBar.data.datasets[0].data = cleanedData;
        window.myBar.update();
      }
    }
  }, [montosPorMes]);

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      {/* Resto del componente JSX */}
      <div className="p-4 flex-auto">
        {/* Chart */}
        <div className="relative h-350-px">
          <canvas ref={chartRef} width={400} height={300} />
        </div>
      </div>
    </div>
  );
};

export default CardBarChart;
