import React, { useEffect, useRef } from "react";
import { Chart, LineController, CategoryScale, LinearScale, PointElement } from "chart.js";

const CardLineChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Obtener el contexto del lienzo (canvas) para el gráfico
    const ctx = chartRef.current.getContext('2d');

    // Registrar los controladores y elementos necesarios
    Chart.register(LineController, CategoryScale, LinearScale, PointElement);

    // Verificar si ya existe un gráfico en el lienzo y destruirlo si es necesario
    if (window.myLine) {
      window.myLine.destroy();
    }

    // Datos para el gráfico de línea
    const data = {
      labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
      datasets: [
        {
          label: "Ventas",
          backgroundColor: "#4c51bf",
          borderColor: "#4c51bf",
          data: [50, 60, 70, 80, 90, 100, 110],
          fill: false,
        },
      ],
    };

    // Configurar y crear el gráfico de línea
    window.myLine = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: data.datasets,
      },
      options: {
        // ... (tus opciones del gráfico)
      },
    });
  }, []);

  return (
    <>
      {/* ... (tu JSX) */}
      <div className="relative h-350-px">
        <canvas ref={chartRef} id="line-chart"></canvas>
      </div>
      {/* ... (más JSX) */}
    </>
  );
};

export default CardLineChart;
