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
import { NavLink } from "react-router-dom";

// Componente Sidebar
const Sidebar = ({ columns, isOpen }) => {
  // Estilos para el Sidebar
  const SidebarStyles = {
    sidebarAside: {
      columns: columns,
      general: `bg-white text-blue-20 flex flex-col items-center justify-center gap-8 dark:bg-gray-800 dark:text-gray-100`,
      mobile: `fixed top-10 p-24 w-[100vw] h-[96vh] z-[99999]`,
      visible: `translate-x-10 md:translate-x-0`, // Clase para mostrar el Sidebar
      hidden: `translate-x-full`, // Clase para ocultar el Sidebar
      tablet: `md:p-5 md:rounded-xl shadow-lg md:w-[15vw] md:top-38 md:right-10 md:border-2 md:border-gray-300 md:dark:border-gray-700 md:rounded-xl md:mt-10 `,
      desktop: `xl:w-[15vw] xl:h-[60vh] right-10 xl:top-38`,
    },
    sidebarHeader: `mx-auto`,
    sidebarMenu: `flex flex-col items-center justify-center gap-8   md:gap-8 ml-0 md:ml-4  p-4 font-semibold text-xl md:text-lg`,
    sidebarMenuItem: `flex flex-row gap-4 items-center p-2 text-gray-900 dark:text-gray-100 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300 ease-in-out w-[180px]`,
    sidebarMenuItemIcon: `text-blue-900 dark:text-blue-500 text-2xl`,
  };

  // Definición de las rutas y sus íconos
  const menuItems = [
    { path: "/", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/clientes", label: "Clientes", icon: <FaUsers /> },
    { path: "/tareas", label: "Tareas", icon: <FaTasks /> },
    { path: "/proyectos", label: "Proyectos", icon: <FaProjectDiagram /> },
    {
      path: "/cotizaciones",
      label: "Cotizaciones",
      icon: <FaFileInvoiceDollar />,
    },
  ];

  // Renderiza el Sidebar
  return (
    <aside
      id="sidebar"
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
        <h2 className="text-center uppercase font-semibold tracking-wide text-xl text-gray-900 dark:text-gray-100">
          Menú
        </h2>
      </div>
      <ul id="sidebar-menu" className={SidebarStyles.sidebarMenu}>
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink to={item.path} className={SidebarStyles.sidebarMenuItem}>
              <span className={SidebarStyles.sidebarMenuItemIcon}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
