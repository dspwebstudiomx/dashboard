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
  const DashboardStyles = {
    title: `text-3xl font-bold mb-6 text-center sm:hidden text-blue-950`,
    grid: `grid grid-cols-1 md:grid-cols-12 gap-12 p-0`,
    card: `bg-white p-6 rounded-lg shadow-md`,
    cardTitle: `text-2xl font-semibold mb-4`,
  };
  const cards = [
    {
      title: "Resumen de Proyectos",
      component: <ProjectSummary />,
      colSpan: "md:col-span-8 col-span-5",
    },
    {
      title: "Ingresos",
      component: <RevenueChart />,
      colSpan: "md:col-span-4 col-span-8",
    },
    {
      title: "Lista de Tareas",
      component: <TaskList />,
      colSpan: "md:col-span-4 col-span-8",
    },
    {
      title: "Clientes",
      component: <ClientsTable />,
      colSpan: "md:col-span-8 col-span-8",
    },
    {
      title: "Notificaciones",
      component: <Notifications />,
      colSpan: "md:col-span-6 col-span-8",
    },
    {
      title: "Calendario",
      component: <Calendar />,
      colSpan: "md:col-span-6 col-span-8",
    },
  ];

  return (
    <DashboardTemplate>
      <h1 className={DashboardStyles.title}>Estadísticas</h1>
      <section className="grid grid-cols-1 md:grid-cols-12 gap-12 p-0">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`bg-white p-6 rounded-lg shadow-md ${card.colSpan}`}>
            <h2 className={DashboardStyles.cardTitle}>{card.title}</h2>
            {card.component}
          </div>
        ))}
      </section>
    </DashboardTemplate>
  );
};

export default DashboardPage;
