import React, { useState } from "react";
import Button from "@components/Botones/Button";
import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

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
  const impuestos = total * 0.16;
  const totalConImpuestos = total + impuestos;

  // Lógica para recortar la descripción
  const [showFullDesc, setShowFullDesc] = useState(false);
  const descriptionWords = project.description
    ? project.description.split(" ")
    : [];
  const isLongDescription = descriptionWords.length > 40;
  const shortDesc = isLongDescription
    ? descriptionWords.slice(0, 40).join(" ") + "..."
    : project.description;

  // Estado local para mostrar si el proyecto está terminado
  const [isCompleted, setIsCompleted] = useState(project.completed || false);

  // Función para manejar el cierre del proyecto
  const handleCompleteClick = async () => {
    await handleComplete(project.id);
    setIsCompleted(true);
  };

  return (
    // Tarjeta del proyecto
    <li
      id={`Proyecto-${project.title}`}
      className="bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shadow-lg rounded-lg overflow-hidden h-auto min-h-[600px]">
      {/* Linea de tarjeta */}
      <div
        className={`h-2 w-full ${
          project.completed
            ? "bg-blue-600 text-gray-100"
            : project.priority === "Alta"
            ? "bg-red-500 text-gray-100"
            : project.priority === "Media"
            ? "bg-yellow-400 text-gray-800"
            : "bg-green-600 text-gray-100"
        }`}>
        <br />
      </div>
      {/* Contenido de la tarjeta */}
      <article className="flex flex-col md:flex-row gap-12 p-6 md:p-8 justify-between">
        <div className="flex flex-col gap-8 text-balance w-full ">
          {/* Título y prioridad */}
          <div className="flex flex-col-reverse md:flex-row justify-between mt-4 gap-12 md:gap-6">
            <h3 className="text-xl md:text-xl font-semibold uppercase">
              {project.title}
            </h3>
            {/* Prioridad */}
            <div className="flex justify-end md:items-center gap-2">
              <span
                className={`text-base font-medium py-1 px-6 rounded-full ${
                  project.priority === "Alta"
                    ? "bg-red-400 text-gray-100 border-2 border-red-500"
                    : project.priority === "Media"
                    ? "bg-yellow-400 text-gray-100 border-2 border-yellow-500"
                    : "bg-green-500 text-gray-100 border-2 border-green-600"
                }`}>
                {project.priority}
              </span>
            </div>
          </div>
          {/* Descripción del Proyecto */}
          <div>
            <p style={{ whiteSpace: "pre-line" }}>
              {showFullDesc || !isLongDescription
                ? project.description
                : shortDesc}
            </p>

            {isLongDescription && (
              <button
                className="text-blue-600 dark:text-blue-700 ml-2 mt-4 font-semibold"
                onClick={() => setShowFullDesc((prev) => !prev)}
                type="button">
                {showFullDesc ? "Ver menos" : "Ver más..."}
              </button>
            )}
          </div>

          {/* Servicios */}
          <div id="servicios" className="flex flex-col gap-2">
            <h4 className="text-lg font-semibold">Servicios:</h4>
            {Array.isArray(project.services) && project.services.length > 0 ? (
              <ul className="flex flex-wrap gap-2 mt-4">
                {project.services.map((service, index) => {
                  const blueShades = [
                    "bg-blue-400 border-blue-500",
                    "bg-blue-500 border-blue-600",
                    "bg-blue-600 border-blue-700",
                    "bg-blue-700 border-blue-800",
                    "bg-blue-800 border-blue-900",
                    "bg-blue-900 border-blue-800",
                  ];
                  const shade = blueShades[index % blueShades.length];
                  return (
                    <span
                      key={index}
                      className={`dark:text-gray-100 text-gray-100 font-semibold py-1 px-4 rounded-full mr-2 mb-2 border-2 ${shade}`}>
                      {service}
                    </span>
                  );
                })}
              </ul>
            ) : (
              <span className="bg-blue-100 text-blue-800 font-semibold py-1 px-4 rounded-full mt-4 w-fit border-2 border-blue-600">
                No solicitados
              </span>
            )}
          </div>

          {/* Secciones requeridas por el cliente */}
          <div id="secciones" className="flex flex-col gap-2">
            <h4 className="text-lg font-semibold">Secciones:</h4>
            {Array.isArray(project.sections) && project.sections.length > 0 ? (
              <ul className="flex flex-wrap gap-2 mt-4">
                {project.sections.map((section, index) => {
                  const blueShades = [
                    "bg-blue-400 border-blue-500",
                    "bg-blue-500 border-blue-600",
                    "bg-blue-600 border-blue-700",
                    "bg-blue-700 border-blue-800",
                    "bg-blue-800 border-blue-900",
                    "bg-blue-900 border-blue-800",
                  ];
                  const shade = blueShades[index % blueShades.length];
                  return (
                    <span
                      key={index}
                      className={`dark:text-gray-100 text-gray-100 font-semibold py-1 px-4 rounded-full mr-2 mb-2 border-2 ${shade}`}>
                      {section}
                    </span>
                  );
                })}
              </ul>
            ) : (
              <span className="bg-blue-100 text-blue-400 font-semibold py-1 px-4 rounded-full mt-4 w-fit border-2 border-blue-400">
                No solicitadas
              </span>
            )}
          </div>
        </div>

        {/* Datos del Proyecto */}
        <div className="text-lg md:text-base">
          <div className="flex flex-col gap-2 mt-4">
            {/* Fecha de Inicio */}
            <p className=" dark:text-gray-100">
              Fecha de inicio:{" "}
              <span className="text-blue-900 dark:text-blue-400 font-semibold">
                {new Date(project.startDate).toLocaleDateString()}
              </span>
            </p>
            {/* Fecha de término */}
            <p className=" dark:text-gray-100">
              Fecha de término:{" "}
              <span className="text-blue-900 dark:text-blue-400 font-semibold">
                {new Date(project.dueDate).toLocaleDateString()}
              </span>
            </p>
            {/* Días restantes */}
            <p className=" text-gray-700 dark:text-gray-100">
              Días restantes al día de hoy:{" "}
              <span className="text-blue-900 dark:text-blue-400 font-semibold">
                {isCompleted
                  ? "terminado"
                  : Math.max(
                      0,
                      Math.ceil(
                        (new Date(project.dueDate) - new Date()) /
                          (1000 * 60 * 60 * 24)
                      )
                    )}
              </span>
            </p>
            {/* Duración del Proyecto */}
            <p className=" text-gray-700 dark:text-gray-100">
              Duración del Proyecto:{" "}
              <span className="text-blue-900 dark:text-blue-400 font-semibold">
                {Math.ceil(
                  (new Date(project.dueDate) - new Date(project.startDate)) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                días
              </span>
            </p>
            {/* Costo total */}
            <p className=" text-gray-700 dark:text-gray-100 font-semibold mt-2">
              Total del proyecto:{" "}
              <span className="text-blue-900 dark:text-blue-400 text-xl">
                ${totalConImpuestos.toLocaleString("es-MX")}
              </span>
            </p>
          </div>

          <div
            id="botones-tarjeta-proyecto"
            className="flex flex-col gap-4 mt-16 mb-8 md:mt-8">
            <div className="flex flex-col gap-1 items-center">
              {!isCompleted && (
                <>
                  <Button
                    variant="outline"
                    text="Eliminar Proyecto"
                    icon={FaRegTrashAlt}
                    onClick={onDelete}
                    type="button"
                  />
                  <Button
                    variant="blue_3"
                    text="Editar Proyecto"
                    icon={LuPencil}
                    onClick={onEdit}
                    type="button"
                  />
                </>
              )}
            </div>
            {!isCompleted && (
              <Button
                className="text-white px-4 h-15 w-full md:w-[210px] mx-auto  rounded-lg bg-blue-700 hover:bg-blue-800 transition duration-300"
                onClick={handleCompleteClick}
                type="button"
                text="Cerrar Proyecto"
                icon={MdLockOutline}
              />
            )}
            {isCompleted && (
              <span className="px-4 h-15 text-lg w-full md:w-[210px] mx-auto rounded-lg bg-blue-200 text-blue-800 font-medium flex items-center justify-center border border-blue-800">
                Proyecto Cerrado
              </span>
            )}
          </div>
        </div>
      </article>
    </li>
  );
};

export default ProjectCard;
