import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Modal from "@components/Modal";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaAddressCard,
  FaGlobe,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaRegSave,
  FaUserAlt,
  FaUserAltSlash,
} from "react-icons/fa";
import { FaLinkedinIn, FaPlus, FaRegImage, FaXTwitter } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Editar Cliente" : "Agregar Cliente"}>
      <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Campos del formulario */}
          <div className="form-group flex items-center gap-4">
            <FaUserAlt className="text-blue-900 text-2xl dark:text-gray-300" />
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
            <FaUserAltSlash className="text-blue-900 text-2xl dark:text-gray-300" />
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
            <FaUser className="text-blue-900 text-2xl  dark:text-gray-300" />
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
            <FaEnvelope className="text-blue-900 text-2xl  dark:text-gray-300" />
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
            <FaPhone className="text-blue-900 text-2xl  dark:text-gray-300" />
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
            <FaAddressCard className="text-blue-900 text-2xl  dark:text-gray-300" />
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
            <FaBuilding className="text-blue-900 text-2xl  dark:text-gray-300" />
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
            <FaFileAlt className="text-blue-900 text-2xl  dark:text-gray-300" />
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
            <FaFileAlt className="text-blue-900 text-2xl  dark:text-gray-300" />
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
            <FaFileAlt className="text-blue-900 text-2xl  dark:text-gray-300" />
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
            <FaGlobe className="text-blue-900 text-2xl  dark:text-gray-300" />
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
            <FaFacebook className="text-blue-900 text-2xl  dark:text-gray-300" />
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
            <FaXTwitter className="text-blue-900 text-2xl  dark:text-gray-300" />
            <input
              type="url"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              placeholder="Twitter"
              className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300  focus:border-blue-700 focus:border-2 focus:outline-none"
            />
          </div>
          <div className="form-group flex items-center gap-4">
            <FaInstagram className="text-blue-900 text-2xl  dark:text-gray-300" />
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
            <FaLinkedinIn className="text-blue-900 text-2xl  dark:text-gray-300" />
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

        {/* Botones de acción */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-400 text-white rounded-md">
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-md">
            {isEditing ? "Guardar Cambios" : "Agregar Cliente"}
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
