/* 
RevenueChart.jsx - Gráfico de Ingresos Netos por Mes.

Creado por: Daniel Pérez - [22/08/2025]

Descripción:
Este componente utiliza Chart.js para mostrar un gráfico de líneas que representa los ingresos netos por mes.
Los datos se obtienen de un archivo JSON que contiene información de clientes y sus proyectos. 
El gráfico muestra los ingresos netos agrupados por mes, con un plugin personalizado que muestra el mes actual en el centro del gráfico.
El gráfico es responsivo y se adapta a diferentes tamaños de pantalla.  
El eje X muestra los meses del año y el eje Y muestra los ingresos netos en pesos mexicanos (MXN).
El gráfico también incluye opciones de interacción y hover para mejorar la experiencia del usuario.

*/

// Importaciones necesarias
import React, { useEffect, useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
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

	// Efecto para calcular los ingresos netos por mes
	useEffect(() => {
		// Crear un objeto para agrupar ingresos por mes
		const monthlyRevenue = {};

		clients.forEach((client) => {
			client.projects?.forEach((project) => {
				const month = new Date(project.dueDate).toLocaleString('es-MX', {
					month: 'long',
				});

				// Acceder a netPayable desde costs (que es un objeto)
				const netPayable = project.costs?.netPayable || 0;

				// Sumar los valores de netPayable por mes
				monthlyRevenue[month] = (monthlyRevenue[month] || 0) + netPayable;
			});
		});

		// Ordenar los meses en el orden correcto
		const monthOrder = [
			'enero',
			'febrero',
			'marzo',
			'abril',
			'mayo',
			'junio',
			'julio',
			'agosto',
			'septiembre',
			'octubre',
			'noviembre',
			'diciembre',
		];

		// Si quieres usar solo los meses con ingresos, puedes filtrar así:
		// const labels = monthOrder.filter((month) => monthlyRevenue[month] !== undefined);
		// const data = labels.map((month) => monthlyRevenue[month]);

		// Usar todos los meses como etiquetas
		const labels = monthOrder;

		// Para cada mes, si no hay ingresos, poner 0
		const data = monthOrder.map((month) => monthlyRevenue[month] || 0);

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

	// Plugin para mostrar el mes actual en el centro de la gráfica
	const currentMonth = new Date().toLocaleString('es-MX', { month: 'long' });

	// Plugin personalizado para mostrar el mes actual en el centro del gráfico
	const centerTextPlugin = {
		id: 'centerText',
		afterDraw: (chart) => {
			const {
				ctx,
				chartArea: { width, height },
			} = chart;
			ctx.save();
			ctx.font = 'bold 24px Arial';
			ctx.fillStyle = 'rgba(59, 130, 246, 0.7)';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText(
				currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1),
				width / 2 + chart.chartArea.left,
				height / 2 + chart.chartArea.top
			);
			ctx.restore();
		},
	};

	// Opciones del gráfico
	const options = {
		responsive: true, // Hacer el gráfico responsivo
		backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco con opacidad
		plugins: {
			legend: {
				display: true, // Mostrar leyenda
				position: 'bottom', // Posición de la leyenda
			},
			title: {
				display: true, // Mostrar título del gráfico
				text: 'Ingresos Netos por Mes', // Título del gráfico
				color: '', // Color del título
			},
		},
		// Configuración de interacción y hover
		// interaction: {
		// 	mode: 'nearest', // Modo de interacción
		// 	intersect: false, // No requiere intersección para mostrar tooltip
		// },
		hover: {
			mode: 'nearest', // Modo de hover
			intersect: false, // No requiere intersección para mostrar tooltip
		},
		scales: {
			x: {
				type: 'category', // Eje X como categorías
				title: {
					display: true, // Mostrar título del eje X
					text: 'Meses', // texto del eje X
					color: '', // color la etiqueta del eje X
				},
			},
			y: {
				range: [0, Math.max(...(chartData.datasets[0]?.data || [0])) * 2.1], // Ajustar el rango del eje Y
				beginAtZero: true, // Comenzar desde cero
				title: {
					display: true, // Mostrar título del eje Y
					text: 'Ingresos Netos (MXN)', // texto del eje Y
					color: '', // color la etiqueta del eje Y
				},
			},
		},
	};

	return <Line data={chartData} options={options} plugins={[centerTextPlugin]} />;
};

export default RevenueChart;
