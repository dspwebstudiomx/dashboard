import React, { useState } from 'react';
import { Gantt, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { mapTasksToGantt } from './ganttUtils';

const GanttChart = ({ tasks, onTaskClick, onDateChange }) => {
	const [viewMode, setViewMode] = useState(ViewMode.Day); // Cambiar a ViewMode.Day
	const [taskList, setTaskList] = useState(mapTasksToGantt(tasks));

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
						viewMode === ViewMode.Day ? 'bg-blue-500 text-white' : 'bg-gray-100 border-gray-300'
					} hover:bg-blue-600 hover:text-white`}
					onClick={() => handleViewModeChange(ViewMode.Day)}
				>
					Día
				</button>
				<button
					className={`rounded-full px-4 py-1 shadow-3xl border ${
						viewMode === ViewMode.Week ? 'bg-blue-500 text-white' : 'bg-gray-100 border-gray-300'
					} hover:bg-blue-600 hover:text-white`}
					onClick={() => handleViewModeChange(ViewMode.Week)}
				>
					Semana
				</button>
				<button
					className={`rounded-full px-4 py-1 shadow-3xl border ${
						viewMode === ViewMode.Month ? 'bg-blue-500 text-white' : 'bg-gray-100 border-gray-300'
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
					onDateChange={(task, start, end) => {
						if (onDateChange) {
							onDateChange(task, start, end);
						}
					}}
					locale="es"
					columnWidth={viewMode === ViewMode.Day ? 100 : viewMode === ViewMode.Week ? 120 : 300} // Ajustar ancho de columna según el modo de vista
					barFill={60}
				/>
			</div>
		</div>
	);
};

export default GanttChart;
