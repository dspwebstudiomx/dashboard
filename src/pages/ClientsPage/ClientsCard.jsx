import React, { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaHome,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ClientsModal from "./ClientsModal";
import { fetchClients } from "@api/clientsApi";

const ClientsCard = ({ client, onClientUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null); // Cliente seleccionado para editar

  const openModal = (client) => {
    setSelectedClient(client); // Establece el cliente seleccionado
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedClient(null); // Limpia el cliente seleccionado
    setIsModalOpen(false);
  };

  const handleDeleteClient = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/clients/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error al eliminar cliente: ${response.statusText}`);
      }

      // Actualiza la lista de clientes en el componente padre
      if (onClientUpdate) {
        onClientUpdate((prevClients) =>
          prevClients.filter((client) => client.id !== id)
        );
      }
    } catch (error) {
      console.error("Error eliminando cliente:", error);
    }
  };

  const handleEdit = () => {
    console.log("Cliente seleccionado para editar:", client); // Verifica los datos del cliente
    openModal(client); // Abre el modal con los datos del cliente actual
  };

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 shadow-2xl rounded-lg p-12 items-start gap-20 bg-white dark:bg-gray-800 font-semibold md:w-full last:mb-30 last:md:mb-0">
        {/* // Lado con imagen, nombre completo y redes sociales */}
        <div className="flex flex-col items-center justify-between h-[80%] gap-12 my-auto ">
          <div
            id="tarjeta-clients-imagen-nombreCompleto-redesSociales"
            className="flex flex-col items-center justify-center w-full gap-6">
            {/* Imagen */}
            <img
              id="imagen-cliente"
              src={
                client.image
                  ? `http://localhost:5000${client.image}`
                  : "../../../server/uploads/avatar_placeholder_large.png"
              }
              alt={client.fullName}
              className="w-24 h-24 rounded-full mx-auto border-2 border-gray-300 object-cover"
            />
            {/* Nombre completo y ID del cliente */}
            <div
              id="cliente-nombre-completo"
              className="text-center flex flex-col items-center justify-center gap-0">
              <h2 className="text-lg font-bold text-gray-700 dark:text-gray-150 text-center w-full mb-3">
                {client.fullName} {client.lastName} {client.lastName2}
              </h2>
              <p className="bg-blue-400 px-4 py-2 rounded-4xl text-blue-800">
                {client.id}
              </p>
            </div>
            {/* Redes sociales */}
            <div
              id="tarjeta-redes-sociales"
              className="grid grid-cols-3 xl:grid-cols-6 gap-1 items-stretch justify-between mt-10 xl:mt-0 w-[80%] mx-auto text-center">
              {client.website && (
                <a
                  href={client.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-500 mx-auto"
                  title="Visitar sitio web">
                  <FaHome size={28} />
                </a>
              )}
              {client.email && (
                <a
                  href={`mailto:${client.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-500 mx-auto"
                  title="Enviar correo electrónico">
                  <FaEnvelope size={28} />
                </a>
              )}
              {client.phoneNumber && (
                <a
                  href={`tel:${client.phoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-500 mx-auto"
                  title="Llamar">
                  <FaPhone size={28} />
                </a>
              )}
              {client.facebook?.trim() && (
                <a
                  href={client.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-500 mx-auto"
                  title="Visitar Facebook">
                  <FaFacebook size={28} />
                </a>
              )}
              {client.twitter?.trim() && (
                <a
                  href={client.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-500 mx-auto"
                  title="Visitar Twitter">
                  <FaXTwitter size={28} />
                </a>
              )}
              {client.instagram?.trim() && (
                <a
                  href={client.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-500 mx-auto"
                  title="Visitar Instagram">
                  <FaInstagram size={28} />
                </a>
              )}
              {client.linkedin?.trim() && (
                <a
                  href={client.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-500"
                  title="Visitar LinkedIn">
                  <FaLinkedin size={28} />
                </a>
              )}
            </div>
          </div>
        </div>
        {/* // Lado con datos del cliente */}
        <ul
          id="datos-cliente"
          className="flex flex-col gap-3 w-full items-start justify-between h-full text-sm xl:text-base">
          <li className="flex flex-col 2xl:flex-row text-gray-700 dark:text-gray-300 gap-2">
            <span className="font-semibold">Correo Electrónico:</span>
            <div>{client.email}</div>
          </li>
          <li className="flex flex-col 2xl:flex-row text-gray-700 dark:text-gray-300 gap-2">
            <span className="font-semibold">Teléfono:</span>
            {client.phoneNumber}
          </li>
          <li className="flex flex-col 2xl:flex-row text-gray-700 dark:text-gray-300 gap-2">
            <span className="font-semibold">Dirección:</span>
            {client.address}
          </li>
          <li className="flex flex-col 2xl:flex-row text-gray-700 dark:text-gray-300 gap-2">
            <span className="font-semibold">Empresa:</span>
            {client.company}
          </li>
          <li className="flex flex-col 2xl:flex-row text-gray-700 dark:text-gray-300 gap-2">
            <span className="font-semibold">Proyecto:</span>
            {client.project}
          </li>
          <li className="flex flex-col 2xl:flex-row text-gray-700 dark:text-gray-300 gap-2">
            <span className="font-semibold">RFC:</span>
            {client.rfc?.trim() || "Sin Información"}
          </li>
          <li className="flex flex-col 2xl:flex-row text-gray-700 dark:text-gray-300 gap-2">
            <span className="font-semibold">CURP:</span>
            {client.curp?.trim() || "Sin Información"}
          </li>
          <div className="flex justify-end gap-4 mt-4 w-full items-center">
            <button
              id="editar-cliente"
              onClick={handleEdit}
              className="text-blue-500 hover:text-blue-700"
              aria-label={`Editar cliente ${client.fullName}`}>
              <FaEdit size={28} />
            </button>
            <button
              id="eliminar-cliente"
              onClick={() => handleDeleteClient(client.id)}
              className="text-red-500 hover:text-red-700"
              aria-label={`Eliminar cliente ${client.fullName}`}>
              <FaTrash size={28} />
            </button>
          </div>
        </ul>
      </div>
      {/* Modal para editar cliente */}
      {isModalOpen && (
        <>
          {console.log("Cliente pasado al modal:", selectedClient)}
          <ClientsModal
            isOpen={isModalOpen}
            onClose={closeModal}
            client={selectedClient} // Pasa el cliente seleccionado al modal
            onClientUpdate={fetchClients}
            isEditing={!!selectedClient}
          />
        </>
      )}
    </>
  );
};

export default ClientsCard;
