const ProjectCard = ({
  project,
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

  return (
    <li
      id={`Proyecto-${project.title}`}
      className="bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shadow-lg rounded-lg p-4">
      <article className="flex flex-col gap-4 p-4">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p>{project.description}</p>
        <div className="flex flex-col gap-1 mt-4">
          <p className="text-sm dark:text-gray-100">
            Fecha de inicio: {new Date(project.startDate).toLocaleDateString()}
          </p>
          <p className="text-sm dark:text-gray-100">
            Fecha de término: {new Date(project.dueDate).toLocaleDateString()}
          </p>
          <p className="text-base text-gray-700 dark:text-gray-100">
            Días restantes al día de hoy:{" "}
            <span className="text-blue-900 dark:text-blue-400 font-semibold">
              {Math.ceil(
                (new Date(project.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
              )}
            </span>
          </p>
          <p className="text-base text-gray-700 dark:text-gray-100 font-semibold mt-2">
            Total del proyecto:{" "}
            <span className="text-blue-900 dark:text-blue-400">
              ${total.toLocaleString("es-MX")}
            </span>
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between mt-4">
          <div className="flex items-center gap-2">
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
          <div className="flex flex-col md:flex-row gap-4 mt-8">
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
        </div>
      </article>
    </li>
  );
};

export default ProjectCard;
