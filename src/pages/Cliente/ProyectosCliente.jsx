import React from "react";
import { MdErrorOutline } from "react-icons/md";

const ProyectosCliente = ({ isProyectExist, selectedClient }) => {
  return (
    <article>
      <h2 className="text-2xl font-semibold mb-4">Mis Proyectos</h2>
      <p className="mb-4">
        Aquí puedes ver todos los proyectos relacionados con este cliente.
      </p>
      <div className="mt-12">
        {isProyectExist ? (
          selectedClient.projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shadow-lg rounded-lg p-4">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p>{project.description}</p>
              <div className="flex flex-col gap-1 mt-4">
                <p className="text-sm dark:text-gray-100">
                  Fecha de inicio:{" "}
                  {new Date(project.startDate).toLocaleDateString()}
                </p>
                <p className="text-sm dark:text-gray-100">
                  Fecha de término:{" "}
                  {new Date(project.dueDate).toLocaleDateString()}
                </p>
                <p className="text-base text-gray-100">
                  Días restantes:{" "}
                  {Math.ceil(
                    (new Date(project.dueDate) - new Date()) /
                      (1000 * 60 * 60 * 24)
                  )}
                </p>
              </div>
              <div className="flex justify-between mt-4">
                {/* Prioridades */}
                <div className="flex items-center gap-2">
                  <span
                    className={`text-base font-semibold text-gray-100 py-1 px-6 rounded-full ${
                      project.priority === "Alta"
                        ? "bg-red-600"
                        : project.priority === "Media"
                        ? "bg-yellow-600"
                        : "bg-green-600"
                    }`}>
                    {project.priority}
                  </span>
                </div>
                {/* // Botón para ver detalles del proyecto */}
                <button className="text-white px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-300">
                  Ver Detalles
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-start rounded-xl shadow-2xl p-8 gap-8 mt-6 dark:bg-gray-700 bg-white border-2 border-gray-300 dark:border-gray-600">
            <p className="text-gray-800 dark:text-gray-100 flex items-center gap-2 font-semibold">
              <MdErrorOutline
                size={24}
                className="inline-block text-2xl text-red-700"
              />
              No hay proyectos disponibles para este cliente.
            </p>
            {/* //Boton para agregar un nuevo proyecto */}
            <button
              className="text-white px-6 py-3 flex items-center justify-center gap-2 rounded-xl bg-blue-900 dark:bg-blue-600 hover:bg-blue-700 transition duration-300 shadow-2xl"
              onClick={() => {
                // Lógica para agregar un nuevo proyecto
                console.log("Agregar nuevo proyecto");
              }}>
              Agregar Proyecto
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default ProyectosCliente;
