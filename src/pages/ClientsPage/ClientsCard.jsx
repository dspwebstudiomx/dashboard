import React from "react";
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

const ClientsCard = ({ client, handleEditClient, handleDeleteClient }) => {
  return (
    <div
      key={client.id}
      className="flex shadow-2xl rounded-lg p-12 items-start gap-20 bg-white dark:bg-gray-800 font-semibold">
      <div className="flex flex-col items-center justify-between h-[80%] w-1/2 gap-8 my-auto">
        <div className="flex flex-col items-center justify-center w-full gap-6">
          <img
            id="imagen-cliente"
            src={
              client.image
                ? `http://localhost:5000${client.image}`
                : "../../../server/uploads/avatar_placeholder_large.png"
            }
            alt={client.fullName}
            className="w-24 h-24 rounded-full mx-auto border-2 border-gray-300 object-cover"
            width={10}
          />
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 text-center w-full mb-3">
            {client.fullName} {client.lastName} {client.lastName2}
          </h2>
        </div>
        <div className="flex gap-4 items-center justify-center w-full">
          {client.website && (
            <a
              href={client.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-900 hover:text-blue-700"
              title="Visitar sitio web">
              <FaHome size={25} />
            </a>
          )}
          {client.email && (
            <a
              href={`mailto:${client.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-900 hover:text-blue-700"
              title="Enviar correo electrónico">
              <FaEnvelope size={25} />
            </a>
          )}
          {client.phoneNumber && (
            <a
              href={`tel:${client.phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-900 hover:text-blue-700"
              title="Llamar">
              <FaPhone size={25} />
            </a>
          )}
          {client.facebook?.trim() && (
            <a
              href={client.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-900 hover:text-blue-700"
              title="Visitar Facebook">
              <FaFacebook size={25} />
            </a>
          )}
          {client.twitter?.trim() && (
            <a
              href={client.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-900 hover:text-blue-700"
              title="Visitar Twitter">
              <FaXTwitter size={25} />
            </a>
          )}
          {client.instagram?.trim() && (
            <a
              href={client.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-900 hover:text-blue-700"
              title="Visitar Instagram">
              <FaInstagram size={25} />
            </a>
          )}
          {client.linkedin?.trim() && (
            <a
              href={client.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-900 hover:text-blue-700"
              title="Visitar LinkedIn">
              <FaLinkedin size={25} />
            </a>
          )}
        </div>
      </div>
      <ul className="flex flex-col gap-2 w-full items-start justify-between h-full">
        <li className="text-gray-700 dark:text-gray-300 flex gap-2">
          <span className="font-semibold">Correo Electrónico:</span>{" "}
          {client.email}
        </li>
        <li className="text-gray-700 dark:text-gray-300 flex gap-2">
          <span className="font-semibold">Teléfono:</span>
          <a href={`tel:${client.phoneNumber}`} className="hover:text-blue-500">
            {client.phoneNumber}
          </a>
        </li>
        <li className="text-gray-700 dark:text-gray-300 flex gap-2">
          <span className="font-semibold">Dirección:</span>
          {client.address}
        </li>
        <li className="text-gray-700 dark:text-gray-300 flex gap-2">
          <span className="font-semibold">Empresa:</span>
          {client.company}
        </li>
        <li className="text-gray-700 dark:text-gray-300 flex gap-2">
          <span className="font-semibold">Proyecto:</span>
          {client.project}
        </li>
        <li className="text-gray-700 dark:text-gray-300 flex gap-2">
          <span className="font-semibold">RFC:</span>
          {client.rfc?.trim() || "Sin Información"}
        </li>
        <li className="text-gray-700 dark:text-gray-300 flex gap-2">
          <span className="font-semibold">CURP:</span>
          {client.curp?.trim() || "Sin Información"}
        </li>
        <div className="flex justify-end gap-4 mt-4 w-full items-center">
          <button
            onClick={() => handleEditClient(client)}
            className="text-blue-500 hover:text-blue-700"
            aria-label="Editar cliente">
            <FaEdit size={25} />
          </button>
          <button
            onClick={() => handleDeleteClient(client.id)}
            className="text-red-500 hover:text-red-700"
            aria-label="Eliminar cliente">
            <FaTrash size={25} />
          </button>
        </div>
      </ul>
    </div>
  );
};

export default ClientsCard;
