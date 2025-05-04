import React from "react";
import DashboardTemplate from "../../templates/DashboardTemplate";
import ProjectSummary from "../../components/ProjectSummary";
import RevenueChart from "../../components/RevenueChart";
import TaskList from "../../components/TaskList";
import ClientsTable from "./ClientsTable";
import Notifications from "../../components/Notifications";
import Calendar from "../../components/Calendar";

const DashboardPage = () => {
  return (
    <DashboardTemplate>
      <h1 className="text-3xl font-bold mb-6 hidden">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Resumen de Proyectos */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Resumen de Proyectos</h2>
          <ProjectSummary />
        </div>

        {/* Gráfico de Ingresos */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Ingresos</h2>
          <RevenueChart />
        </div>
      </div>
      <div className="flex gap-6 p-6">
        {/* Lista de Tareas */}
        <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
          <h2 className="text-xl font-semibold mb-4">Lista de Tareas</h2>
          <TaskList />
        </div>

        {/* Tabla de Clientes */}
        <div className="bg-white p-6 rounded-lg shadow-md w-2/3">
          <h2 className="text-xl font-semibold mb-4">Clientes</h2>
          <ClientsTable />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Notificaciones */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Notificaciones</h2>
          <Notifications />
        </div>

        {/* Calendario */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Calendario</h2>
          <Calendar />
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default DashboardPage;
