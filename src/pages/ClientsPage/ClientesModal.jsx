import React from "react";
import { BsGlobe } from "react-icons/bs";
import { IoReload } from "react-icons/io5";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFileAlt,
  FaIdCard,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaFileUpload,
  FaTrash,
} from "react-icons/fa";
import { FaBuilding, FaProjectDiagram } from "react-icons/fa";
import campos from "@data/CamposClientesModal.json"; // Importar el archivo JSON
import { FaXTwitter } from "react-icons/fa6";

const iconMap = {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaProjectDiagram,
  FaFileAlt,
  FaIdCard,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaFileUpload,
  BsGlobe,
};

const ClientesModal = ({
  editClientId,
  newClient,
  setNewClient,
  setShowModal,
  errors,
  setErrors,
  setEditClientId,
  initialClientState,
  addClient,
  editClient,
  handleAddClient,
}) => {
  return (
    <section
      id="modal-agregar-editar-cliente"
      className="fixed inset-0 bg-white flex justify-center items-center">
      <div className="bg-white w-full mx-auto h-full p-12 xl:p-36 xl:pt-30 mt-0">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl font-bold">
            {editClientId
              ? `Editar Cliente: ${newClient.fullName || ""} ${
                  newClient.lastName || ""
                } ${newClient.lastName2 || ""}`.trim() || "Sin Nombre"
              : "Agregar Cliente"}
          </h2>
          <div className="flex justify-end gap-4 mt-12">
            <button
              id="boton-reload-formulario"
              onClick={() => [
                setNewClient({
                  fullName: "",
                  lastName: "",
                  lastName2: "",
                  email: "",
                  phoneNumber: "",
                  address: "",
                  company: "",
                  project: "",
                  image: null,
                  facebook: "",
                  twitter: "",
                  rfc: "",
                  curp: "",
                  website: "",
                  instagram: "",
                  linkedin: "",
                }),
                setErrors({}),
              ]}
              className="px-4 py-2 bg-blue-400 text-white rounded">
              <IoReload className="font-semibold inline-block hover:rotate-180 hover:transition-all hover:duration-75" />
            </button>
            <button
              onClick={() => {
                setErrors({});
                setShowModal(false);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded">
              Cancelar
            </button>
            <button
              onClick={() =>
                handleAddClient(
                  newClient,
                  editClientId,
                  setErrors,
                  setShowModal,
                  () => {
                    setNewClient(initialClientState); // Reiniciar el estado después de guardar
                    setEditClientId(null); // Limpiar el ID del cliente en edición
                  },
                  addClient,
                  editClient // Pasar la función editClient correctamente
                )
              }
              className="px-4 py-2 bg-blue-700 text-white rounded">
              {editClientId ? "Guardar Cambios" : "Guardar"}
            </button>
          </div>
        </div>
        <ul className="grid grid-cols-3 items-center justify-center gap-8 w-full h-auto shadow-xl rounded-2xl p-12">
          {campos.map((campo) => {
            const Icon = iconMap[campo.icon];
            return (
              <li key={campo.id} id={campo.id} className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2 w-1/2">
                    {Icon && <Icon className="text-blue-900 mr-2" size={20} />}
                    <label htmlFor={`newClient.${campo.id}`}>
                      {campo.label}:{" "}
                      {campo.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                  </span>
                  <input
                    type={campo.type}
                    value={
                      campo.type !== "file"
                        ? newClient[campo.id] || ""
                        : undefined
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewClient((prevState) => ({
                        ...prevState,
                        [campo.id]: value,
                      }));
                      if (campo.required) {
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          [campo.id]: value ? "" : campo.errorMessage,
                        }));
                      }
                    }}
                    className={`border rounded px-4 py-2 w-full ${
                      errors[campo.id]
                        ? "border-red-500"
                        : newClient[campo.id]
                        ? "border-green-500"
                        : "border-gray-300"
                    }`}
                  />
                </div>
                {errors[campo.id] && (
                  <span className="text-red-500 text-sm text-right">
                    {errors[campo.id]}
                  </span>
                )}
              </li>
            );
          })}
          {/* Campo de imagen con botón para eliminar */}
          <li id="image" className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 w-1/2">
                <FaFileUpload className="text-blue-900 mr-2" size={20} />
                <label htmlFor="newClient.image">Imagen:</label>
              </span>
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setNewClient((prevState) => ({
                    ...prevState,
                    image: file,
                  }));
                }}
                className="border rounded px-4 py-2 w-full border-gray-300"
              />
              {/* Botón para eliminar la imagen */}
              {newClient.image && (
                <button
                  onClick={() =>
                    setNewClient((prevState) => ({
                      ...prevState,
                      image: null, // Restablecer el valor de la imagen
                    }))
                  }
                  className="px-2 py-1 bg-red-500 text-white rounded flex items-center gap-2">
                  <FaTrash size={16} />
                  <span>Eliminar</span>
                </button>
              )}
            </div>
            {/* Mostrar el nombre de la imagen seleccionada */}
            {newClient.image && (
              <span className="text-sm text-gray-600">
                Imagen seleccionada: {newClient.image.name}
              </span>
            )}
          </li>
          <span
            id="nota-requerimiento"
            className="flex items-center gap-2 w-full">
            <p>
              <span className="text-red-500">* </span>Nota: Campo obligatorio.
            </p>
          </span>
        </ul>
      </div>
    </section>
  );
};

export default ClientesModal;
