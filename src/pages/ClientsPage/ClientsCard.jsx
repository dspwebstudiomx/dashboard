/*
  ClientesCard.jsx - Componente para mostrar la tarjeta de un cliente.
  Este componente muestra la información del cliente, incluyendo su imagen,
  nombre completo, correo electrónico, teléfono, dirección, empresa, proyecto,
  RFC, CURP y redes sociales. También permite editar y eliminar al cliente.
de gestión de clientes
  Creado por: Daniel Pérez
  Fecha de creación: 2025-8-25
*/

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
import { IoWarningOutline } from "react-icons/io5";

const ClientsCard = ({ client, onClientUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Estado para el modal de confirmación
  const [selectedClient, setSelectedClient] = useState(null); // Cliente seleccionado para editar

  const openModal = (client) => {
    setSelectedClient(client); // Establece el cliente seleccionado
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedClient(null); // Limpia el cliente seleccionado
    setIsModalOpen(false);
  };

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
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
    } finally {
      closeConfirmModal(); // Cierra el modal de confirmación
    }
  };

  const handleEdit = () => {
    console.log("Cliente seleccionado para editar:", client); // Verifica los datos del cliente
    openModal(client); // Abre el modal con los datos del cliente actual
  };

  const SocialStyles = {
    link: "text-blue-700 hover:text-blue-500 mx-auto",
    color: "",
    iconSize: "32",
  };

  return (
    <>
      <article className="grid md:grid-cols-12 shadow-2xl rounded-lg p-4 md:p-12 pb-8 items-start gap-20 bg-white dark:bg-gray-800 font-semibold  last:mb-30 last:md:mb-0 w-[100vw] xl:w-[650px] xl:h-auto">
        {/* // Lado con imagen, nombre completo y redes sociales */}
        <div className=" md:col-span-3 items-center justify-between h-[80%] gap-12 my-auto ">
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
              className="w-24 h-24 rounded-full mx-auto border-2 border-gray-300 object-cover bg-white"
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
          </div>
        </div>
        {/* // Lado con datos del cliente */}
        <div>
          {/* Tabla con datos del cliente */}
          <table
            id="datos-cliente"
            className="col-span-9 w-[50%] text-sm xl:text-base border-collapse">
            <tbody>
              <tr>
                <td className="font-semibold text-gray-700 dark:text-gray-300 px-2 py-1">
                  Correo Electrónico:
                </td>
                <td className="text-gray-700 dark:text-gray-300 px-2 py-1">
                  {client.email}
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-700 dark:text-gray-300 px-2 py-1">
                  Teléfono:
                </td>
                <td className="text-gray-700 dark:text-gray-300 px-2 py-1">
                  {client.phoneNumber}
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-700 dark:text-gray-300 px-2 py-1">
                  Dirección:
                </td>
                <td className="text-gray-700 dark:text-gray-300 px-2 py-1">
                  {client.address}
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-700 dark:text-gray-300 px-2 py-1">
                  Empresa:
                </td>
                <td className="text-gray-700 dark:text-gray-300 px-2 py-1">
                  {client.company}
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-700 dark:text-gray-300 px-2 py-1">
                  Proyecto:
                </td>
                <td className="text-gray-700 dark:text-gray-300 px-2 py-1">
                  {client.project}
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-700 dark:text-gray-300 px-2 py-1">
                  RFC:
                </td>
                <td className="text-gray-700 dark:text-gray-300 px-2 py-1">
                  {client.rfc?.trim() || "Sin Información"}
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-700 dark:text-gray-300 px-2 py-1">
                  CURP:
                </td>
                <td className="text-gray-700 dark:text-gray-300 px-2 py-1">
                  {client.curp?.trim() || "Sin Información"}
                </td>
              </tr>
            </tbody>
          </table>
          {/* Redes sociales */}
          <div
            id="tarjeta-redes-sociales"
            className="grid grid-cols-4 items-center gap-8 mt-6 pb-8 p-4 px-12">
            {[
              {
                href: client.website,
                icon: <FaHome size={SocialStyles.iconSize} />,
                title: "Visitar sitio web",
              },
              {
                href: `mailto:${client.email}`,
                icon: <FaEnvelope size={SocialStyles.iconSize} />,
                title: "Enviar correo electrónico",
              },
              {
                href: `tel:${client.phoneNumber}`,
                icon: <FaPhone size={SocialStyles.iconSize} />,
                title: "Llamar",
              },
              {
                href: client.linkedin?.trim(),
                icon: <FaLinkedin size={SocialStyles.iconSize} />,
                title: "Visitar LinkedIn",
              },
              {
                href: client.facebook?.trim(),
                icon: <FaFacebook size={SocialStyles.iconSize} />,
                title: "Visitar Facebook",
              },
              {
                href: client.instagram?.trim(),
                icon: <FaInstagram size={SocialStyles.iconSize} />,
                title: "Visitar Instagram",
              },
              {
                href: client.twitter?.trim(),
                icon: <FaXTwitter size={SocialStyles.iconSize} />,
                title: "Visitar Twitter",
              },
            ]
              .filter((social) => social.href) // Filtra las redes sociales que no tienen URL
              .map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={SocialStyles.link}
                  aria-label={social.title}
                  title={social.title}>
                  {social.icon}
                </a>
              ))}
          </div>
          {/* Botones de editar y eliminar cliente */}
          <div className="flex justify-end gap-4 items-end mt-4 w-[300px]">
            <button
              id="editar-cliente"
              onClick={handleEdit}
              className="text-blue-500 hover:text-blue-700"
              aria-label={`Editar cliente ${client.fullName}`}>
              <FaEdit size={28} />
            </button>
            <button
              id="eliminar-cliente"
              onClick={openConfirmModal}
              className="text-red-500 hover:text-red-700"
              aria-label={`Eliminar cliente ${client.fullName}`}>
              <FaTrash size={28} />
            </button>
          </div>
        </div>
      </article>

      {/* Modal para editar cliente */}
      {isModalOpen && (
        <ClientsModal
          isOpen={isModalOpen}
          onClose={closeModal}
          client={selectedClient} // Pasa el cliente seleccionado al modal
          onClientUpdate={fetchClients}
          isEditing={!!selectedClient}
          setIsEditing={setIsModalOpen} // Cambia el estado de edición
          setClient={setSelectedClient} // Cambia el cliente seleccionado
        />
      )}
      {/* Modal de confirmación para eliminar cliente */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-800 opacity-100 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg opacity-100">
            <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
              <IoWarningOutline className="inline-block mr-2 text-amber-300 text-3xl" />
              Confirmar eliminación
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              ¿Estás seguro de que deseas eliminar al cliente{" "}
              <span className="font-semibold">
                {client.fullName} {client.lastName} {client.lastName2}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeConfirmModal}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-400 dark:hover:bg-gray-500">
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteClient(client.id)}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-500 text-white rounded shadow-md">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientsCard;
