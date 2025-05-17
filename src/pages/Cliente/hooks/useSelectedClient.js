import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useSelectedClient = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [isProyectExist, setIsProyectExist] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const clientId = Number(window.location.pathname.split("/").pop());
    axios
      .get(`/server/clients.json`)
      .then((response) => {
        const client = response.data.find((client) => client.id === clientId);
        if (client) {
          if (!client.projects) client.projects = [];
          setSelectedClient(client);
          setIsProyectExist(client.projects.length > 0);
        }
      })
      .catch((error) => console.error("Error al cargar clientes:", error));
  }, []);

  return {
    selectedClient,
    setSelectedClient,
    isProyectExist,
    setIsProyectExist,
    isModalOpen,
    setIsModalOpen,
    navigate,
  };
};