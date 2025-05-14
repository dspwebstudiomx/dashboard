import axios from "axios";
import { useEffect, useState } from "react";
import DashboardTemplate from "@templates/DashboardTemplate";

const Cliente = () => {
  const [client, setClient] = useState([]);

  // Cargar clientes desde el archivo JSON
  useEffect(() => {
    axios
      .get("/server/clients.json")
      .then((response) => {
        setClient(response.data);
      })
      .catch((error) => console.error("Error al cargar clientes:", error));
  }, []);

  return (
    <DashboardTemplate>
      {client ? (
        <article className="text-gray-800 dark:text-gray-100">
          <h1>Nombre: {client.fullName}</h1>
          <p>Email: {client.email}</p>
          {/* Agrega más campos según la estructura del cliente */}
        </article>
      ) : (
        <p>Cargando cliente...</p>
      )}
    </DashboardTemplate>
  );
};

export default Cliente;
