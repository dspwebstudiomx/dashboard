import { useState, useEffect } from "react";
import axios from "axios";

const initialState = {
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
};

const useClientForm = ({ client, onClientUpdate, onClose }) => {
  const isEditing = !!client;
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (isEditing && client) {
      setFormData((prev) => ({ ...prev, ...client }));
    } else {
      setFormData(initialState);
    }
  }, [isEditing, client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(
        `http://localhost:5000/api/clients/${client.id}`,
        formData
      );
    } else {
      await axios.post(
        "http://localhost:5000/api/clients",
        formData
      );
    }
    onClientUpdate(); // <-- Refresca la lista en el padre
    onClose();        // <-- Cierra el modal
    window.location.reload(); // <-- Refresca el navegador
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const formDataImage = new FormData();
    formDataImage.append("image", file);

    try {
      const response = await fetch(
        `http://localhost:5000/api/clients/${client?.id || "new"}/image`,
        {
          method: "POST",
          body: formDataImage,
        }
      );
      if (!response.ok) throw new Error(`Error al subir imagen: ${response.statusText}`);
      const data = await response.json();
      setFormData((prev) => ({ ...prev, image: data.image }));
      if (onClientUpdate && client) {
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

  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    handleImageUpload,
    handleRemoveImage,
    isEditing,
  };
};

export default useClientForm;