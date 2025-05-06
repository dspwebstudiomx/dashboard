import React, { useState, useEffect } from "react";
import axios from "axios";
import ClientsCard from "./ClientsCard";
import ClientsModal from "./ClientsModal";
import { FaEdit } from "react-icons/fa";

const ClientsList = () => {
  const [clients, setClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // Cargar clientes desde el archivo JSON
  useEffect(() => {
    axios
      .get("/server/clients.json")
      .then((response) => setClients(response.data))
      .catch((error) => console.error("Error al cargar clientes:", error));
  }, []);

  // Abrir modal para agregar o editar cliente
  const handleOpenModal = (client = null) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setSelectedClient(null);
    setIsModalOpen(false);
  };

  // Guardar cliente (agregar o editar)
  const handleSaveClient = (client) => {
    if (client.id) {
      // Editar cliente existente
      setClients((prevClients) =>
        prevClients.map((c) => (c.id === client.id ? client : c))
      );
    } else {
      // Agregar nuevo cliente
      setClients((prevClients) => [
        ...prevClients,
        { ...client, id: Date.now() },
      ]);
    }
    handleCloseModal();
  };

  // Eliminar cliente
  const handleDeleteClient = (id) => {
    setClients((prevClients) => prevClients.filter((c) => c.id !== id));
  };

  // Actualizar cliente (para el componente hijo)
  const handleClientUpdate = (updatedClient) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === updatedClient.id ? updatedClient : client
      )
    );
  };

  return (
    <section className="clients-list-container">
      <div className="header flex justify-between items-center mb-24">
        <h1 className="text-2xl font-semibold">Lista de Clientes</h1>
        <button
          id="agregar-cliente"
          onClick={() => handleOpenModal()}
          className="fixed mr-auto right-24 text-white px-6 py-4 flex items-center gap-2 p-2 rounded-lg bg-blue-600 hover:bg-blue-800 transition duration-300"
          aria-label="Agregar cliente">
          <FaEdit size={25} />
          Agregar Cliente
        </button>
      </div>
      <ul className="flex flex-col gap-12 mx-auto max-w-2/3">
        {clients.map((client) => (
          <ClientsCard
            key={client.id}
            client={client}
            handleEditClient={() => handleOpenModal(client)}
            handleDeleteClient={() => handleDeleteClient(client.id)}
            onClose={handleCloseModal}
            // Pasa la función al componente hijo
          />
        ))}
      </ul>
      {isModalOpen && (
        <ClientsModal
          client={selectedClient}
          onSave={handleSaveClient}
          onClose={handleCloseModal}
          isOpen={isModalOpen}
          isEditing={!!selectedClient}
          onClientUpdate={handleClientUpdate} // Pasa la función al componente hijo
        />
      )}
    </section>
  );
};

export default ClientsList;
