import React from "react";
import { FaUserAlt, FaFileAlt, FaGlobe } from "react-icons/fa";

import {
  FaAddressCard,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaFacebook,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaTrash,
} from "react-icons/fa6";

const fields = [
  {
    name: "fullName",
    icon: <FaUserAlt />,
    type: "text",
    placeholder: "Nombre(s)",
    required: true,
  },
  {
    name: "lastName",
    icon: <FaUserAlt />,
    type: "text",
    placeholder: "Apellido Paterno",
    required: true,
  },
  {
    name: "lastName2",
    icon: <FaUser />,
    type: "text",
    placeholder: "Apellido Materno",
  },
  {
    name: "email",
    icon: <FaEnvelope />,
    type: "email",
    placeholder: "Correo electrónico",
    required: true,
  },
  {
    name: "phoneNumber",
    icon: <FaPhone />,
    type: "tel",
    placeholder: "Teléfono",
  },
  {
    name: "address",
    icon: <FaAddressCard />,
    type: "text",
    placeholder: "Dirección",
  },
  {
    name: "company",
    icon: <FaBuilding />,
    type: "text",
    placeholder: "Empresa",
  },
  {
    name: "project",
    icon: <FaFileAlt />,
    type: "text",
    placeholder: "Proyecto",
  },
  { name: "rfc", icon: <FaFileAlt />, type: "text", placeholder: "RFC" },
  { name: "curp", icon: <FaFileAlt />, type: "text", placeholder: "CURP" },
  { name: "website", icon: <FaGlobe />, type: "url", placeholder: "Sitio web" },
  {
    name: "facebook",
    icon: <FaFacebook />,
    type: "url",
    placeholder: "Facebook",
  },
  {
    name: "twitter",
    icon: <FaXTwitter />,
    type: "url",
    placeholder: "Twitter",
  },
  {
    name: "instagram",
    icon: <FaInstagram />,
    type: "url",
    placeholder: "Instagram",
  },
  {
    name: "linkedin",
    icon: <FaLinkedinIn />,
    type: "url",
    placeholder: "LinkedIn",
  },
];

const ClientFormFields = ({ formData, handleChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
    {fields.map(({ name, icon, type, placeholder, required }) => (
      <div key={name} className="form-group flex items-center gap-4">
        {React.cloneElement(icon, {
          className: "text-blue-900 text-2xl dark:text-blue-500",
        })}
        <input
          type={type}
          name={name}
          value={formData[name] || ""}
          onChange={handleChange}
          placeholder={placeholder}
          className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 focus:border-blue-700 focus:border-2 focus:outline-none"
          required={required}
        />
      </div>
    ))}
  </div>
);

export default ClientFormFields;
