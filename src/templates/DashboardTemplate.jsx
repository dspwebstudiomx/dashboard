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
    <div className="w-full flex flex-col dark:bg-gray-900">
      {/* Encabezado con botón para alternar el Sidebar */}
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />

      {/* Fondo oscuro para el Sidebar en pantallas pequeñas */}

      {/* Contenido principal */}
      <main className="grid grid-cols-12 p-4 mt-[15vh] xl:mb-24 2xl:max-w-screen-xl items-center justify-center">
        {/* Sidebar para pantallas grandes */}
        <Section columns="col-span-12">{children}</Section>
      </main>
    </div>
  );
};

export default DashboardTemplate;
