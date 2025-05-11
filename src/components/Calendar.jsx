import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
} from "date-fns";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month"); // "day", "month", "year"

  const handlePrev = () => {
    setCurrentDate((prev) => (view === "month" ? subMonths(prev, 1) : prev));
  };

  const handleNext = () => {
    setCurrentDate((prev) => (view === "month" ? addMonths(prev, 1) : prev));
  };

  const renderMonthView = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });

    return (
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div key={day} className="text-center p-2 bg-gray-200 rounded-lg">
            {format(day, "d")} {/* Formato corregido */}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center h-64 bg-gray-100 rounded-lg">
      <div className="flex justify-between w-full px-4">
        <button onClick={handlePrev} className="p-2 bg-gray-300 rounded-lg">
          Anterior
        </button>
        <h2 className="text-lg font-semibold">
          {format(currentDate, "MMMM yyyy")} {/* Formato corregido */}
        </h2>
        <button onClick={handleNext} className="p-2 bg-gray-300 rounded-lg">
          Siguiente
        </button>
      </div>
      {view === "month" && renderMonthView()}
      {/* Agregar vistas de "día" y "año" aquí en el futuro */}
    </div>
  );
};

export default Calendar;
