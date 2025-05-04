import axios from "axios";

const API_URL = "http://localhost:5000/api/clients";

// Obtener todos los clientes
export const fetchClients = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.clients || []; // Asegúrate de devolver un array
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    throw error;
  }
};

// Eliminar un cliente por ID
export const deleteClient = (id) => axios.delete(`${API_URL}/${id}`);

// Crear un nuevo cliente
export const createClient = (data) =>
  axios.post(API_URL, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Actualizar un cliente existente
export const updateClient = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
