import React, { useState, useEffect } from "react";
import axios from "axios";
import ClientsCard from "./ClientsCard";
import ClientsModal from "./ClientsModal";
import { FaEdit } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import {
  handleRefreshClients,
  handleScrollToTop,
  handleScrollToBottom,
} from "@api/GeneralApi";

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
      <aside
        id="clients-aside-buttons"
        className="header h-auto fixed flex flex-col items-end gap-8">
        {/* <h1 className="text-2xl font-semibold">Lista de Clientes</h1> */}
        <button
          id="agregar-cliente"
          onClick={() => handleOpenModal()}
          className="text-white px-6 py-4 flex items-center justify-center gap-2 p-2 rounded-lg bg-blue-900 hover:bg-blue-700 transition duration-300 min-w-[210px] shadow-2xl"
          aria-label="Agregar cliente">
          <IoPersonAddSharp size={25} />
          Agregar Cliente
        </button>
        <button
          id="refrescar-clientes"
          onClick={handleRefreshClients({ setClients })}
          className=" text-white px-6 py-4 flex items-center justify-center gap-2 p-2 rounded-lg bg-blue-700 hover:bg-blue-600 transition duration-300 mx-auto min-w-[210px] shadow-2xl"
          aria-label="Refrescar lista de clientes">
          <FaArrowRotateLeft size={25} />
          Refrescar Clientes
        </button>
        <button
          id="ir-a-inicio"
          onClick={handleScrollToTop}
          className="text-white px-6 py-4 flex items-center justify-center gap-2 p-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition duration-300 mx-auto min-w-[210px] shadow-2xl"
          aria-label="Ir a inicio">
          <FaArrowUp size={25} />
          Ir a Inicio
        </button>
        <button
          id="ir-al-final"
          onClick={handleScrollToBottom}
          className="text-white px-6 py-4 flex items-center justify-center gap-2 p-2 rounded-lg bg-blue-500 hover:bg-blue-400 transition duration-300 mx-auto min-w-[210px] shadow-2xl"
          aria-label="Ir al final">
          <FaArrowDown size={25} />
          Ir al Final
        </button>
      </aside>
      <ul id="clients-list" className="flex flex-col gap-12 mx-auto max-w-2/3">
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
