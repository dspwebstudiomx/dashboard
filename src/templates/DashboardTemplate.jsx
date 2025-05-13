import React, { useState } from "react";
import Header from "@components/Menus/Header";
import Sidebar from "@components/Menus/Sidebar";
import Section from "@components/Section";

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
    <div className="w-full flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Encabezado con botón para alternar el Sidebar */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Sidebar con transición desde la derecha */}
      {isSidebarOpen && (
        <div
          className={`fixed top-0 right-0 h-full transform translate-x-0 transition-transform ease-in-out duration-300`}>
          <Sidebar isOpen={isSidebarOpen} />
        </div>
      )}

      {/* Contenido principal */}
      <main
        className={`grid grid-cols-12 p-12 pt-[24vh] md:mt-26 items-start justify-center 2xl:p-24 min-h-[100vw] bg-gray-200 dark:bg-gray-900 ${
          isSidebarOpen ? "" : "md:grid-cols-12"
        }`}>
        {/* Contenido principal */}
        <Section
          columns={
            isSidebarOpen ? "col-span-12 md:col-span-10" : "col-span-12"
          }>
          {children}
        </Section>
      </main>
    </div>
  );
};

export default DashboardTemplate;
