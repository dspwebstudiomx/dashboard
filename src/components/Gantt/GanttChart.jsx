import React, { useState } from 'react';
import { Gantt, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { mapTasksToGantt } from './ganttUtils';

const GanttChart = ({ tasks, onTaskClick }) => {
	const [viewMode, setViewMode] = useState(ViewMode.Week);
	const [selectedTask, setSelectedTask] = useState(null);
	const [taskList, setTaskList] = useState(mapTasksToGantt(tasks));

	const handleTaskClick = (task) => {
		setSelectedTask(task);
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
			<div className="view-mode-controls flex justify-end mb-2 gap-4">
				<button
					className="rounded-full px-4 py-1 shadow-3xl bg-gray-100 border border-gray-300"
					onClick={() => handleViewModeChange(ViewMode.Day)}
				>
					Day
				</button>
				<button
					className="border rounded-full px-4 py-1 shadow-2xl"
					onClick={() => handleViewModeChange(ViewMode.Week)}
				>
					Week
				</button>
				<button
					className="border rounded-full px-4 py-1 shadow-2xl"
					onClick={() => handleViewModeChange(ViewMode.Month)}
				>
					Month
				</button>
			</div>
			<Gantt
				tasks={taskList}
				viewMode={viewMode}
				onClick={handleTaskClick}
				onTaskChange={handleTaskChange}
				onViewChange={handleViewModeChange}
				selectedTask={selectedTask}
				project={{ name: 'Project Name', start: new Date(), end: new Date() }}
				onDateChange={(task, start, end) => {
					console.log('Fecha cambiada:', task, start, end);
				}}
				locale="es"
				columnWidth={viewMode === ViewMode.Day ? 100 : viewMode === ViewMode.Week ? 120 : 300} // Ajustar ancho de columna según el modo de vista
				barFill={60}
			/>
		</div>
	);
};

export default GanttChart;
