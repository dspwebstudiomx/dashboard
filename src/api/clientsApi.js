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
export const deleteClient = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    throw error;
  }
};
