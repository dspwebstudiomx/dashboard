import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = () => {
  // Datos del gráfico
  const data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [
      {
        label: "Ingresos",
        data: [5000, 7000, 8000, 6000, 9000],
        borderColor: "rgba(59, 130, 246, 1)", // Azul
        backgroundColor: "rgba(59, 130, 246, 0.2)", // Azul claro
        tension: 0.4, // Suaviza las líneas
      },
    ],
  };

  // Opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Ingresos Mensuales",
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default RevenueChart;
