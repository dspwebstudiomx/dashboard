const TaskList = () => {
  const tasks = [
    { name: "Diseñar página principal", priority: "Alta" },
    { name: "Revisar feedback del cliente", priority: "Media" },
    { name: "Optimizar imágenes", priority: "Baja" },
  ];

  return (
    <ul className="space-y-4 px-4">
      {tasks.map((task, index) => (
        <li
          key={index}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center font-base bg-blue-100 text-blue-800 dark:bg-gray-700 dark:text-gray-100 p-4 rounded-lg shadow-md">
          <span className="text-sm sm:text-base">{task.name}</span>
          <span
            className={`mt-2 sm:mt-0 py-1 w-[80px] text-center text-xs sm:text-sm rounded-full ${
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
