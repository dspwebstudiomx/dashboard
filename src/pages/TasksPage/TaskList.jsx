import React from "react";
import clients from "../../../server/clients.json";
import { FaTasks } from "react-icons/fa";
import TaskForm from "./TaskForm";

const TaskList = ({ tasks = [], handleDeleteTask, handleEditTask, client }) => {
  if (!client) {
    return (
      <p className="text-red-500">
        No se ha seleccionado un cliente. Por favor, selecciona un cliente para
        ver las tareas.
      </p>
    );
  }

  return (
    <section className="grid grid-cols-12">
      <div>
        <h2 className="text-xl font-semibold mb-2 col-span-12">
          Lista de tareas
        </h2>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">
              Nombre Completo
            </th>
            <th className="border border-gray-300 px-4 py-2">Apellido</th>
            <th className="border border-gray-300 px-4 py-2">Proyecto</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{client.id}</td>
              <td className="border border-gray-300 px-4 py-2">
                {client.fullName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {client.lastName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {client.project}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {client.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-gray-500 mb-4 col-span-12">
        Aquí puedes ver y administrar las tareas asignadas a {client?.fullName}{" "}
        {client?.lastName} - {client?.project} - {client?.id}
      </p>

      {tasks.length > 0 ? (
        tasks
          .filter((task) => task.clientId === client?.id)
          .map((task, index) => (
            <div
              key={index}
              className="border rounded p-4 mb-4 flex justify-between items-center col-span-12">
              <div>
                <h2 className="font-semibold">
                  {client?.fullName} {client?.lastName}
                </h2>
                <h3 className="font-bold">{task.title}</h3>
                <p>{task.description}</p>
                <p>
                  <span className="font-semibold">Inicio:</span>{" "}
                  {task.startDate}
                </p>
                <p>
                  <span className="font-semibold">Fin:</span> {task.dueDate}
                </p>
                <p>
                  <span className="font-semibold">Prioridad:</span>{" "}
                  {task.priority}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditTask(index)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded">
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteTask(index)}
                  className="bg-blue-900 text-white px-4 py-2 rounded">
                  Eliminar
                </button>
              </div>
            </div>
          ))
      ) : (
        <p className="text-gray-500">No hay tareas disponibles.</p>
      )}
    </section>
  );
};

export default TaskList;
