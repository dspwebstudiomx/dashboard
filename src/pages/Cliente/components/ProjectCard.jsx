const ProjectCard = ({
  project,
  SERVICE_COSTS,
  SECTION_COSTS,
  onEdit,
  onDelete,
  isEditing,
  editProject,
  handleEditInputChange,
  handleEditProject,
  setEditProjectId,
  setEditProject,
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

  if (isEditing) {
    return (
      <form onSubmit={handleEditProject} className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          name="title"
          value={editProject.title}
          onChange={handleEditInputChange}
          required
          className="p-2 rounded border"
        />
        <textarea
          name="description"
          value={editProject.description}
          onChange={handleEditInputChange}
          required
          className="p-2 rounded border"
        />
        <div className="flex gap-2">
          <input
            type="date"
            name="startDate"
            value={editProject.startDate}
            onChange={handleEditInputChange}
            required
            className="p-2 rounded border"
          />
          <input
            type="date"
            name="dueDate"
            value={editProject.dueDate}
            onChange={handleEditInputChange}
            required
            className="p-2 rounded border"
          />
          <select
            name="priority"
            value={editProject.priority}
            onChange={handleEditInputChange}
            className="p-2 rounded border">
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            Guardar
          </button>
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
            onClick={() => {
              setEditProjectId(null);
              setEditProject(null);
            }}>
            Cancelar
          </button>
        </div>
      </form>
    );
  }

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
