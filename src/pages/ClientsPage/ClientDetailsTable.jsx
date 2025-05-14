import React from "react";
import Modal from "@components/Modal";
import {
  FaEnvelope,
  FaPhone,
  FaHome,
  FaBuilding,
  FaTasks,
  FaIdCard,
  FaIdBadge,
} from "react-icons/fa";

const ClientDetailsTable = ({ client, isTableModalOpen, closeTableModal }) => {
  const tableStyles = {
    iconStyle: "text-blue-600 mr-2",
    iconSize: "18",
  };
  return (
    <>
      {isTableModalOpen && (
        <Modal
          isOpen={isTableModalOpen}
          onClose={closeTableModal}
          description="Aquí puedes ver los detalles del cliente.">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4 text-center">
              Detalles del Cliente
            </h1>
            <h2 className="flex flex-row items-start justify-start w-full mb-12">
              <img
                id="imagen-cliente"
                src={
                  client.image
                    ? `http://localhost:5000${client.image}`
                    : "../../../server/uploads/avatar_placeholder_large.png"
                }
                alt={client.fullName}
                className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover bg-white"
              />
              <span className="ml-4 text-xl font-bold text-gray-700 dark:text-gray-300">
                {client?.fullName} {client?.lastName} {client?.lastName2}
                <br />
                <span className="text-base text-gray-500 dark:text-gray-400">
                  {client?.id}
                </span>
              </span>
            </h2>
            <table className="w-full border-collapse">
              <tbody>
                {[
                  {
                    label: "Correo Electrónico:",
                    value: client?.email,
                    icon: (
                      <FaEnvelope
                        className={tableStyles.iconStyle}
                        size={tableStyles.iconSize}
                      />
                    ),
                  },
                  {
                    label: "Teléfono:",
                    value: client?.phoneNumber,
                    icon: (
                      <FaPhone
                        className={tableStyles.iconStyle}
                        size={tableStyles.iconSize}
                      />
                    ),
                  },
                  {
                    label: "Dirección:",
                    value: client?.address,
                    icon: (
                      <FaHome
                        className={tableStyles.iconStyle}
                        size={tableStyles.iconSize}
                      />
                    ),
                  },
                  {
                    label: "Empresa:",
                    value: client?.company,
                    icon: (
                      <FaBuilding
                        className={tableStyles.iconStyle}
                        size={tableStyles.iconSize}
                      />
                    ),
                  },
                  {
                    label: "Proyecto:",
                    value: client?.project,
                    icon: (
                      <FaTasks
                        className={tableStyles.iconStyle}
                        size={tableStyles.iconSize}
                      />
                    ),
                  },
                  {
                    label: "RFC:",
                    value: client?.rfc?.trim() || "Sin Información",
                    icon: (
                      <FaIdCard
                        className={tableStyles.iconStyle}
                        size={tableStyles.iconSize}
                      />
                    ),
                  },
                  {
                    label: "CURP:",
                    value: client?.curp?.trim() || "Sin Información",
                    icon: (
                      <FaIdBadge
                        className={tableStyles.iconStyle}
                        size={tableStyles.iconSize}
                      />
                    ),
                  },
                ].map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="font-base text-gray-700 dark:text-gray-300 px-2 py-2 w-1/2 flex items-center gap-2">
                      {item.icon} {item.label}
                    </td>
                    <td className="text-gray-700 dark:text-gray-300 px-2 py-2 w-1/2 font-base">
                      {item.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeTableModal}
                className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500">
                Cerrar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ClientDetailsTable;
