import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaAddressCard,
  FaGlobe,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaFileAlt,
} from "react-icons/fa";

const ClientsModal = ({
  isOpen,
  onClose,
  client,
  onClientUpdate,
  isEditing,
}) => {
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
      setFormData(client); // Rellena el formulario con los datos del cliente seleccionado
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedClient;
      if (isEditing) {
        // Editar cliente existente
        const response = await axios.put(
          `http://localhost:5000/api/clients/${client.id}`,
          formData
        );
        updatedClient = response.data;
      } else {
        // Agregar nuevo cliente
        const response = await axios.post(
          "http://localhost:5000/api/clients",
          formData
        );
        updatedClient = response.data;
      }
      onClientUpdate(updatedClient); // Llama a la función pasada desde el padre
    } catch (error) {
      console.error("Error al guardar el cliente:", error);
    } finally {
      onClose(); // Cierra el modal
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-2xl p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          {isEditing ? "Editar Cliente" : "Agregar Cliente"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group flex items-center gap-2">
              <FaUser className="text-gray-500 dark:text-gray-300" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName || ""}
                onChange={handleChange}
                placeholder="Nombre(s)"
                className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                required
              />
            </div>
            <div className="form-group flex items-center gap-2">
              <FaUser className="text-gray-500 dark:text-gray-300" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Apellido Paterno"
                className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                required
              />
            </div>
            <div className="form-group flex items-center gap-2">
              <FaUser className="text-gray-500 dark:text-gray-300" />
              <input
                type="text"
                name="lastName2"
                value={formData.lastName2}
                onChange={handleChange}
                placeholder="Apellido Materno"
                className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              />
            </div>
            <div className="form-group flex items-center gap-2">
              <FaEnvelope className="text-gray-500 dark:text-gray-300" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
                className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                required
              />
            </div>
            <div className="form-group flex items-center gap-2">
              <FaPhone className="text-gray-500 dark:text-gray-300" />
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Teléfono"
                className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              />
            </div>
            <div className="form-group flex items-center gap-2">
              <FaAddressCard className="text-gray-500 dark:text-gray-300" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Dirección"
                className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              />
            </div>
            <div className="form-group flex items-center gap-2">
              <FaBuilding className="text-gray-500 dark:text-gray-300" />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Empresa"
                className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              />
            </div>
            <div className="form-group flex items-center gap-2">
              <FaFileAlt className="text-gray-500 dark:text-gray-300" />
              <input
                type="text"
                name="project"
                value={formData.project}
                onChange={handleChange}
                placeholder="Proyecto"
                className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              />
            </div>
            <div className="form-group flex items-center gap-2">
              <FaFileAlt className="text-gray-500 dark:text-gray-300" />
              <input
                type="text"
                name="rfc"
                value={formData.rfc}
                onChange={handleChange}
                placeholder="RFC"
                className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              />
            </div>
            <div className="form-group flex items-center gap-2">
              <FaFileAlt className="text-gray-500 dark:text-gray-300" />
              <input
                type="text"
                name="curp"
                value={formData.curp}
                onChange={handleChange}
                placeholder="CURP"
                className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              />
            </div>
            <div className="form-group flex items-center gap-2">
              <FaGlobe className="text-gray-500 dark:text-gray-300" />
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Sitio web"
                className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              />
            </div>
            <div className="form-group flex items-center gap-2">
              <FaFacebook className="text-gray-500 dark:text-gray-300" />
              <input
                type="url"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                placeholder="Facebook"
                className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              />
            </div>
            <div className="form-group flex items-center gap-2">
              <FaTwitter className="text-gray-500 dark:text-gray-300" />
              <input
                type="url"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                placeholder="Twitter"
                className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              />
            </div>
            <div className="form-group flex items-center gap-2">
              <FaInstagram className="text-gray-500 dark:text-gray-300" />
              <input
                type="url"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="Instagram"
                className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              />
            </div>
            <div className="form-group flex items-center gap-2">
              <FaLinkedin className="text-gray-500 dark:text-gray-300" />
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn"
                className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
              />
            </div>
          </div>
          <div className="form-actions flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200">
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
              {isEditing ? "Guardar Cambios" : "Agregar Cliente"}
            </button>
          </div>
        </form>
      </div>
    </div>
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
