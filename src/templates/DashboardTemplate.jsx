import React, { useState } from "react";
import Header from "../components/Menus/Header";
import Sidebar from "../components/Menus/Sidebar";

/**
 * Componente principal de la plantilla del dashboard.
 * Renderiza el encabezado, el sidebar y el contenido principal.
 *
 * @param {React.ReactNode} children - Contenido principal que se renderiza en el dashboard.
 */
const DashboardTemplate = ({ children }) => {
  // Estado para controlar la visibilidad del Sidebar en pantallas pequeñas
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /**
   * Alterna la visibilidad del Sidebar.
   */
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-full min-h-screen flex flex-col dark:bg-gray-900">
      {/* Encabezado con botón para alternar el Sidebar */}
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex flex-row w-full h-full relative">
        {/* Fondo oscuro para pantallas pequeñas cuando el Sidebar está abierto */}
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden`}
          onClick={toggleSidebar}></div>

        {/* Sidebar: Siempre visible en pantallas medianas y grandes */}
        <Sidebar
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed md:relative z-50 md:translate-x-0 transition-transform duration-300 md:w-64 w-64`}
        />

        {/* Contenido principal: Se adapta al ancho restante */}
        <main
          id="contenido"
          className="p-4 transition-all duration-300 absolute top-30 left-80 w-[80vw]">
          {children}
        </main>
      </div>

      {/* Pie de página */}
      <footer className="bg-blue-800 text-white py-4 text-center mt-auto fixed bottom-0 w-full">
        <p>&copy; 2025 DSPWEBSTUDIO - Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default DashboardTemplate;
