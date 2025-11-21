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
  imagePreview: "",
};

const useClientForm = ({ client, onClientUpdate, onClose }) => {
  const isEditing = !!client;
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null); // Nuevo estado para manejar errores

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
    setError(null); // Reinicia el estado de error
    const payload = { ...formData };
    if (payload.imagePreview) delete payload.imagePreview;

    try {
      console.log("Enviando datos al servidor:", payload); // Log para depuración
      if (isEditing) {
        const response = await axios.put(`http://localhost:5000/api/clients/${client.id}`, payload);
        console.log("Respuesta del servidor (editar):", response.data); // Log para depuración
      } else {
        const response = await axios.post("http://localhost:5000/api/clients", payload);
        console.log("Respuesta del servidor (crear):", response.data); // Log para depuración
      }
      onClientUpdate(); // Refresca la lista en el padre
      onClose(); // Cierra el modal
    } catch (err) {
      setError("Error al guardar el cliente. Por favor, inténtalo de nuevo."); // Manejo de errores
      console.error("Error en handleSubmit:", err.message);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => {
      try {
        if (prev.imagePreview && prev.imagePreview.startsWith("blob:")) {
          URL.revokeObjectURL(prev.imagePreview);
        }
      } catch {
        // ignore
      }
      return { ...prev, image: "", imagePreview: "" };
    });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => {
      try {
        if (prev.imagePreview && prev.imagePreview.startsWith("blob:")) {
          URL.revokeObjectURL(prev.imagePreview);
        }
      } catch {
        // ignore
      }
      return { ...prev, imagePreview: previewUrl };
    });

    const formDataImage = new FormData();
    formDataImage.append("file", file);

    try {
      const uploadResp = await fetch("http://localhost:5000/api/uploads", {
        method: "POST",
        body: formDataImage,
      });
      if (!uploadResp.ok) throw new Error(`Error al subir imagen: ${uploadResp.statusText}`);
      const uploadData = await uploadResp.json();
      const uploadedPath = uploadData.url;
      const serverImageUrl = `http://localhost:5000${uploadedPath}?t=${Date.now()}`;

      if (client && client.id) {
        try {
          const putResp = await fetch(`http://localhost:5000/api/clients/${client.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: uploadedPath }),
          });
          if (!putResp.ok) throw new Error(`Error al actualizar cliente: ${putResp.statusText}`);
          await putResp.json();
          if (onClientUpdate) {
            onClientUpdate((prevClients) =>
              prevClients.map((c) => (c.id === client.id ? { ...c, image: uploadedPath } : c))
            );
          }
        } catch {
          // Si falla la persistencia, igual continuamos mostrando el preview
        }
      }

      setFormData((prev) => {
        try {
          if (prev.imagePreview && prev.imagePreview.startsWith("blob:")) {
            URL.revokeObjectURL(prev.imagePreview);
          }
        } catch {
          // ignore
        }
        return { ...prev, image: uploadedPath, imagePreview: serverImageUrl };
      });
    } catch (error) {
      setError("Error al subir la imagen. Por favor, inténtalo de nuevo."); // Manejo de errores
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
    error, // Devuelve el estado de error
  };
};

export default useClientForm;