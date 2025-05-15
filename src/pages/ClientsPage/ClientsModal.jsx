import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Modal from "@components/Modal";
import { FaFileAlt, FaLinkedinIn, FaPhone, FaUserAlt } from "react-icons/fa";
import {
  FaAddressCard,
  FaBuilding,
  FaEnvelope,
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaRegImage,
  FaUser,
  FaXTwitter,
} from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";

const ClientsModal = ({ isOpen, onClose, client, onClientUpdate }) => {
  const isEditing = !!client; // Si hay un cliente, estamos editando

  const [formData, setFormData] = useState({
    fullName: "",
    lastName: "",
    lastName2: "",
    email: "",
    phoneNumber: "",
    address: "",
    company: "",
    rfc: "",
    curp: "",
    website: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    project: "",
    image: "",
  });

  useEffect(() => {
    if (isEditing && client) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...client,
      }));
    } else {
      setFormData({
        fullName: "",
        lastName: "",
        lastName2: "",
        email: "",
        phoneNumber: "",
        address: "",
        company: "",
        rfc: "",
        curp: "",
        website: "",
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        project: "",
        image: "",
      });
    }
  }, [isEditing, client]);

  useEffect(() => {
    if (isOpen) {
      const modalElement = document.querySelector(".modal-class"); // Ajusta el selector según tu implementación
      if (modalElement) {
        modalElement.scrollTop = 0;
      }
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);

    try {
      let updatedClient;
      if (isEditing) {
        const response = await axios.put(
          `http://localhost:5000/api/clients/${client.id}`,
          formData
        );
        updatedClient = response.data;
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/clients",
          formData
        );
        updatedClient = response.data;
      }

      onClientUpdate(updatedClient);
      onClose();
    } catch (error) {
      console.error("Error al guardar el cliente:", error);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: "",
    }));
  };

  // Necesito subir una imagen de un cliente y que se vea en la tarjeta
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.error("No se seleccionó ningún archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `http://localhost:5000/api/clients/${client.id}/image`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error al subir imagen: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Imagen subida correctamente:", data);

      if (onClientUpdate) {
        onClientUpdate((prevClients) =>
          prevClients.map((c) =>
            c.id === client.id ? { ...c, image: data.image } : c
          )
        );
      }
    } catch (error) {
      console.error("Error subiendo imagen:", error.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Editar Cliente" : "Agregar Cliente"}
      className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 overflow-y-auto max-h-[70vh] text-base">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Campos del formulario */}
          <div className="form-group flex items-center gap-4">
            <FaUserAlt className="text-blue-900 text-2xl dark:text-blue-500" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName || ""}
              onChange={handleChange}
              placeholder="Nombre(s)"
              className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 focus:border-blue-700 focus:border-2 focus:outline-none"
              required
            />
          </div>
          <div className="form-group flex items-center gap-4">
            <FaUserAlt className="text-blue-900 text-2xl dark:text-blue-500" />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Apellido Paterno"
              className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300  focus:border-blue-700 focus:border-2 focus:outline-none"
              required
            />
          </div>
          <div className="form-group flex items-center gap-4">
            <FaUser className="text-blue-900 text-2xl dark:text-blue-500" />
            <input
              type="text"
              name="lastName2"
              value={formData.lastName2}
              onChange={handleChange}
              placeholder="Apellido Materno"
              className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300  focus:border-blue-700 focus:border-2 focus:outline-none"
            />
          </div>
          <div className="form-group flex items-center gap-4">
            <FaEnvelope className="text-blue-900 text-2xl  dark:text-blue-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300  focus:border-blue-700 focus:border-2 focus:outline-none"
              required
            />
          </div>
          <div className="form-group flex items-center gap-4">
            <FaPhone className="text-blue-900 text-2xl dark:text-blue-500" />
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Teléfono"
              className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300  focus:border-blue-700 focus:border-2 focus:outline-none"
            />
          </div>
          <div className="form-group flex items-center gap-4">
            <FaAddressCard className="text-blue-900 text-2xl dark:text-blue-500" />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Dirección"
              className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300  focus:border-blue-700 focus:border-2 focus:outline-none"
            />
          </div>
          <div className="form-group flex items-center gap-4">
            <FaBuilding className="text-blue-900 text-2xl dark:text-blue-500" />
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Empresa"
              className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300  focus:border-blue-700 focus:border-2 focus:outline-none"
            />
          </div>
          <div className="form-group flex items-center gap-4">
            <FaFileAlt className="text-blue-900 text-2xl dark:text-blue-500" />
            <input
              type="text"
              name="project"
              value={formData.project}
              onChange={handleChange}
              placeholder="Proyecto"
              className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300  focus:border-blue-700 focus:border-2 focus:outline-none"
            />
          </div>
          <div className="form-group flex items-center gap-4">
            <FaFileAlt className="text-blue-900 text-2xl dark:text-blue-500" />
            <input
              type="text"
              name="rfc"
              value={formData.rfc}
              onChange={handleChange}
              placeholder="RFC"
              className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300  focus:border-blue-700 focus:border-2 focus:outline-none"
            />
          </div>
          <div className="form-group flex items-center gap-4">
            <FaFileAlt className="text-blue-900 text-2xl dark:text-blue-500" />
            <input
              type="text"
              name="curp"
              value={formData.curp}
              onChange={handleChange}
              placeholder="CURP"
              className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300  focus:border-blue-700 focus:border-2 focus:outline-none"
            />
          </div>
          <div className="form-group flex items-center gap-4">
            <FaGlobe className="text-blue-900 text-2xl  dark:text-blue-500" />
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Sitio web"
              className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300  focus:border-blue-700 focus:border-2 focus:outline-none"
            />
          </div>
          <div className="form-group flex items-center gap-4">
            <FaFacebook className="text-blue-900 text-2xl dark:text-blue-500" />
            <input
              type="url"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              placeholder="Facebook"
              className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300  focus:border-blue-700 focus:border-2 focus:outline-none"
            />
          </div>
          <div className="form-group flex items-center gap-4">
            <FaXTwitter className="text-blue-900 text-2xl dark:text-blue-500" />
            <input
              type="url"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              placeholder="Twitter"
              className="flex-1 p-2 border bg-gray-100 text-gray-800 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300  focus:border-blue-700 focus:border-2 focus:outline-none"
            />
          </div>
          <div className="form-group flex items-center gap-4">
            <FaInstagram className="text-blue-900 text-2xl dark:text-blue-500" />
            <input
              type="url"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="Instagram"
              className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300  focus:border-blue-700 focus:border-2 focus:outline-none"
            />
          </div>
          <div className="form-group flex items-center gap-4">
            <FaLinkedinIn className="text-blue-900 text-2xl dark:text-blue-500" />
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn"
              className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300  focus:border-blue-700 focus:border-2 focus:outline-none"
            />
          </div>
        </div>

        {/* Imagen */}
        <div
          id="image-group"
          className="form-group flex gap-4 mt-12 xl:mt-6 p-2">
          <div className="flex items-end gap-4">
            {formData.image && (
              <div className="flex flex-col md:flex-row items-center gap-8">
                <img
                  src={`http://localhost:5000${formData.image}`}
                  alt="Imagen del cliente"
                  className="w-24 h-24 object-cover border-2 border-gray-200 rounded-full"
                />
              </div>
            )}
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
                className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 focus:border-blue-700 focus:border-2 focus:outline-none w-[52vw] md:w-[210px]"
              />
            </div>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="bg-red-500 border-2 border-red-700 hover:bg-red-400 text-white text-sm w-12 h-12 rounded-md place-items-center">
              <RiDeleteBin6Line className="text-white text-2xl" />
            </button>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-md">
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-md">
            {isEditing ? (
              <div>
                <span>Actualizar Cliente</span>
              </div>
            ) : (
              <div>
                <span>Agregar Cliente</span>
              </div>
            )}
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
  isEditing: PropTypes.bool.isRequired,
};

export default ClientsModal;
