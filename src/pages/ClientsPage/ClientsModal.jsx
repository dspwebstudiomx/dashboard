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
  FaInstagram,
  FaLinkedin,
  FaFileAlt,
  FaRegSave,
} from "react-icons/fa";
import { FaPlus, FaRegImage, FaXTwitter } from "react-icons/fa6";
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
        ...prevFormData, // Mantén los valores predeterminados
        ...client, // Sobrescribe con los valores del cliente
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const uploadData = new FormData();
      uploadData.append("image", file);

      try {
        const response = await axios.post(
          `http://localhost:5000/api/uploads/${client.id}`, // Incluye el ID del cliente
          uploadData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Actualiza el estado del formulario con la nueva ruta de la imagen
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: response.data.client.image, // Ruta de la imagen actualizada
        }));
        console.log("Imagen subida con éxito:", response.data.client.image);
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      }
    }
  };

  const handleRemoveImage = async () => {
    try {
      // Elimina la imagen del servidor si es necesario
      await axios.delete(`http://localhost:5000/api/uploads/${client.id}`);

      // Actualiza el estado del formulario para eliminar la imagen
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: "",
      }));

      console.log("Imagen eliminada con éxito.");
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 bg-blue-900 bg-opacity-50 flex items-center justify-center z-50 ">
      <article className="bg-white rounded-lg shadow-lg w-[90vw] h-[90vh] xl:h-[95vh] 2xl:w-[70vw] 2xl:h-[90vh] md:max-w-full p-6 md:p-12 xl:p-16 border-4 border-blue-400 dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-12 justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          {isEditing ? (
            <div className="flex items-center gap-4 justify-center">
              <BsFillPersonLinesFill className="text-blue-900 text-4xl" />
              Editar Cliente
            </div>
          ) : (
            <div className="flex items-center gap-4 justify-center">
              <IoMdPersonAdd className="text-blue-900 text-4xl" />
              Agregar Cliente
            </div>
          )}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4  overflow-y-auto 2xl:overflow-y-hidden w-[70vw]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:px-20 ">
            <div
              id="fullName-group"
              className="form-group flex items-center gap-4">
              <FaUser className="text-blue-900 text-2xl  dark:text-gray-300" />
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
            <div
              id="lastName-group"
              className="form-group flex items-center gap-4">
              <FaUser className="text-blue-900 text-2xl dark:text-gray-300" />
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
            <div
              id="lastName2-group"
              className="form-group flex items-center gap-4">
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
            <div
              id="email-group"
              className="form-group flex items-center gap-4">
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
            <div
              id="phoneNumber-group"
              className="form-group flex items-center gap-4">
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
            <div
              id="address-group"
              className="form-group flex items-center gap-4">
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
            <div
              id="company-group"
              className="form-group flex items-center gap-4">
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
            <div
              id="project-group"
              className="form-group flex items-center gap-4">
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
            <div id="rfc-group" className="form-group flex items-center gap-4">
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
            <div id="curp-group" className="form-group flex items-center gap-4">
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
            <div
              id="website-group"
              className="form-group flex items-center gap-4">
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
            <div
              id="facebook-group"
              className="form-group flex items-center gap-4">
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
            <div
              id="twitter-group"
              className="form-group flex items-center gap-4">
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
            <div
              id="instagram-group"
              className="form-group flex items-center gap-4">
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
            <div
              id="linkedin-group"
              className="form-group flex items-center gap-4">
              <FaLinkedin className="text-blue-900 text-2xl  dark:text-gray-300" />
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
          <div
            id="image-group"
            className="form-group flex flex-col gap-4 mt-12 p-2">
            <div className="flex items-center gap-4">
              {formData.image && (
                <div className="flex flex-col items-center gap-8">
                  <img
                    src={`http://localhost:5000${formData.image}`}
                    alt="Imagen del cliente"
                    className="w-24 h-24 object-cover border-2 border-gray-200 rounded-full"
                  />
                  <div className="flex flex-col gap-4 justify-center items-start">
                    <label className="text-gray-700 dark:text-gray-300 flex items-start gap-4">
                      <FaRegImage className="text-blue-900 text-2xl dark:text-gray-300" />
                      <span>
                        {formData.image ? "Cambiar imagen" : "Agregar imagen"}
                      </span>
                    </label>
                    <div className="flex items-center gap-4 justify-center">
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 focus:border-blue-700 focus:border-2 focus:outline-none w-[52vw]"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className=" bg-red-500 border-2 border-red-700 hover:bg-red-400 text-white text-sm w-10 h-11 rounded-md place-items-center">
                        <RiDeleteBin6Line className="text-white text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-col items-center justify-center gap-8 mt-12">
            <span className="text-gray-700 dark:text-gray-300 text-lg font-semibold">
              {isEditing
                ? "¿Quieres guardar los cambios?"
                : "¿Quieres agregar este cliente?"}
            </span>
            <div
              id="buttons-action-group"
              className="space-x-4 mx-auto flex flex-col gap-4 w-full">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-md dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 md:h-12 h-16 mx-auto w-full xl:w-[210px]">
                <span className="flex items-center justify-center gap-2 text-lg">
                  <MdOutlineCancel className="text-xl" />
                  Cancelar
                </span>
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-md md:h-12  h-16 w-full  xl:w-[210px]">
                {isEditing ? (
                  <span className="flex items-center justify-center gap-2 text-lg">
                    <FaRegSave className="text-xl" />
                    Guardar Cambios
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2 text-lg">
                    <FaPlus className="text-xl" />
                    Agregar Cliente
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      </article>
    </section>
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
