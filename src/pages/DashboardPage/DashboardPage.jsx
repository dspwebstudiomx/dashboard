/*
  DashboardPage.jsx - Página de Dashboard
  Esta página muestra un resumen de proyectos, ingresos, tareas y clientes.
  También incluye un calendario y notificaciones para una mejor gestión del tiempo y tareas.
  Se utiliza un diseño responsivo para adaptarse a diferentes tamaños de pantalla.
  Creado por dspwebstudio el [Fecha de Creación].
  Última modificación por [Tu Nombre] el [Fecha de Modificación].
*/

// Importar componentes de la página de Dashboard
import React from 'react';
import ProjectSummary from './ProjectSummary';
import ClientsTable from './ClientsTable';
import Calendar from '@components/Calendario/Calendar';
import Notifications from '@components/Notifications';
import RevenueChart from '@components/RevenueChart';
import TaskList from '@components/TaskList';
import DashboardTemplate from '@templates/DashboardTemplate';

// Importar componentes de la página de Dashboard
const DashboardPage = () => {
	// Definición de tarjetas para el Dashboard
	const cards = [
		{
			title: 'Ingresos',
			component: <RevenueChart />,
			colSpan: 'col-span-12 lg:col-span-7',
		},
		{
			title: 'Calendario',
			component: <Calendar />,
			colSpan: 'md:col-span-6 col-span-12 xl:col-span-5',
		},
		{
			title: 'Lista de Tareas',
			component: <TaskList />,
			colSpan: 'col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6',
		},
		{
			title: 'Notificaciones',
			component: <Notifications />,
			colSpan: 'col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6',
		},
		{
			title: 'Clientes',
			component: <ClientsTable />,
			colSpan: 'col-span-12 sm:block hidden', // Ocultar en smartphones
		},
		{
			title: 'Resumen de Proyectos',
			component: <ProjectSummary />,
			colSpan: 'col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-12',
		},
	];

	// Estilos para el Dashboard
	const dashboardStyles = {
		title: `text-2xl font-bold mb-6 text-blue-950 text-center dark:text-blue-400 sm:mb-10`, // Ajustar tamaño del texto para smartphones
		grid: `grid grid-cols-1 gap-6 sm:grid-cols-12 sm:gap-12`, // Cambiar a una sola columna en smartphones
		card: `bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-2 border-blue-200 dark:border-gray-700 p-8 rounded-lg shadow-md h-full sm:border-4 sm:p-6 sm:rounded-xl sm:gap-12`, // Aumentar padding en smartphones
		cardTitle: `text-xl font-semibold sm:text-2xl`, // Reducir tamaño del título en smartphones
	};

	// Función para renderizar las tarjetas del Dashboard
	const renderDashboardCards = () => {
		return cards.map((card, index) => (
			<section key={index} className={dashboardStyles.card + ' ' + card.colSpan}>
				<h2 className={dashboardStyles.cardTitle}>{card.title}</h2>
				<div className="h-full w-full place-content-center">{card.component}</div>
			</section>
		));
	};

	// Renderizar el Dashboard
	return (
		<DashboardTemplate>
			{/* Sección de tarjetas del Dashboard */}
			<section className="grid grid-cols-1 gap-6 sm:grid-cols-12 sm:gap-8 mx-auto justify-center items-center">
				{renderDashboardCards()}
			</section>
		</DashboardTemplate>
	);
};

export default DashboardPage;
