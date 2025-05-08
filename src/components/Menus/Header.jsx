/*
Header.jsx - Componente de encabezado para la aplicación
Este componente incluye un reloj, un botón para alternar entre modo oscuro y claro, 
y un botón para abrir el menú lateral. También muestra el nombre de la página actual en función de la ruta.
Creado por dspwebstudio
Fecha: 2025-05-28
*/

// Importar librerías y componentes necesarios
import React, { useState, useEffect } from "react";
import { FaMoon, FaRegClock, FaSun, FaBars } from "react-icons/fa6";
import { useLocation } from "react-router-dom"; // Importa useLocation
import logo from "../../assets/dsp-mixed.png"; // Asegúrate de que la ruta sea correcta
import { Helmet } from "react-helmet";

// Componente Header
const Header = ({ toggleSidebar }) => {
  const [time, setTime] = useState("");
  const [darkMode, setDarkMode] = useState(false); // Estado para el modo oscuro
  const location = useLocation(); // Obtén la ubicación actual

  // Mapeo de rutas a nombres de páginas
  const pageNames = {
    "/": "Dashboard",
    "/proyectos": "Proyectos",
    "/clientes": "Clientes",
    "/tareas": "Tareas",
    "/cotizaciones": "Cotizaciones",
  };

  const currentPage = pageNames[location.pathname] || "Página desconocida";

  // Efecto para actualizar el reloj cada segundo
  useEffect(() => {
    // Actualiza el reloj cada segundo
    const updateClock = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(formattedTime);
    };

    const interval = setInterval(updateClock, 1000);
    updateClock();
    return () => clearInterval(interval);
  }, []);

  // Alternar entre Dark Mode y Light Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <>
      {/* Meta etiquetas para SEO */}
      <Helmet>
        <title>{`${currentPage} - dspwebstudio`}</title>
        <meta name="description" content={`Página de ${currentPage}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      {/* Encabezado principal */}
      <header
        id="encabezado principal"
        className="header md:h-30 md:py-4 top-0 left-0 fixed w-[100vw] md:px-20 mx-auto z-10 bg-gray-50 dark:bg-gray-800">
        <div
          id="contenedor interno"
          className="header-container flex justify-between items-center h-full px-6 sm:rounded-full bg-white dark:bg-gray-900 shadow-lg border-2 border-gray-100 dark:border-gray-700 py-4">
          {/* Logo y título */}
          <div className="header-logo-container flex items-center gap-4 justify-center">
            <a id="link-logo" href="/">
              <img
                id="logo dspwebstudio"
                src={logo}
                alt="dspwebstudio logo"
                width={50}
              />
            </a>
            <h1
              id="Título Página actual"
              className="header-logo text-xl font-semibold text-gray-900 dark:text-gray-100">
              {currentPage}
            </h1>
          </div>

          {/* Navegación */}
          <nav
            id="header-funciones"
            className="header-nav flex justify-end items-center gap-6">
            {/* Reloj */}
            <div
              id="reloj"
              className="clock text-lg font-medium text-gray-800 dark:text-gray-200 px-4 py-2 hidden items-center justify-center md:flex">
              <FaRegClock className="inline-block mr-2 text-blue-900 dark:text-blue-400" />
              {time.includes("AM")
                ? time.replace("AM", "a.m.")
                : time.replace("PM", "p.m.")}
            </div>

            {/* Botón de modo oscuro */}
            <button
              id="dark-mode-toggle"
              onClick={toggleDarkMode}
              className="dark-mode-toggle flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-md">
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
            </button>

            {/* Botón de barras */}
            <button
              id="sidebar-toggle"
              onClick={toggleSidebar}
              className="lg:hidden text-2xl focus:outline-none">
              <FaBars />
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
