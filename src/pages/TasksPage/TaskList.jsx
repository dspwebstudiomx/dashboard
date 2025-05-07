import React from "react";

const TaskList = ({ tasks, handleDeleteTask, handleEditTask, client }) => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">Lista de Tareas</h2>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <div
            key={index}
            className="border rounded p-4 mb-4 flex justify-between items-center">
            <div>
              <h2 className="font-semibold">
                {client.name} {client.lastName}
              </h2>
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <p>
                <span className="font-semibold">Inicio:</span> {task.startDate}
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
