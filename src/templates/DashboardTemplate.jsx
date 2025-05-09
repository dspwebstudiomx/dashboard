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
      <main className="grid grid-cols-12 p-8 xl:p-8 gap-12 place-items-center w-[100vw] min-h-[80vh] mt-[15vh]">
        {/* Sidebar para pantallas grandes */}
        <Section columns="col-span-11">{children}</Section>
      </main>
    </div>
  );
};

export default DashboardTemplate;
