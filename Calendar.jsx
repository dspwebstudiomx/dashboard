import React, { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isToday,
} from 'date-fns';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // "day", "month", "year"

  const handlePrev = () => {
    setCurrentDate((prev) => (view === 'month' ? subMonths(prev, 1) : prev));
  };

  const handleNext = () => {
    setCurrentDate((prev) => (view === 'month' ? addMonths(prev, 1) : prev));
  };

  const renderMonthView = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });

    return (
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div
            key={day}
            className={`text-center p-2 rounded-lg ${
              isToday(day) ? 'bg-blue-500 text-white font-bold' : 'bg-blue-100'
            }`}
          >
            {format(day, 'd')}
          </div>
        ))}
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
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button onClick={handleNext} className="p-2">
          <FaArrowRight size={28} className="text-blue-600" />
        </button>
      </div>
      {view === 'month' && renderMonthView()}
      {/* Agregar vistas de "día" y "año" aquí en el futuro */}
    </div>
  );
};

export default Calendar;