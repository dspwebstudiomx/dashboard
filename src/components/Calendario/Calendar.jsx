import React, { useState } from 'react';
import {
	format,
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
	addMonths,
	subMonths,
	isSameDay,
	getDay,
	startOfDay,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Card from '@components/Card/Card';

// Estructura del componente Calendar
const Calendar = () => {
	// Usar la fecha local y redondear al inicio del día.
	// Evitamos ajustes manuales de zona horaria que pueden introducir errores de signo
	// (p. ej. con getTimezoneOffset) y producir días desplazados.
	const initialDate = startOfDay(new Date()); // Fecha inicial local al inicio del día
	const [currentDate, setCurrentDate] = useState(initialDate);
	const today = startOfDay(new Date()); // Día actual local redondeado al inicio del día
	const handlePrev = () => {
		setCurrentDate((prev) => startOfDay(subMonths(prev, 1)));
	}; // Retroceder un mes y mantener inicio del día
	const handleNext = () => {
		setCurrentDate((prev) => startOfDay(addMonths(prev, 1)));
	}; // Avanzar un mes y mantener inicio del día
	const renderMonthView = () => {
		const start = startOfMonth(currentDate); // Inicio del mes actual
		const end = endOfMonth(currentDate); // Fin del mes actual
		const days = eachDayOfInterval({ start, end }); // Días del mes actual
		const weekDays = ['D', 'L', 'M', 'X', 'J', 'V', 'S']; // Iniciales de los días de la semana en español
		const firstDayIndex = getDay(start); // Índice del primer día del mes
		const lastDayIndex = getDay(end); // Índice del último día del mes

		// Días del mes anterior necesarios para completar la primera semana
		const prevMonthEnd = subMonths(start, 1); // Último día del mes anterior
		const prevMonthLastDay = endOfMonth(prevMonthEnd); // Último día del mes anterior
		const prevMonthDays = Array.from({ length: firstDayIndex }).map((_, index) =>
			startOfDay(
				new Date(
					prevMonthLastDay.getFullYear(),
					prevMonthLastDay.getMonth(),
					prevMonthLastDay.getDate() - (firstDayIndex - index - 1)
				)
			)
		);

		// Días del mes siguiente necesarios para completar la última semana
		const nextMonthStart = addMonths(end, 1); // Primer día del mes siguiente
		const nextMonthDays = Array.from({ length: 6 - lastDayIndex }).map((_, index) =>
			startOfDay(new Date(nextMonthStart.getFullYear(), nextMonthStart.getMonth(), index + 1))
		);

		return (
			<div>
				{/* Encabezado con iniciales de los días */}
				<div className="grid grid-cols-7 gap-2 mb-6 border-b-2 border-gray-300 dark:border-gray-600">
					{weekDays.map((day, index) => (
						<div key={index} className="text-center font-semibold mb-3">
							{day}
						</div>
					))}
				</div>
				{/* Días del mes */}
				<div
					className="grid grid-cols-7 gap-3 mb-36"
					style={{ height: 'calc(7 * 2rem)' }} // Altura fija para 6 filas (máximo número de semanas en un mes)
				>
					{/* Días del mes anterior */}
					{prevMonthDays.map((day, index) => (
						<div
							key={`prev-${index}`}
							className="text-center p-3 rounded-full font-semibold text-gray-400 dark:text-gray-500"
						>
							{format(day, 'd', { locale: es })}
						</div>
					))}
					{/* Días del mes actual */}
					{days.map((day) => (
						<div
							key={day.toString()}
							className={`text-center p-3 rounded-full font-semibold ${
								isSameDay(day, today)
									? 'bg-blue-500 text-white border-2 border-blue-700'
									: 'dark:bg-gray-700 dark:text-gray-200 hover:bg-blue-100 hover:dark:bg-gray-600 bg-gray-100 border-2 border-gray-200 dark:border-gray-600 text-gray-800 rounded-full '
							}`}
						>
							{format(day, 'd', { locale: es })}
						</div>
					))}
					{/* Días del mes siguiente */}
					{nextMonthDays.map((day, index) => (
						<div
							key={`next-${index}`}
							className="text-center p-3 rounded-full font-semibold text-gray-400 dark:text-gray-500"
						>
							{format(day, 'd', { locale: es })}
						</div>
					))}
				</div>
			</div>
		);
	};

	return (
		<section className="">
			<div className="flex justify-between w-full px-4 items-center mb-6">
				<button onClick={handlePrev} className="p-2">
					<FaArrowLeft size={28} className="text-blue-600 hover:text-blue-700" />
				</button>
				<h2 className="text-lg font-semibold">
					{format(currentDate, 'MMMM yyyy', { locale: es })}
				</h2>
				<button onClick={handleNext} className="p-2">
					<FaArrowRight size={28} className="text-blue-600 hover:text-blue-700" />
				</button>
			</div>
			{renderMonthView()}
		</section>
	);
};

export default Calendar;
