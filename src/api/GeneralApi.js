import axios from "axios";

const handleRefreshClients = ({ setClients }) => {
  axios
    .get("/server/clients.json")
    .then((response) => setClients(response.data))
    .catch((error) => console.error("Error al refrescar clientes:", error));
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

export { handleRefreshClients, handleScrollToTop, handleScrollToBottom };
