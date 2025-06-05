import React, { useState } from 'react';
import { Gantt, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { mapTasksToGantt } from './ganttUtils';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}
	static getDerivedStateFromError() {
		return { hasError: true };
	}
	componentDidCatch(error, errorInfo) {
		console.error('Error en Gantt:', error, errorInfo);
	}
	render() {
		if (this.state.hasError) {
			return <div>Ocurrió un error al mostrar el diagrama de Gantt.</div>;
		}
		return this.props.children;
	}
}

const GanttChart = ({ tasks }) => {
	const [view, setView] = useState(ViewMode.Week);

	const ganttTasks = mapTasksToGantt(tasks);

	console.log('ganttTasks detallado', JSON.stringify(ganttTasks, null, 2));

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
			<ErrorBoundary>
				<Gantt
					tasks={validGanttTasks}
					viewMode={view}
					onDateChange={(task, start, end) => {
						console.log('Fecha cambiada:', task, start, end);
					}}
					locale="es"
					listCellWidth="205px"
					barFill={60}
					columnWidth={77}
					viewDate={new Date()}
				/>
			</ErrorBoundary>
		</div>
	);
};

export default GanttChart;
