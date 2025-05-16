import React from "react";

const ClientImage = ({ selectedClient }) => {
  return (
    <img
      id="imagen-cliente"
      src={
        selectedClient.image
          ? `http://localhost:5000${selectedClient.image}`
          : "../../../server/uploads/avatar_placeholder_large.png"
      }
      alt={selectedClient.fullName}
      className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover bg-white "
    />
  );
};

export default ClientImage;
