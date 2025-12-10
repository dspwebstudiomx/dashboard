/*  
  Sidebar.jsx - Sidebar Component
  Este componente representa un menú lateral que contiene enlaces a diferentes secciones de la aplicación.
  Creado por dspwebstudio
  Fecha: 2025-05-28
*/

// Importar librerías y componentes necesarios
import React from 'react';
import { FaTachometerAlt, FaProjectDiagram, FaUsers, FaTasks } from 'react-icons/fa';
import { FaFileInvoiceDollar } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

// Importar los videos
import cloudsVideo from '../../assets/clouds.mp4';
import nightVideo from '../../assets/night.mp4';

// Componente Sidebar
const Sidebar = () => {
	// Definición de las rutas y sus íconos
	const menuItems = [
		{ path: '/', label: 'Dashboard', icon: <FaTachometerAlt /> },
		{ path: '/clientes', label: 'Clientes', icon: <FaUsers /> },
		{ path: '/tareas', label: 'Tareas', icon: <FaTasks /> },
		{ path: '/proyectos', label: 'Proyectos', icon: <FaProjectDiagram /> },
		{
			path: '/cotizaciones',
			label: 'Cotizaciones',
			icon: <FaFileInvoiceDollar />,
		},
	];

	const Clock = () => {
		const [time, setTime] = React.useState(new Date());
		const isDaytime = time.getHours() >= 7 && time.getHours() < 19;

		React.useEffect(() => {
			// Actualizar la hora cada segundo
			const timer = setInterval(() => setTime(new Date()), 1000);
			return () => clearInterval(timer);
		}, []);

		return (
			<div className="hidden relative bg-gray-900/80 overflow-hidden w-full h-[160px] sm:flex items-center justify-center rounded-xl border-4 border-blue-400 dark:border-gray-700 text-gray-100">
				{/* Video de fondo para el día */}
				{isDaytime && (
					<video
						className="absolute top-0 left-0 w-full h-full object-cover"
						src={cloudsVideo}
						autoPlay
						loop
						muted
					/>
				)}
				{/* Video de fondo para la noche */}
				{!isDaytime && (
					<video
						className="absolute top-0 left-0 w-full h-full object-cover"
						src={nightVideo}
						autoPlay
						loop
						muted
					/>
				)}
				{/* Overlay para mejorar la visibilidad */}
				<div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
				{/* Contenido del reloj y clima */}
				<div className="relative z-10 text-center">
					{/* Hora actual */}
					<div className="text-3xl font-bold">{time.toLocaleTimeString()}</div>
					{/* Clima actual */}
				</div>
			</div>
		);
	};

	// Funciones para desplazarse
	const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
	const scrollToBottom = () =>
		window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

	// Renderiza el Sidebar
	return (
		<aside className="fixed top-40 right-20 w-auto h-auto flex flex-col gap-8 justify-between">
			{/* Contenedor del menú */}
			<div
				id="sidebar-menu-container"
				className="bg-gray-100 rounded-xl py-8 text-blue-20 flex flex-col items-center justify-center gap-8 dark:bg-gray-800 dark:text-gray-100 border-4 border-blue-400 dark:border-gray-700 transition-transform duration-300 ease-in-outs"
			>
				<h2 className="text-center font-semibold tracking-wide text-2xl text-gray-900 dark:text-gray-100">
					Menú
				</h2>
				<ul className="flex flex-col items-start justify-center gap-8 md:gap-0 ml-0 font-semibold text-xl md:text-lg w-[260px]">
					{menuItems.map((item, index) => (
						<li key={index}>
							<NavLink
								to={item.path}
								className="flex flex-row gap-4 py-3 items-start text-gray-900 dark:text-gray-100 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 ease-in-out w-[260px] pl-8"
							>
								<span className="text-blue-900 dark:text-blue-500 text-2xl">{item.icon}</span>
								<span>{item.label}</span>
							</NavLink>
						</li>
					))}
				</ul>
			</div>

			{/* Contenedor del reloj */}
			<Clock />

			{/* Botones de desplazamiento */}
			<div className="flex justify-center items-center gap-6 mt-16">
				<button
					onClick={scrollToTop}
					className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors duration-300 border-2 border-white dark:border-gray-300"
					aria-label="Subir al inicio"
				>
					<FaArrowUp />
				</button>
				<button
					onClick={scrollToBottom}
					className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors duration-300 border-2 border-white dark:border-gray-300"
					aria-label="Bajar al final"
				>
					<FaArrowDown />
				</button>
			</div>
		</aside>
	);
};

export default Sidebar;
