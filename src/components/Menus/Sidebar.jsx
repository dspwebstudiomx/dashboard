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
		const [weather, setWeather] = React.useState(null);
		const isDaytime = time.getHours() >= 7 && time.getHours() < 19;

		React.useEffect(() => {
			// Actualizar la hora cada segundo
			const timer = setInterval(() => setTime(new Date()), 1000);
			return () => clearInterval(timer);
		}, []);

		React.useEffect(() => {
			// Obtener el clima actual usando la API de OpenWeatherMap
			const fetchWeather = async () => {
				try {
					const response = await fetch(
						`https://api.openweathermap.org/data/2.5/weather?lat=40.7128&lon=-74.006&appid=TU_API_KEY&units=metric&lang=es`
					);
					const data = await response.json();
					setWeather({
						temp: data.main.temp,
						description: data.weather[0].description,
						icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
					});
				} catch (error) {
					console.error('Error al obtener el clima:', error);
				}
			};
			fetchWeather();
		}, []);

		return (
			<div className="hidden w-full h-[160px] bg-gray-100 sm:flex items-center justify-center rounded-xl border-4 border-blue-400">
				{/* Video de fondo para el día */}
				{isDaytime && (
					<video
						className="fixed top-0 left-0 w-full h-full object-cover rounded-xl"
						src="/assets/clouds.mp4"
						autoPlay
						loop
						muted
					/>
				)}
				{/* Video de fondo para la noche */}
				{!isDaytime && (
					<video
						className="fixed top-0 left-0 w-full h-full object-cover rounded-xl"
						src="/assets/night.mp4"
						autoPlay
						loop
						muted
					/>
				)}
				{/* Contenido del reloj y clima */}
				<div className="relative z-10 text-center text-gray-900 dark:text-gray-100">
					{/* Hora actual */}
					<div className="text-4xl font-bold">{time.toLocaleTimeString()}</div>
					{/* Clima actual */}
					{weather && (
						<div className="mt-4 flex items-center justify-center gap-2">
							<img src={weather.icon} alt={weather.description} className="w-12 h-12" />
							<div>
								<p className="text-lg font-medium">{weather.temp}°C</p>
								<p className="text-2xl capitalize">{weather.description}</p>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	};

	// Renderiza el Sidebar
	return (
		<aside className="fixed top-40 right-30 w-auto h-auto flex flex-col gap-8 justify-between">
			{/* Contenedor del menú */}
			<div
				id="sidebar-menu-container"
				className="bg-gray-100 rounded-xl p-8 text-blue-20 flex flex-col items-center justify-center gap-8 dark:bg-gray-800 dark:text-gray-100 border-4 border-blue-400 dark:border-blue-700 transition-transform duration-300 ease-in-out"
			>
				<h2 className="text-center font-semibold tracking-wide text-2xl text-gray-900 dark:text-gray-100">
					Menú
				</h2>
				<ul className="flex flex-col items-center justify-center gap-8 md:gap-0 ml-0 md:ml-4 font-semibold text-xl md:text-lg">
					{menuItems.map((item, index) => (
						<li key={index}>
							<NavLink
								to={item.path}
								className="flex flex-row gap-4 py-3 items-center text-gray-900 dark:text-gray-100 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 ease-in-out w-[180px]"
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
		</aside>
	);
};

export default Sidebar;
