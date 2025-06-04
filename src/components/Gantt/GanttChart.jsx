import React, { useRef, useEffect } from 'react';
import Gantt from 'frappe-gantt';

const GanttChart = ({ tasks }) => {
	const ganttRef = useRef(null);

	const taskData = tasks.map((task) => ({
		id: task.taskId || task.id,
		name: task.title,
		start: task.startDate,
		end: task.dueDate,
		progress: task.totalProgress || 0,
		dependencies: task.dependencies || '',
	}));

	useEffect(() => {
		if (!ganttRef.current) return;
		if (ganttRef.current.clientWidth === 0) return;

		const el = ganttRef.current;

		new Gantt(el, taskData, {
			on_click: (task) => {
				console.log(task);
			},
			on_date_change: (task, start, end) => {
				console.log(task, start, end);
			},
			on_progress_change: (task, progress) => {
				console.log(task, progress);
			},
			on_view_change: (mode) => {
				console.log(mode);
			},
		});

		const meses = [
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre',
		];
		const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

		document.querySelectorAll('.lower-text').forEach((el) => {
			const txt = el.textContent;
			const match = txt.match(/^\d+$/);
			if (!match) {
				const idx = meses.findIndex((m) => txt.includes(m));
				if (idx === -1) {
					dias.forEach((dia, i) => {
						if (txt.includes(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i])) {
							el.textContent = dia;
						}
					});
				}
			}
		});
		document.querySelectorAll('.upper-text').forEach((el) => {
			meses.forEach((mes, i) => {
				const en = [
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
					'August',
					'September',
					'October',
					'November',
					'December',
				][i];
				if (el.textContent.includes(en)) {
					el.textContent = el.textContent.replace(en, mes);
				}
			});
		});

		const noop = () => {};
		el.addEventListener('mousewheel', noop, { passive: true });

		return () => {
			el.removeEventListener('mousewheel', noop);
			el.innerHTML = '';
		};
	}, [taskData]);

	return (
		<div className="p-4 my-20">
			<h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-12">
				Cronograma del Proyecto
			</h2>
			<div ref={ganttRef} className="gantt-chart"></div>
		</div>
	);
};

export default GanttChart;
