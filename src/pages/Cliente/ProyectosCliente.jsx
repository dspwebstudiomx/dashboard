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
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <p>{project.description}</p>
            </div>
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-start rounded-xl shadow-2xl p-8 gap-8 mt-6 dark:bg-gray-600 bg-white">
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
