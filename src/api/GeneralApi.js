// Función para refrescar la lista de clientes
export const handleRefreshClients = async (setClients) => {
  try {
    const response = await fetch("http://localhost:5000/api/clients");
    const clients = await response.json();
    setClients(clients); // Aquí se llama a setClients para actualizar el estado
  } catch (error) {
    console.error("Error al refrescar los clientes:", error);
  }
};
// Función para ir al inicio de la página
const handleScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Desplazamiento suave
  });
};
// Función para ir al final de la página
const handleScrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth", // Desplazamiento suave
  });
};

export { handleScrollToTop, handleScrollToBottom };
