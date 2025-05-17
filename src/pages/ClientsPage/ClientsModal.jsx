import React from "react";
import PropTypes from "prop-types";
import Modal from "@components/Modal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegImage } from "react-icons/fa6";
import useClientForm from "./hooks/useClientForm";
import ClientFormFields from "./components/ClientFormFields";

const ClientsModal = ({ isOpen, onClose, client, onClientUpdate }) => {
  const {
    formData,
    handleChange,
    handleSubmit,
    handleImageUpload,
    handleRemoveImage,
    isEditing,
  } = useClientForm({ client, onClientUpdate, onClose });

  return (
    <Modal
      isOpen={isOpen}
      onClick={onClose}
      title={isEditing ? "Editar Cliente" : "Agregar Cliente"}
      className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-h-[70vh] text-base">
        <ClientFormFields formData={formData} handleChange={handleChange} />

        {/* Imagen */}
        <div
          id="image-group"
          className="form-group flex flex-col md:flex-row items-center gap-6 mt-12 xl:mt-6 p-2">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src={
                formData.image
                  ? `http://localhost:5000${formData.image}`
                  : "http://localhost:5000/uploads/avatar_placeholder_large.png"
              }
              alt="Imagen del cliente"
              className="w-24 h-24 object-cover border-2 border-gray-200 dark:border-gray-700 rounded-full"
            />
          </div>
          <div className="flex flex-col gap-4 justify-center items-start">
            <label className="text-gray-700 dark:text-gray-300 flex items-start gap-4">
              <FaRegImage className="text-blue-900 text-2xl dark:text-gray-300" />
              <span>
                {formData.image ? "Cambiar imagen" : "Agregar imagen"}
              </span>
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 focus:border-blue-700 focus:border-2 focus:outline-none w-full md:w-[210px]"
            />
          </div>
          <button
            type="button"
            onClick={handleRemoveImage}
            className="flex gap-2 bg-red-500 border-2 border-red-700 hover:bg-red-400 text-white text-base w-full md:w-12 h-12 rounded-md place-items-center justify-center">
            <RiDeleteBin6Line className="text-white text-2xl" />
            <span className="md:hidden">Eliminar imagen</span>
          </button>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col md:flex-row justify-center gap-4 p-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-4 bg-blue-500 hover:bg-blue-400 text-white rounded-md w-full md:w-[210px]">
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-4 bg-blue-700 hover:bg-blue-600 text-white rounded-md w-full md:w-[210px]">
            {isEditing ? "Actualizar Cliente" : "Agregar Cliente"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

ClientsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  client: PropTypes.object,
  onClientUpdate: PropTypes.func.isRequired,
};

export default ClientsModal;
