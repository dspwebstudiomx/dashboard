import React, { useState } from "react";

const ProjectCard = ({
  project,
  handleComplete,
  SERVICE_COSTS,
  SECTION_COSTS,
  onEdit,
  onDelete,
}) => {
  const totalServicios = Array.isArray(project.services)
    ? project.services.reduce(
        (sum, servicio) => sum + (SERVICE_COSTS[servicio] || 0),
        0
      )
    : 0;
  const totalSecciones = Array.isArray(project.sections)
    ? project.sections.reduce(
        (sum, seccion) => sum + (SECTION_COSTS[seccion] || 0),
        0
      )
    : 0;
  const total = totalServicios + totalSecciones;

  // Lógica para recortar la descripción
  const [showFullDesc, setShowFullDesc] = useState(false);
  const descWords = project.description ? project.description.split(" ") : [];
  const isLongDesc = descWords.length > 40;
  const shortDesc = isLongDesc
    ? descWords.slice(0, 40).join(" ") + "..."
    : project.description;

  // Estado local para mostrar si el proyecto está terminado
  const [isCompleted, setIsCompleted] = useState(project.completed || false);

  // Función para manejar el cierre del proyecto
  const handleCompleteClick = async () => {
    await handleComplete(project.id);
    setIsCompleted(true);
  };

  return (
    <li
      id={`Proyecto-${project.title}`}
      className="bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shadow-lg rounded-lg overflow-hidden">
      <div
        className={`h-2 w-full ${
          project.completed
            ? "bg-blue-600 text-gray-100"
            : project.priority === "Alta"
            ? "bg-red-600 text-gray-100"
            : project.priority === "Media"
            ? "bg-yellow-400 text-gray-800"
            : "bg-green-600 text-gray-100"
        }`}>
        <br />
      </div>
      <article className="flex flex-col md:flex-row gap-12 p-4 md:p-8 justify-between">
        <div className="flex flex-col gap-8 text-balance w-full ">
          <div className="flex flex-col-reverse md:flex-row justify-between mt-4 gap-6">
            <h3 className="text-lg md:text-xl font-semibold uppercase">
              {project.title}
            </h3>
            <div className="flex justify-end md:items-center gap-2">
              <span
                className={`text-base font-medium py-1 px-6 rounded-full ${
                  project.priority === "Alta"
                    ? "bg-red-600 text-gray-100"
                    : project.priority === "Media"
                    ? "bg-yellow-400 text-gray-800"
                    : "bg-green-600 text-gray-100"
                }`}>
                {project.priority}
              </span>
            </div>
          </div>
          <div>
            <p style={{ whiteSpace: "pre-line" }}>
              {showFullDesc || !isLongDesc ? project.description : shortDesc}
            </p>
            {isLongDesc && (
              <button
                className="text-blue-600 dark:text-blue-700 ml-2 mt-4 font-semibold"
                onClick={() => setShowFullDesc((prev) => !prev)}
                type="button">
                {showFullDesc ? "Ver menos" : "Ver más..."}
              </button>
            )}
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-1 mt-4">
            <p className="text-sm dark:text-gray-100">
              Fecha de inicio:{" "}
              <span className="text-blue-900 dark:text-blue-400 font-semibold">
                {new Date(project.startDate).toLocaleDateString()}
              </span>
            </p>
            <p className="text-sm dark:text-gray-100">
              Fecha de término:{" "}
              <span className="text-blue-900 dark:text-blue-400 font-semibold">
                {new Date(project.dueDate).toLocaleDateString()}
              </span>
            </p>
            <p className="text-base text-gray-700 dark:text-gray-100">
              Días restantes al día de hoy:{" "}
              <span className="text-blue-900 dark:text-blue-400 font-semibold">
                {Math.ceil(
                  (new Date(project.dueDate) - new Date()) /
                    (1000 * 60 * 60 * 24)
                )}
              </span>
            </p>
            <p className="text-base text-gray-700 dark:text-gray-100 font-semibold mt-2">
              Total del proyecto:{" "}
              <span className="text-blue-900 dark:text-blue-400 text-lg">
                ${total.toLocaleString("es-MX")}
              </span>
            </p>
          </div>

          <div
            id="botones-tarjeta-proyecto"
            className="flex flex-col gap-4 mt-8">
            <div className="flex gap-4">
              <button
                className="text-white px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition duration-300"
                onClick={onEdit}
                type="button">
                Editar
              </button>
              <button
                className="text-white px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-600 transition duration-300"
                onClick={onDelete}
                type="button">
                Eliminar
              </button>
            </div>
            {!isCompleted && (
              <button
                className="text-white px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 transition duration-300"
                onClick={handleCompleteClick}
                type="button">
                Cerrar Proyecto
              </button>
            )}
            {isCompleted && (
              <span className="px-4 py-2 rounded-lg bg-green-200 text-green-800 font-semibold flex items-center text-sm justify-center">
                Proyecto Terminado
              </span>
            )}
          </div>
        </div>
      </article>
    </li>
  );
};

export default ProjectCard;
