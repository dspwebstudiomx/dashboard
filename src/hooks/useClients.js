import { useState } from "react";

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

  // Agregar un cliente
  const addClient = (client) => {
    setClients([...clients, client]);
  };

  // Editar un cliente existente
  const editClient = (id, updatedClient) => {
    setClients(
      clients.map((client) => (client.id === id ? updatedClient : client))
    );
  };

  // Manejar la adición de un cliente
  const handleAddClient = () => {
    if (validateClient(newClient)) {
      addClient(newClient);
      resetForm();
      setShowModal(false);
    }
  };

  // Manejar la edición de un cliente
  const handleEditClient = () => {
    if (validateClient(newClient)) {
      editClient(editClientId, newClient);
      resetForm();
      setShowModal(false);
    }
  };

  // Eliminar un cliente
  const removeClient = (id) => {
    setClients(clients.filter((client) => client.id !== id));
  };

  // Validar un cliente
  const validateClient = (client) => {
    const validationErrors = {};
    if (!client.fullname)
      validationErrors.fullname = "El nombre es obligatorio";
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
    addClient,
    editClient,
    handleAddClient,
    setClients
  };
};

export default useClients;
