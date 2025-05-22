import React, { useState, useEffect } from "react";
import Modal from "@components/Modal";
import Priority from "../Priority";
import ProjectDescriptionInfoCard from "../ProjectDescriptionInfoCard";
import ServicesProjectTag from "../ServicesProjectTag";
import SectionsProjectTag from "../SectionsProjectTag";
import GrayLine from "@components/Lineas/GrayLine";

// Modal para administrar el proyecto
const AdminProjectModal = ({ isOpen, onClose, project, clientId }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [tasks, setTasks] = useState([]);

  // Cargar tareas cuando se abre el modal o cambia el proyecto
  useEffect(() => {
    if (!clientId || !project?.id) {
      console.warn("clientId o project.id no definidos:", {
        clientId,
        projectId: project?.id,
      });
      return;
    }
    if (isOpen) {
      fetch(
        `http://localhost:5000/api/clients/${clientId}/projects/${project.id}/tasks`
      )
        .then((res) => res.json())
        .then((data) => setTasks(data.tasks ?? []));
    }
  }, [isOpen, project, clientId]);

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!clientId || !project?.id) {
      alert("No se puede crear la tarea: faltan datos de cliente o proyecto.");
      return;
    }
    const newTask = {
      title: taskTitle,
      description: taskDescription,
      status: "Pendiente",
      priority: "Baja",
    };

    fetch(
      `http://localhost:5000/api/clients/${clientId}/projects/${project.id}/tasks`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setSuccessMessage("Tarea creada exitosamente.");
        setTasks(data.tasks ?? []);
        setTaskTitle("");
        setTaskDescription("");
        setShowTaskModal(false);
        setTimeout(() => setSuccessMessage(""), 3000);
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClick={onClose} title="Administrar Proyecto">
        <div id="modal-content" className="flex flex-col gap-8 pb-20">
          <h2 id="titulo-proyecto" className="text-3xl text-center  mt-12">
            {project.title}
          </h2>
          <div className="flex flex-col md:flex-row gap-4 h-10 w-auto justify- items-center">
            <h2 className="text-xl font-semibold">Prioridad:</h2>{" "}
            <Priority project={project} />
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">Descripción del Proyecto</h2>
            <ProjectDescriptionInfoCard
              project={project}
              isLongDescription={project.description.length > 100}
              shortDesc={project.description.substring(0, 100)}
              showFullDesc={showFullDesc}
              setShowFullDesc={setShowFullDesc}
            />
          </div>

          <GrayLine />

          <div className="flex flex-col md:flex-col gap-12">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">Servicios Requeridos</h2>
              <ServicesProjectTag project={project} />
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">Servicios Requeridos</h2>
              <SectionsProjectTag project={project} />
            </div>
          </div>

          <GrayLine />

          <div
            id="Asignacion-Tareas"
            className="flex flex-col md:flex-col gap-12">
            <h2 className="text-2xl font-semibold">Asignación de Tareas</h2>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold">Crear Nueva Tarea</h3>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setShowTaskModal(true)}>
                + Nueva Tarea
              </button>
              {successMessage && (
                <span className="text-green-600">{successMessage}</span>
              )}
            </div>
            {/* Tabla que muestra las tareas creadas */}
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="border border-gray-200 px-4 py-2">Título</th>
                    <th className="border border-gray-200 px-4 py-2">
                      Descripción
                    </th>
                    <th className="border border-gray-200 px-4 py-2">
                      Prioridad
                    </th>
                    <th className="border border-gray-200 px-4 py-2">Estado</th>
                    <th className="border border-gray-200 px-4 py-2">
                      Editar/Eliminar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(tasks ?? []).map((task, index) => (
                    <tr key={index}>
                      <td className="border border-gray-200 px-4 py-2">
                        {task.title}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {task.description}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {task.priority}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {task.status}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {/* Botones para Editar o Eliminar tarea */}
                        <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                          Editar
                        </button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal secundario para el formulario de tarea */}
      <Modal
        isOpen={showTaskModal}
        onClick={() => setShowTaskModal(false)}
        title="Crear Nueva Tarea">
        <form onSubmit={handleCreateTask} className="flex flex-col gap-4 p-4">
          <input
            type="text"
            placeholder="Título de la tarea"
            className="border px-2 py-1 rounded"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Descripción"
            className="border px-2 py-1 rounded"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-1 rounded">
              Crear
            </button>
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-1 rounded"
              onClick={() => setShowTaskModal(false)}>
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AdminProjectModal;
