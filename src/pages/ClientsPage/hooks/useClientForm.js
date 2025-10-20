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
    // No enviar imagePreview al servidor (es solo para preview local)
    const payload = { ...formData };
    if (payload.imagePreview) delete payload.imagePreview;

    if (isEditing) {
      await axios.put(`http://localhost:5000/api/clients/${client.id}`, payload);
    } else {
      await axios.post("http://localhost:5000/api/clients", payload);
    }
    onClientUpdate(); // <-- Refresca la lista en el padre
    onClose();        // <-- Cierra el modal
    window.location.reload(); // <-- Refresca el navegador
  };

  const handleRemoveImage = () => {
    setFormData((prev) => {
      // revocar object URL si existía
      try {
        if (prev.imagePreview && prev.imagePreview.startsWith('blob:')) {
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
    // Crear preview local inmediato
    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => {
      try {
        if (prev.imagePreview && prev.imagePreview.startsWith('blob:')) {
          URL.revokeObjectURL(prev.imagePreview);
        }
      } catch {
        // ignore
      }
      return { ...prev, imagePreview: previewUrl };
    });
    const formDataImage = new FormData();
    // Multer en el servidor está configurado con upload.single('file'),
    // por eso debemos enviar el campo con nombre 'file'.
    formDataImage.append("file", file);

    try {
      // 1) Subir el archivo al endpoint de uploads
      const uploadResp = await fetch("http://localhost:5000/api/uploads", {
        method: "POST",
        body: formDataImage,
      });
      if (!uploadResp.ok) throw new Error(`Error al subir imagen: ${uploadResp.statusText}`);
      const uploadData = await uploadResp.json();
      const uploadedPath = uploadData.url; // Ej: /uploads/abcd.jpg
      const serverImageUrl = `http://localhost:5000${uploadedPath}?t=${Date.now()}`;

      // 2) Si el cliente ya existe, actualizar el cliente en el servidor para persistir la ruta
      if (client && client.id) {
        try {
          const putResp = await fetch(`http://localhost:5000/api/clients/${client.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: uploadedPath }),
          });
          if (!putResp.ok) throw new Error(`Error al actualizar cliente: ${putResp.statusText}`);
          await putResp.json();
          // actualizar lista en el padre si se proporcionó onClientUpdate
          if (onClientUpdate) {
            onClientUpdate((prevClients) =>
              prevClients.map((c) => (c.id === client.id ? { ...c, image: uploadedPath } : c))
            );
          }
        } catch {
          // si falla la persistencia, igual continuamos mostrando el preview
        }
      }

      // 3) Actualizar el estado local con la ruta del servidor (y limpiar preview blob)
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