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

const Sidebar = () => {
  return (
    <div className="fixed top-[16vh] left-20 w-[12vw] text-gray-800 h-[80vh] p-4 py-8 rounded-4xl border-4 border-gray-100 shadow-lg">
      <div id="sidebar-header" className="sidebar-header">
        <h2 className="text-center uppercase font-semibold tracking-wide text-xl">
          Menú
        </h2>
      </div>
      <ul
        id="sidebar-menu"
        className="sidebar-menu flex flex-col items-start gap-8 mt-8 p-4 font-semibold text-lg">
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
