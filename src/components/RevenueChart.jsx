import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import clients from '../../server/clients.json'; // Importar el archivo JSON

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RevenueChart = () => {
	const [chartData, setChartData] = useState({
		labels: [],
		datasets: [],
	});

	useEffect(() => {
		// Crear un objeto para agrupar ingresos por mes
		const monthlyRevenue = {};

		clients.forEach((client) => {
			client.projects?.forEach((project) => {
				const month = new Date(project.startDate).toLocaleString('es-MX', {
					month: 'long',
				});

				// Acceder a netPayable desde costs (que es un objeto)
				const netPayable = project.costs?.netPayable || 0;

				// Sumar los valores de netPayable por mes
				monthlyRevenue[month] = (monthlyRevenue[month] || 0) + netPayable;
			});
		});

		// Generar etiquetas y valores para el gráfico
		const labels = Object.keys(monthlyRevenue);
		const data = Object.values(monthlyRevenue);

		// Actualizar los datos del gráfico
		setChartData({
			labels,
			datasets: [
				{
					label: 'Ingresos Netos por Mes',
					data,
					borderColor: 'rgba(59, 130, 246, 1)', // Azul
					backgroundColor: 'rgba(59, 130, 246, 0.2)', // Azul claro
					tension: 0.4, // Suaviza las líneas
				},
			],
		});
	}, []);

	// Opciones del gráfico
	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: true,
				position: 'top',
			},
			title: {
				display: true,
				text: 'Ingresos Netos por Mes',
				color: 'rgba(59, 130, 246, 1)', // Azul
			},
		},
	};

	return <Line data={chartData} options={options} />;
};

export default RevenueChart;
