/*  
  Sidebar.jsx - Sidebar Component
  Este componente representa un menú lateral que contiene enlaces a diferentes secciones de la aplicación.
  Creado por dspwebstudio
  Fecha: 2025-05-28
*/

// Importar librerías y componentes necesarios
import React from "react";
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaUsers,
  FaTasks,
} from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";

// Componente Sidebar
const Sidebar = ({ columns, isOpen }) => {
  // Estilos para el Sidebar
  const SidebarStyles = {
    sidebarAside: {
      columns: columns,
      general: `text-blue-20 p-4 py-8 z-50 bg-white`,
      mobile: `fixed top-18 right-0 w-full h-full dark:bg-gray-900 z-50 border-0 rounded-0`,
      visible: `translate-x-0`, // Clase para mostrar el Sidebar
      hidden: `translate-x-full`, // Clase para ocultar el Sidebar
      tablet: `md:rounded-4xl md:border-4 md:border-gray-100 shadow-lg md:w-[15vw] md:top-38 right-0`,
      desktop: `xl:w-[18vw] xl:h-[60vh]`,
    },
    sidebarHeader: `sidebar-header`,
    sidebarMenu: `flex flex-col items-start gap-12 md:gap-8 ml-18 md:ml-4 mt-16 md:mt-8 p-4 font-semibold text-xl md:text-lg`,
    sidebarMenuItem: `flex flex-row gap-4 items-center`,
    sidebarMenuItemIcon: `text-blue-900 text-2xl`,
  };

  // Definición de las rutas y sus íconos
  const menuItems = [
    { path: "/", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/proyectos", label: "Proyectos", icon: <FaProjectDiagram /> },
    { path: "/tareas", label: "Tareas", icon: <FaTasks /> },
    { path: "/clientes", label: "Clientes", icon: <FaUsers /> },
    {
      path: "/cotizaciones",
      label: "Cotizaciones",
      icon: <FaFileInvoiceDollar />,
    },
  ];

  // Renderiza el Sidebar
  return (
    <aside
      className={`${SidebarStyles.sidebarAside.general} ${
        columns ? SidebarStyles.sidebarAside.columns : ""
      } ${
        isOpen
          ? SidebarStyles.sidebarAside.visible
          : SidebarStyles.sidebarAside.hidden
      } transition-transform duration-300 ease-in-out z-20
      ${SidebarStyles.sidebarAside.tablet} ${
        SidebarStyles.sidebarAside.desktop
      } ${SidebarStyles.sidebarAside.mobile}`}>
      <div id="sidebar-header" className={SidebarStyles.sidebarHeader}>
        <h2 className="text-center uppercase font-semibold tracking-wide text-xl mt-20">
          Menú
        </h2>
      </div>
      <ul id="sidebar-menu" className={SidebarStyles.sidebarMenu}>
        {menuItems.map((item, index) => (
          <li key={index}>
            <a href={item.path} className={SidebarStyles.sidebarMenuItem}>
              <span className={SidebarStyles.sidebarMenuItemIcon}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
