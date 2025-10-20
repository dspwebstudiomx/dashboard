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
		const start = startOfMonth(currentDate); // Obtener el inicio del mes actual
		const end = endOfMonth(currentDate); // Obtener el final del mes actual
		const days = eachDayOfInterval({ start, end }); // Obtener todos los días del mes actual
		const weekDays = ['D', 'L', 'M', 'X', 'J', 'V', 'S']; // Iniciales de los días de la semana en español
		const firstDayIndex = getDay(start); // Calcular el índice del primer día del mes
		const lastDayIndex = getDay(end); // Calcular el índice del último día del mes
		return (
			<section className="h-full">
				{/* Encabezado con iniciales de los días */}
				<div className="grid grid-cols-7 gap-2 mb-6 border-b-2 border-gray-300 dark:border-gray-600">
					{weekDays.map((day, index) => (
						<div key={index} className="text-center font-semibold">
							{day}
						</div>
					))}
				</div>
				{/* Días del mes */}
				<div className="grid grid-cols-7 gap-2">
					{/* Espacios vacíos antes del primer día del mes */}
					{Array.from({ length: firstDayIndex }).map((_, index) => (
						<div key={`empty-start-${index}`} className="p-3"></div>
					))}
					{/* Días del mes */}
					{days.map((day) => (
						<div
							key={day.toString()}
							className={`text-center p-3 rounded-full font-semibold ${
								isSameDay(day, today)
									? 'bg-blue-500 text-white'
									: 'dark:bg-gray-700 dark:text-gray-200 hover:bg-blue-100 hover:dark:bg-gray-600 bg-gray-100 text-gray-800 rounded-full '
							}`}
						>
							{format(day, 'd', { locale: es })}
						</div>
					))}
					{/* Espacios vacíos después del último día del mes */}
					{Array.from({ length: 6 - lastDayIndex }).map((_, index) => (
						<div key={`empty-end-${index}`} className="p-2"></div>
					))}
				</div>
			</section>
		);
	};

	return (
		<div className="flex flex-col place-content-center rounded-lg">
			{/* Encabezado del calendario con botones de navegación */}
			<div className="flex justify-between w-full px-4 items-center mb-4">
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
			{/* Vista del mes */}
			{renderMonthView()}
		</div>
	);
};

export default Calendar;
