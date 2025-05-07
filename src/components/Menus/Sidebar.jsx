import React from "react";
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaUsers,
  FaCog,
  FaLifeRing,
  FaTasks,
} from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";

const Sidebar = ({ className }) => {
  return (
    <div
      className={`fixed bg-white text-blue-0 md:bg-white top-20 md:top-[16vh] h-screen md:left-20 w-[100vw] md:w-[12vw] md:text-gray-800 md:h-[70vh] p-4 py-8 md:rounded-4xl md:border-4 md:border-gray-100 md:shadow-lg ${className}`}>
      <div id="sidebar-header" className="sidebar-header">
        <h2 className="text-center uppercase font-semibold tracking-wide text-xl mt-20">
          Menú
        </h2>
      </div>
      <ul
        id="sidebar-menu"
        className="sidebar-menu flex flex-col items-start gap-12 md:gap-8 ml-18 md:ml-0  mt-16 md:mt-8 p-4 font-semibold text-xl md:text-lg">
        <li>
          <a href="/" className="flex flex-row gap-4 items-center">
            <FaTachometerAlt className=" text-blue-900" />
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a href="/proyectos" className="flex flex-row gap-4 items-center">
            <FaProjectDiagram className=" text-blue-900" />
            <span>Proyectos</span>
          </a>
        </li>
        <li>
          <a href="/tareas" className="flex flex-row gap-4 items-center">
            <FaTasks className=" text-blue-900" />
            <span>Tareas</span>
          </a>
        </li>
        <li>
          <a href="/clientes" className="flex flex-row gap-4 items-center">
            <FaUsers className=" text-blue-900" />
            <span>Clientes</span>
          </a>
        </li>
        <li>
          <a href="/cotizaciones" className="flex flex-row gap-4 items-center">
            <FaFileInvoiceDollar className=" text-blue-900" />
            <span>Cotizaciones</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
