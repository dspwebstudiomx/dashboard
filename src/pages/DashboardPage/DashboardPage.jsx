/*
  DashboardPage.jsx - Página de Dashboard
  Esta página muestra un resumen de proyectos, ingresos, tareas y clientes.
  También incluye un calendario y notificaciones para una mejor gestión del tiempo y tareas.
  Se utiliza un diseño responsivo para adaptarse a diferentes tamaños de pantalla.
  Creado por dspwebstudio el [Fecha de Creación].
  Última modificación por [Tu Nombre] el [Fecha de Modificación].
*/

// Importar componentes de la página de Dashboard
import React from "react";
import ProjectSummary from "./ProjectSummary";
import ClientsTable from "./ClientsTable";
import Calendar from "@components/Calendar";
import Notifications from "@components/Notifications";
import RevenueChart from "@components/RevenueChart";
import TaskList from "@components/TaskList";
import DashboardTemplate from "@templates/DashboardTemplate";

// Importar componentes de la página de Dashboard
const DashboardPage = () => {
  return (
    <DashboardTemplate>
      <h1 className="text-3xl font-bold mb-6 text-center sm:hidden text-blue-950">
        Estadísticas
      </h1>

      {/* Resumen de Proyectos y Gráfico de Ingresos */}
      <div className="grid grid-cols-1  sm:grid-cols-4 gap-12 p-6">
        {/* Resumen de Proyectos */}
        <div className="bg-white p-6 rounded-lg shadow-md sm:col-span-4 lg:col-span-2 xl:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Resumen de Proyectos</h2>
          <ProjectSummary />
        </div>

        {/* Gráfico de Ingresos */}
        <div className="bg-white p-6 rounded-lg shadow-md sm:col-span-4 lg:col-span-2 xl:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Ingresos</h2>
          <RevenueChart />
        </div>

        {/* Lista de Tareas y Tabla de Clientes */}

        {/* Lista de Tareas */}
        <div className="bg-white p-6 rounded-lg shadow-md sm:col-span-4 lg:col-span-2 xl:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Lista de Tareas</h2>
          <TaskList />
        </div>

        {/* Tabla de Clientes */}
        <div className="bg-white p-6 rounded-lg shadow-md sm:col-span-4 lg:col-span-2 xl:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Clientes</h2>
          <ClientsTable />
        </div>

        {/* Notificaciones */}
        <div className="bg-white p-6 rounded-lg shadow-md sm:col-span-4 lg:col-span-2 xl:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Notificaciones</h2>
          <Notifications />
        </div>

        {/* Calendario */}
        <div className="bg-white p-6 rounded-lg shadow-md sm:col-span-4 lg:col-span-2 xl:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Calendario</h2>
          <Calendar />
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default DashboardPage;
