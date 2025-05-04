import React, { useState, useEffect } from "react";
import { FaMoon, FaRegClock, FaSun } from "react-icons/fa6";
import { useLocation } from "react-router-dom"; // Importa useLocation
import logo from "../../assets/dsp-mixed.png"; // Asegúrate de que la ruta sea correcta
import { Helmet } from "react-helmet";

const Header = () => {
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
      <Helmet>
        <title>{`${currentPage} - dspwebstudio`}</title>
        <meta name="description" content={`Página de ${currentPage}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <header className="header h-30 py-4 top-0 left-0 fixed w-full px-20 mx-auto z-10 bg-white dark:bg-gray-800">
        <div className="header-container flex justify-between items-center h-full px-6 rounded-full bg-white dark:bg-gray-900 shadow-lg border-2 border-gray-100 dark:border-gray-700">
          <div className="header-logo-container flex items-center gap-4 justify-center">
            <a href="/">
              <img src={logo} alt="dspwebstudio logo" width={50} />
            </a>
            <h1 className="header-logo text-xl font-semibold text-gray-900 dark:text-gray-100">
              {currentPage}
            </h1>
          </div>
          <nav className="header-nav flex justify-end items-center gap-6">
            <div className="clock text-lg font-medium text-gray-800 dark:text-gray-200 px-4 py-2 flex items-center justify-center">
              <FaRegClock className="inline-block mr-2 text-blue-900 dark:text-blue-400" />
              {time.includes("AM")
                ? time.replace("AM", "a.m.")
                : time.replace("PM", "p.m.")}
            </div>
            {/* Botón para alternar Dark Mode */}
            <button
              onClick={toggleDarkMode}
              className="dark-mode-toggle flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-md">
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
