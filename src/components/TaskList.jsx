const TaskList = () => {
  const tasks = [
    { name: "Diseñar página principal", priority: "Alta" },
    { name: "Revisar feedback del cliente", priority: "Media" },
    { name: "Optimizar imágenes", priority: "Baja" },
  ];

  return (
    <ul className="space-y-4">
      {tasks.map((task, index) => (
        <li
          key={index}
          className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
          <span>{task.name}</span>
          <span
            className={`py-1 text-center w-[80px] rounded-full text-white ${
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
