/*
Header.jsx - Componente de encabezado para la aplicación
Este componente incluye un reloj, un botón para alternar entre modo oscuro y claro, 
y un botón para abrir el menú lateral. También muestra el nombre de la página actual en función de la ruta.
Creado por dspwebstudio
Fecha: 2025-05-28
*/

// Importar librerías y componentes necesarios
import React, { useState, useEffect } from 'react';
import { FaMoon, FaRegClock, FaSun, FaBars } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom'; // Importa useLocation
import logo from '../../assets/dsp-mixed.png'; // Asegúrate de que la ruta sea correcta
import { Helmet } from 'react-helmet';
import { IoBulbOutline } from 'react-icons/io5';
// import nighnmoon from '../../assets/images/nightmoon.webp'; // Asegúrate de que la ruta sea correcta
// Componente Header
const Header = ({ toggleSidebar, title }) => {
	const [time, setTime] = useState('');
	const [darkMode, setDarkMode] = useState(false); // Estado para el modo oscuro
	const location = useLocation(); // Obtén la ubicación actual

	// Mapeo de rutas a nombres de páginas
	const pageNames = {
		'/': 'Inicio',
		'/proyectos': 'Proyectos',
		'/clientes': 'Clientes',
		'/tareas': 'Tareas',
		'/cotizaciones': 'Cotizaciones',
		'/clientes/:id/': { title: 'Clientes', id: 'id' },
	};

	const currentPage = pageNames[location.pathname] || 'Página desconocida';

	// Efecto para actualizar el reloj cada segundo
	useEffect(() => {
		// Actualiza el reloj cada segundo
		const updateClock = () => {
			const now = new Date();
			const formattedTime = now.toLocaleTimeString('es-ES', {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: true,
			});
			setTime(formattedTime);
		};

		const interval = setInterval(updateClock, 1000);
		updateClock();
		return () => clearInterval(interval);
	}, []);

	// Efecto para cargar el modo oscuro guardado en localStorage o según el sistema
	useEffect(() => {
		const savedDarkMode = localStorage.getItem('darkMode');
		let prefersDark = false;
		if (savedDarkMode === null) {
			// Si no hay preferencia guardada, usar la del sistema
			prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			setDarkMode(prefersDark);
			if (prefersDark) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		} else {
			const isDark = savedDarkMode === 'true';
			setDarkMode(isDark);
			if (isDark) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	}, []);

	// Alternar entre Dark Mode y Light Mode
	const toggleDarkMode = () => {
		const newDarkMode = !darkMode;
		setDarkMode(newDarkMode);
		localStorage.setItem('darkMode', newDarkMode);
		if (newDarkMode) {
			document.documentElement.classList.add('dark'); // Agrega la clase 'dark' al <html>
		} else {
			document.documentElement.classList.remove('dark'); // Elimina la clase 'dark' del <html>
		}
	};

	// Función para determinar el saludo según la hora
	const getGreeting = () => {
		const hour = new Date().getHours();
		if (hour < 12) {
			return (
				<>
					Buenos días
					<FaSun className="inline-block mr-2 text-yellow-400 ml-2" />
				</>
			);
		} else if (hour < 19) {
			return (
				<>
					Buenas tardes
					<FaRegClock className="inline-block mr-2 text-blue-700 ml-2" />
				</>
			);
		} else {
			return (
				<>
					Buenas noches
					<FaMoon className="inline-block mr-2 text-yellow-400 ml-2" />
					{/* <img src={nighnmoon} alt="" width="32" /> */}
				</>
			);
		}
	};

	// Alternar el Sidebar
	return (
		<>
			{/* Meta etiquetas para SEO */}
			<Helmet>
				<title>{`${currentPage} - dspwebstudio`}</title>
				<meta name="description" content={`Página de ${currentPage}`} />
				<meta name="keywords" content="dspwebstudio, proyectos, clientes, tareas, cotizaciones" />
				<meta name="author" content="Daniel Salvador" />
				<meta name="robots" content="index, follow" />
				<link rel="canonical" href={`https://dspwebstudio.com${location.pathname}`} />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Helmet>

			{/* Encabezado principal */}
			<header
				id="encabezado principal"
				className="header md:py-12 2xl:py-6 md:top-0 md:left-0 md:fixed w-full md:px-12 mx-auto z-10 dark:bg-gray-900 bg-gray-200"
			>
				{/* Contenedor interno del encabezado */}
				<div
					id="contenedor interno"
					className="header-container flex justify-between items-center h-full px-8 sm:rounded-full bg-white dark:bg-gray-800 border-b-blue-900 shadow-sm md:border-2 md:border-gray-100 md:dark:border-gray-700 py-4"
				>
					{/* Logo y título */}
					<div className="header-logo-container flex items-center gap-4 justify-center">
						<a
							id="link-logo"
							href="/"
							className="rounded-full bg-transparent dark:bg-gray-50 w-14 h-14 flex items-center justify-center"
						>
							<img id="logo dspwebstudio" src={logo} alt="dspwebstudio logo" width={50} />
						</a>
						<h1
							id="Título Página actual"
							className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100"
						>
							{title ? title : currentPage}
						</h1>
					</div>

					{/* Navegación */}
					<nav
						id="header-funciones"
						className="header-nav flex justify-end items-center gap-4 md:gap-6"
					>
						{/* Saludo al usuario */}
						<div
							id="saludo"
							className="greeting text-lg font-medium text-gray-800 dark:text-gray-200 px-4 py-2 hidden items-center justify-center md:flex"
						>
							<span className="text-gray-800 dark:text-gray-100 font-semibold text-xl">
								{getGreeting()}{' '}
								<span className="text-blue-900 dark:text-blue-400 mr-1">
									{localStorage.getItem('nombreUsuario') || 'Daniel Salvador'}
								</span>
								!
							</span>
						</div>

						{/* Reloj */}
						<div
							id="reloj"
							className="text-lg font-medium text-gray-800 dark:text-gray-200 px-4 py-2 hidden items-center justify-center md:flex 2xl:text-2xl 2xl:w-[300px] gap-3"
						>
							<FaRegClock className="text-blue-900 dark:text-blue-400" />
							{time.includes('AM') ? time.replace('AM', 'a.m.') : time.replace('PM', 'p.m.')}
						</div>

						{/* Botón de modo oscuro */}
						<button
							id="dark-mode-toggle"
							onClick={toggleDarkMode}
							className="dark-mode-toggle flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-md"
						>
							{darkMode ? (
								<IoBulbOutline className="text-yellow-300 text-2xl" />
							) : (
								<FaMoon className="text-yellow-500 text-2xl" />
							)}
						</button>

						{/* Botón de barras */}
						<button
							id="sidebar-toggle"
							onClick={toggleSidebar}
							className="text-2xl focus:outline-none"
						>
							<FaBars className="text-blue-800" />
						</button>
					</nav>
				</div>
			</header>
		</>
	);
};

export default Header;
