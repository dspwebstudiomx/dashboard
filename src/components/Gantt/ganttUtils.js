/**
 * Convierte un arreglo de tareas de tu backend al formato de gantt-task-react
 * @param {Array} tasks
 * @returns {Array}
 */
export function mapTasksToGantt(tasks) {
  return (tasks || [])
    .filter(
      (task) => {
        if (!task.startDate || !task.dueDate) return false;
        const start = new Date(task.startDate);
        const end = new Date(task.dueDate);
        // Filtra fechas inválidas
        return start instanceof Date && !isNaN(start) && end instanceof Date && !isNaN(end);
      }
    )
    .map((task) => ({
      id: task.taskId,
      name: task.title || '',
      start: new Date(task.startDate),
      end: new Date(task.dueDate),
      progress: task.totalProgress || 0,
      type: 'task',
      // Puedes agregar más campos según lo que requiera tu Gantt
    }));
}

export function ganttDateRange2(task) {
  if (!task || !task.start) {
    // Maneja el error o retorna un valor por defecto
    return null;
  }
  // ...código existente...
}
