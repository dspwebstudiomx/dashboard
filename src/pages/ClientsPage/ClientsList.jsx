import React from "react";
import ClientsCard from "./ClientsCard";

const ClientsList = ({ clients, handleEditClient, handleDeleteClient }) => {
  return (
    <article
      id="contenedor-cliente-derecho"
      className="grid grid-cols-1 gap-12 w-2/3 mx-auto mt-30">
      {clients.map((client) => (
        <ClientsCard
          key={client.id}
          client={client}
          handleEditClient={() => handleEditClient(client)}
          handleDeleteClient={handleDeleteClient}
        />
      ))}
    </article>
  );
};

export default ClientsList;
