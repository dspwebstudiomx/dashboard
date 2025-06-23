import { useState, useEffect } from "react";
import axios from "axios";

// Estado inicial para un cliente
const initialClientState = {
  id: null,
  fullname: "",
  email: "",
  phone: "",
};

// Hook personalizado para manejar clientes
export const useClients = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newClient, setNewClient] = useState(initialClientState);
  const [editClientId, setEditClientId] = useState(null);
  const [errors, setErrors] = useState({});

  // Cargar clientes al iniciar
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/clients");
      setClients(res.data);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
    }
  };

  // Agregar un cliente
  const handleAddClient = async () => {
    if (validateClient(newClient)) {
      try {
        await axios.post("http://localhost:5000/api/clients", newClient);
        await fetchClients();
        resetForm();
        setShowModal(false);
      } catch (error) {
        console.error("Error al agregar cliente:", error);
      }
    }
  };

  // Editar un cliente existente
  const handleEditClient = async () => {
    if (validateClient(newClient)) {
      try {
        await axios.put(
          `http://localhost:5000/api/clients/${editClientId}`,
          newClient
        );
        await fetchClients();
        resetForm();
        setShowModal(false);
      } catch (error) {
        console.error("Error al editar cliente:", error);
      }
    }
  };

  // Eliminar un cliente
  const removeClient = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/clients/${id}`);
      await fetchClients();
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
    }
  };

  // Validar un cliente
  const validateClient = (client) => {
    const validationErrors = {};
    if (!client.fullname) validationErrors.fullname = "El nombre es obligatorio";
    if (!client.email) validationErrors.email = "El correo es obligatorio";
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Reiniciar el formulario
  const resetForm = () => {
    setNewClient(initialClientState);
    setEditClientId(null);
    setErrors({});
  };

  return {
    clients,
    showModal,
    newClient,
    editClientId,
    errors,
    setNewClient,
    setShowModal,
    setErrors,
    resetForm,
    handleEditClient,
    removeClient,
    setEditClientId,
    initialClientState,
    handleAddClient,
    setClients,
  };
};

export default useClients;
