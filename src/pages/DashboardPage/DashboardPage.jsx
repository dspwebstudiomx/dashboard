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
  // Estilos para el Dashboard
  const DashboardStyles = {
    title: `text-3xl font-bold mb-6 sm:hidden text-blue-950 text-center`,
    grid: `grid md:grid-cols-12 gap-12 p-0`,
    card: `bg-white p-6 rounded-lg shadow-md`,
    cardTitle: `text-2xl font-semibold mb-12`,
  };

  // Definición de tarjetas para el Dashboard
  const cards = [
    {
      title: "Resumen de Proyectos",
      component: <ProjectSummary />,
      colSpan: "md:col-span-8 col-span-12",
    },
    {
      title: "Ingresos",
      component: <RevenueChart />,
      colSpan: "md:col-span-4 col-span-12",
    },
    {
      title: "Lista de Tareas",
      component: <TaskList />,
      colSpan: "md:col-span-5 col-span-12",
    },
    {
      title: "Clientes",
      component: <ClientsTable />,
      colSpan: "md:col-span-7 col-span-12",
    },
    {
      title: "Notificaciones",
      component: <Notifications />,
      colSpan: "md:col-span-6 col-span-12",
    },
    {
      title: "Calendario",
      component: <Calendar />,
      colSpan: "md:col-span-6 col-span-12",
    },
  ];

  // Renderizar el Dashboard
  return (
    <DashboardTemplate>
      {/* Título del Dashboard */}
      <h1 className={DashboardStyles.title}>Estadísticas</h1>

      {/* Sección de tarjetas del Dashboard */}
      <section className="grid grid-cols-12 gap-8 mx-auto justify-center items-center">
        {cards.map((card, index) => (
          <div
            key={index}
            className={` bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-6 rounded-lg shadow-md ${card.colSpan} h-full`}>
            <h2 className={DashboardStyles.cardTitle}>{card.title}</h2>
            {card.component}
          </div>
        ))}
      </section>
    </DashboardTemplate>
  );
};

export default DashboardPage;
