import React from "react";

const Notifications = () => {
  const notifications = [
    "Reunión con el cliente a las 3:00 PM",
    "Entrega del proyecto en 2 días",
    "Revisión de diseño pendiente",
  ];

  return (
    <ul className="space-y-4">
      {notifications.map((notification, index) => (
        <li
          key={index}
          className="bg-blue-100 text-blue-800 p-4 rounded-lg shadow-md font-base">
          {notification}
        </li>
      ))}
    </ul>
  );
};

export default Notifications;
