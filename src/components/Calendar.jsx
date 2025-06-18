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
} from 'date-fns';
import { es } from 'date-fns/locale';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Calendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const today = currentDate; // Día actual

	const handlePrev = () => {
		setCurrentDate((prev) => subMonths(prev, 1));
	};

	const handleNext = () => {
		setCurrentDate((prev) => addMonths(prev, 1));
	};

	const renderMonthView = () => {
		const start = startOfMonth(currentDate);
		const end = endOfMonth(currentDate);
		const days = eachDayOfInterval({ start, end });

		// Iniciales de los días de la semana en español
		const weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

		// Calcular el índice del primer día del mes
		const firstDayIndex = getDay(start);

		// Calcular el índice del último día del mes
		const lastDayIndex = getDay(end);

		return (
			<div>
				{/* Encabezado con iniciales de los días */}
				<div className="grid grid-cols-7 gap-2 mb-2">
					{weekDays.map((day, index) => (
						<div key={index} className="text-center font-semibold">
							{day}
						</div>
					))}
				</div>
				{/* Días del mes */}
				<div className="grid grid-cols-7 gap-2 mt-6">
					{/* Espacios vacíos antes del primer día del mes */}
					{Array.from({ length: firstDayIndex }).map((_, index) => (
						<div key={`empty-start-${index}`} className="p-2"></div>
					))}
					{/* Días del mes */}
					{days.map((day) => (
						<div
							key={day}
							className={`text-center p-2 rounded-lg ${
								isSameDay(day, today)
									? 'bg-blue-500 text-white rounded-full'
									: 'dark:bg-gray-700 dark:text-gray-200 hover:bg-blue-100 hover:dark:bg-gray-600 bg-gray-100 text-gray-800 '
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
			</div>
		);
	};

	return (
		<div className="flex flex-col justify-center items-center h-64 rounded-lg mb-12">
			<div className="flex justify-between w-full px-4 items-center mb-4">
				<button onClick={handlePrev} className="p-2">
					<FaArrowLeft size={28} className="text-blue-600" />
				</button>
				<h2 className="text-lg font-semibold">
					{format(currentDate, 'MMMM yyyy', { locale: es })}
				</h2>
				<button onClick={handleNext} className="p-2">
					<FaArrowRight size={28} className="text-blue-600" />
				</button>
			</div>
			{renderMonthView()}
		</div>
	);
};

export default Calendar;
