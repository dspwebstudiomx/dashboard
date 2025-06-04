import React, { useState } from 'react';
import { Gantt, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { mapTasksToGantt } from './ganttUtils';

const GanttChart = ({ tasks }) => {
	const [view, setView] = useState(ViewMode.Week);

	const ganttTasks = mapTasksToGantt(tasks);

	// Depuración: muestra las tareas en consola
	console.log('ganttTasks', ganttTasks);

	// Opcional: filtra tareas inválidas para evitar el error
	const validGanttTasks = ganttTasks.filter((task, idx) => {
		if (
			!task ||
			!(task.start instanceof Date) ||
			isNaN(task.start) ||
			!(task.end instanceof Date) ||
			isNaN(task.end)
		) {
			console.warn(`Tarea inválida en el índice ${idx}:`, task);
			return false;
		}
		return true;
	});

	return (
		<div className="my-20 p-4 bg-white">
			<h2 className="text-2xl font-semibold">Diagrama de Gantt del Proyecto</h2>
			<div className=" flex justify-end mb-4 items-center gap-4">
				<button onClick={() => setView(ViewMode.Day)}>Día</button>
				<button onClick={() => setView(ViewMode.Week)}>Semana</button>
				<button onClick={() => setView(ViewMode.Month)}>Mes</button>
			</div>
			<Gantt
				tasks={validGanttTasks}
				viewMode={view}
				onDateChange={(task, start, end) => {
					console.log('Fecha cambiada:', task, start, end);
				}}
				locale="es"
				listCellWidth="205px"
				barFill={60}
				columnWidth={100}
				viewDate={new Date()}
			/>
		</div>
	);
};

export default GanttChart;
