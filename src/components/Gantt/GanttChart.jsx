import React, { useState } from 'react';
import { Gantt, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { mapTasksToGantt } from './ganttUtils';

const GanttChart = ({ tasks, onTaskClick, onDateChange, clientId, projectId, taskId }) => {
	const [viewMode, setViewMode] = useState(ViewMode.Day); // Cambiar a ViewMode.Day
	const [taskList, setTaskList] = useState(() => {
		// Asegúrate de que tasks esté definido y contenga datos válidos
		return mapTasksToGantt(tasks || []);
	});

	const handleTaskClick = (task) => {
		if (onTaskClick) {
			onTaskClick(task);
		}
	};
	const handleViewModeChange = (mode) => {
		setViewMode(mode);
	};
	const handleTaskChange = (task) => {
		const updatedTasks = taskList.map((t) => (t.id === task.id ? task : t));
		setTaskList(updatedTasks);
	};
	return (
		<div className="gantt-chart-container mt-20">
			<h2 className="text-2xl font-semibold">Diagrama de Gantt</h2>
			<div className="view-mode-controls flex justify-end gap-4 mb-6">
				<button
					className={`rounded-full px-4 py-1 shadow-3xl border ${
						viewMode === ViewMode.Day
							? 'bg-blue-500 text-white'
							: 'bg-gray-100 text-gray-700 border-gray-300 dark:border-gray-400 dark:text-gray-100'
					} hover:bg-blue-600 hover:text-white`}
					onClick={() => handleViewModeChange(ViewMode.Day)}
				>
					Día
				</button>
				<button
					className={`rounded-full px-4 py-1 shadow-3xl border ${
						viewMode === ViewMode.Week
							? 'bg-blue-500 text-white'
							: 'bg-gray-100 text-gray-700 border-gray-300 dark:border-gray-400 dark:text-gray-100'
					} hover:bg-blue-600 hover:text-white`}
					onClick={() => handleViewModeChange(ViewMode.Week)}
				>
					Semana
				</button>
				<button
					className={`rounded-full px-4 py-1 shadow-3xl border ${
						viewMode === ViewMode.Month
							? 'bg-blue-500 text-white'
							: 'bg-gray-100 text-gray-700 border-gray-300 dark:border-gray-400 dark:text-gray-100'
					} hover:bg-blue-600 hover:text-white`}
					onClick={() => handleViewModeChange(ViewMode.Month)}
				>
					Mes
				</button>
			</div>
			<div className="ml-4">
				<Gantt
					tasks={taskList}
					viewMode={viewMode}
					onClick={handleTaskClick}
					onTaskChange={handleTaskChange}
					onDateChange={async (task, start, end) => {
						try {
							// Validar que los valores no sean nulos o indefinidos
							if (!start || !end) {
								console.error('Fechas no proporcionadas:', { start, end });
								throw new Error('Las fechas proporcionadas no son válidas');
							}

							// Convertir las fechas si no son objetos Date
							if (!(start instanceof Date)) {
								start = new Date(start);
							}
							if (!(end instanceof Date)) {
								end = new Date(end);
							}

							// Validar que las fechas sean válidas
							if (isNaN(start) || isNaN(end)) {
								console.error('Fechas inválidas después de la conversión:', { start, end });
								throw new Error('Las fechas proporcionadas no son válidas');
							}

							const response = await fetch(
								`http://localhost:5000/api/clients/${clientId}/projects/${projectId}/tasks/${taskId}`,
								{
									method: 'PUT',
									headers: { 'Content-Type': 'application/json' },
									body: JSON.stringify({
										startDate: start.toISOString(),
										dueDate: end.toISOString(),
									}),
								}
							);

							if (!response.ok) {
								console.error('Error en la respuesta del servidor:', response.statusText);
								throw new Error('Error al actualizar las fechas en el servidor');
							}

							const updatedTask = await response.json();

							// Actualiza el estado local
							const updatedTasks = taskList.map((t) =>
								t.id === updatedTask.id
									? {
											...t,
											start: new Date(updatedTask.startDate),
											end: new Date(updatedTask.dueDate),
									  }
									: t
							);
							setTaskList(updatedTasks);

							if (onDateChange) {
								onDateChange(task, start, end);
							}
						} catch (error) {
							console.error('Error al actualizar las fechas:', error);
							alert('Error al actualizar las fechas');
						}
					}}
					locale="es-MX"
					columnWidth={viewMode === ViewMode.Day ? 60 : viewMode === ViewMode.Week ? 120 : 300}
					barFill={60}
				/>
			</div>
		</div>
	);
};

export default GanttChart;
