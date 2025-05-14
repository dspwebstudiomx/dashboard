import axios from "axios";
import { useEffect, useState } from "react";
import DashboardTemplate from "@templates/DashboardTemplate";
import ProyectosCliente from "./ProyectosCliente";

const Cliente = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [isProyectExist, setIsProyectExist] = useState(false);

  // Cargar cliente desde el archivo JSON
  useEffect(() => {
    // Obtener el ID del cliente desde la URL y convertirlo a número
    const clientId = Number(window.location.pathname.split("/").pop());
    console.log("ID del cliente desde la URL:", clientId);

    axios
      .get("/server/clients.json")
      .then((response) => {
        console.log("Datos cargados:", response.data); // Verifica los datos cargados

        // Buscar el cliente por ID
        const client = response.data.find((client) => client.id === clientId);
        console.log("Cliente encontrado:", client); // Verifica si se encuentra el cliente

        if (client) {
          setSelectedClient(client);
        } else {
          console.error("Cliente no encontrado con ID:", clientId);
        }
      })
      .catch((error) => console.error("Error al cargar clientes:", error));
  }, []);

  return (
    <DashboardTemplate title="Detalles del Cliente">
      {selectedClient ? (
        <section className="flex flex-col gap-20 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 xl:p-20">
          <article className="">
            <h1 className="text-3xl mb-12 flex items-center gap-4">
              <img
                id="imagen-cliente"
                src={
                  selectedClient.image
                    ? `http://localhost:5000${selectedClient.image}`
                    : "../../../server/uploads/avatar_placeholder_large.png"
                }
                alt={selectedClient.fullName}
                className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover bg-white"
              />
              <span>
                {selectedClient?.fullName} {selectedClient?.lastName}{" "}
                {selectedClient?.lastName2}
              </span>
            </h1>
            {/* // Muestra todos los datos del cliente */}
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold mb-4">
                Información del Cliente
              </h2>
              <div>
                <p>
                  <strong>Correo Electrónico:</strong> {selectedClient.email}
                </p>
                <p>
                  <strong>Número Telefónico:</strong>{" "}
                  {selectedClient.phoneNumber}
                </p>
                <p>
                  <strong>Dirección:</strong> {selectedClient.address}
                </p>
                <p>
                  <strong>Proyecto:</strong> {selectedClient.project}
                </p>
              </div>
            </div>
          </article>
          <div className="grid grid-cols-2">
            {/* //Proyectos del cliente */}
            <ProyectosCliente
              isProyectExist={isProyectExist}
              selectedClient={selectedClient}
            />
          </div>
        </section>
      ) : (
        <p>Cargando cliente...</p>
      )}
    </DashboardTemplate>
  );
};

export default Cliente;
