import React, { useState, useEffect } from "react";
import axios from "axios";
import ClientsCard from "./ClientsCard";
import ClientsModal from "./ClientsModal";
import { FaEdit } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { handleScrollToTop, handleScrollToBottom } from "@api/GeneralApi";

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
    <section
      id="clients-list-container"
      className="flex flex-row-reverse gap-12">
      {/* // Botones de la barra lateral */}
      <aside
        id="clients-aside-buttons"
        className="header fixed bottom-0 md:top-40 grid grid-cols-3 md:grid-cols-1 items-start md:gap-0 w-full md:w-auto h-auto md:h-[250px]">
        {/* Botón agregar clientes */}
        <button
          id="agregar-cliente"
          onClick={() => handleOpenModal()}
          className="text-white px-6 py-4 flex items-center justify-center gap-2 p-2  md:rounded-lg bg-blue-900 hover:bg-blue-700 transition duration-300 md:min-w-[210px] shadow-2xl w-full"
          aria-label="Agregar cliente">
          <IoPersonAddSharp size={25} />
          <span className="hidden md:block"> Agregar Cliente</span>
        </button>
        {/* Botón ir arriba */}
        <button
          id="ir-a-inicio"
          onClick={handleScrollToTop}
          className="text-white px-6 py-4 flex items-center justify-center gap-2 p-2 md:rounded-lg bg-blue-600 hover:bg-blue-500 transition duration-300 mx-auto md:min-w-[210px] shadow-2xl w-full"
          aria-label="Ir a inicio">
          <FaArrowUp size={25} />
          <span className="hidden md:block">Ir a Inicio</span>
        </button>
        {/* Botón ir abajo */}
        <button
          id="ir-al-final"
          onClick={handleScrollToBottom}
          className="text-white px-6 py-4 flex items-center justify-center gap-2 p-2 md:rounded-lg bg-blue-500 hover:bg-blue-400 transition duration-300 mx-auto md:min-w-[210px] shadow-2xl w-full"
          aria-label="Ir al final">
          <FaArrowDown size={25} />
          <span className="hidden md:block">Ir al Final</span>
        </button>
      </aside>
      {/* // Lista de clientes */}
      <ul
        id="clients-list"
        className="flex flex-col gap-12 mx-auto w-3/4 md:ml-10 md:mb-20">
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
      {/* // Modal para agregar o editar cliente */}
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
