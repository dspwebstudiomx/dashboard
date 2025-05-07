const TaskList = () => {
  const tasks = [
    { name: "Diseñar página principal", priority: "Alta" },
    { name: "Revisar feedback del cliente", priority: "Media" },
    { name: "Optimizar imágenes", priority: "Baja" },
  ];

  return (
    <ul className="space-y-4 px-4 sm:px-6">
      {tasks.map((task, index) => (
        <li
          key={index}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-100 p-4 rounded-lg shadow-md">
          <span className="text-sm sm:text-base font-medium text-gray-800">
            {task.name}
          </span>
          <span
            className={`mt-2 sm:mt-0 py-1 px-3 text-center text-xs sm:text-sm rounded-full text-white ${
              task.priority === "Alta"
                ? "bg-red-500"
                : task.priority === "Media"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}>
            {task.priority}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
