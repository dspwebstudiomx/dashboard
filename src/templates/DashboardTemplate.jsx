import React, { useState } from "react";
import Header from "@components/Menus/Header";
import Sidebar from "@components/Menus/Sidebar";

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

      {/* Contenido principal */}
      <main className=" grid grid-cols-12 mx-auto mt-30 p-8 gap-12 min-w-screen-2xl">
        {/* Sidebar para pantallas grandes */}
        <aside className="col-span-12 sm:col-span-2">
          <Sidebar className="md:fixed h-[70vh] p-4 py-8 rounded-4xl border-4 border-gray-100 shadow-lg" />
        </aside>
        <section className="col-span-10 w-[70vw]">{children}</section>
      </main>
    </div>
  );
};

export default DashboardTemplate;
