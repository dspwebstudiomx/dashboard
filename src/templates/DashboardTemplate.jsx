import React, { useState } from "react";
import Header from "../components/Menus/Header";
import Sidebar from "../components/Menus/Sidebar";
import Footer from "@components/Footer";

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
          } fixed inset-0 z-40 md:hidden`}
          onClick={toggleSidebar}></div>

        {/* Contenido principal: Se adapta al ancho restante */}
        <main
          id="contenido"
          className="flex flex-col transition-all duration-300">
          <div className="absolute w-[100vw] xl:w-[70vw] md:ml-90 top-40 pb-40">
            {children}
          </div>
          {/* Sidebar: Siempre visible en pantallas medianas y grandes */}
          <Sidebar
            className={`${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } z-50 md:translate-x-0 transition-transform duration-300 md:w-64 w-64`}
          />
        </main>
      </div>

      {/* Pie de página */}
      <Footer />
    </div>
  );
};

export default DashboardTemplate;
