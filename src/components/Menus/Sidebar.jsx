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
const Sidebar = ({ columns, isOpen }) => {
	// Estilos para el Sidebar
	const SidebarStyles = {
		sidebarAside: {
			columns: columns,
			general: `bg-white text-blue-20 flex flex-col items-center justify-center gap-8 dark:bg-gray-800 dark:text-gray-100 border-4 border-blue-300 dark:border-blue-700`,
			mobile: `fixed top-10 p-24 w-[100vw] h-[96vh] z-[99999] md:z-0`,
			visible: `translate-x-10 md:translate-x-0`, // Clase para mostrar el Sidebar
			hidden: `translate-x-full`, // Clase para ocultar el Sidebar
			tablet: `md:p-5 md:rounded-xl shadow-lg md:w-[15vw] md:top-38 md:right-10 md:border-2 md:border-gray-300 md:dark:border-gray-700 md:rounded-xl md:mt-10 `,
			desktop: `xl:w-[15vw] xl:h-[60vh] xl:right-24 xl:top-32 border-4 border-blue-300 dark:border-blue-700`,
		},
		sidebarHeader: `mx-auto`,
		sidebarMenu: `flex flex-col items-center justify-center gap-8   md:gap-8 ml-0 md:ml-4  p-4 font-semibold text-xl md:text-lg`,
		sidebarMenuItem: `flex flex-row gap-4 items-center p-2 text-gray-900 dark:text-gray-100 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300 ease-in-out w-[180px]`,
		sidebarMenuItemIcon: `text-blue-900 dark:text-blue-500 text-2xl`,
	};

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
			<div className="relative w-full h-full flex items-center justify-center bg-transparent">
				{/* Video de fondo para el día */}
				{isDaytime && (
					<video
						className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
						src="src/assets/clouds.mp4"
						autoPlay
						loop
						muted
					/>
				)}
				{/* Video de fondo para la noche */}
				{!isDaytime && (
					<video
						className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
						src="src/assets/night.mp4"
						autoPlay
						loop
						muted
					/>
				)}
				{/* Contenido del reloj y clima */}
				<div className="relative z-10 text-center text-gray-100 dark:text-gray-100">
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
		<aside className="flex flex-col justify-between h-full">
			<div
				id="sidebar"
				className={`${SidebarStyles.sidebarAside.general} ${
					columns ? SidebarStyles.sidebarAside.columns : ''
				} ${
					isOpen ? SidebarStyles.sidebarAside.visible : SidebarStyles.sidebarAside.hidden
				} transition-transform duration-300 ease-in-out z-20
      ${SidebarStyles.sidebarAside.tablet} ${SidebarStyles.sidebarAside.desktop} ${
					SidebarStyles.sidebarAside.mobile
				}`}
			>
				<div id="sidebar-header" className={SidebarStyles.sidebarHeader}>
					<h2 className="mb-10 text-center uppercase font-semibold tracking-wide text-xl text-gray-900 dark:text-gray-100">
						Menú
					</h2>
					<ul id="sidebar-menu" className={SidebarStyles.sidebarMenu}>
						{menuItems.map((item, index) => (
							<li key={index}>
								<NavLink to={item.path} className={SidebarStyles.sidebarMenuItem}>
									<span className={SidebarStyles.sidebarMenuItemIcon}>{item.icon}</span>
									<span>{item.label}</span>
								</NavLink>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="fixed bottom-8 w-72 h-36 right-24  bg-gray-100 flex items-center justify-center rounded-xl shadow-lg dark:bg-gray-800 border-4 border-blue-300 dark:border-gray-700">
				<Clock />
			</div>
		</aside>
	);
};

export default Sidebar;
