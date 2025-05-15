import axios from "axios";
import { useEffect, useState } from "react";
import DashboardTemplate from "@templates/DashboardTemplate";
import ProyectosCliente from "./ProyectosCliente";
import { FaHome } from "react-icons/fa";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaXTwitter,
} from "react-icons/fa6";
import { MdClose } from "react-icons/md";

const Cliente = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [isProyectExist, setIsProyectExist] = useState(false);

  const SocialStyles = {
    link: "text-blue-700 hover:text-blue-500 mx-auto",
    iconSize: "32",
  };

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
          // Si no existe la propiedad projects, créala como un arreglo vacío
          if (!client.projects) {
            client.projects = [];
          }
          setSelectedClient(client);
          setIsProyectExist(client.projects.length > 0);
        } else {
          console.error("Cliente no encontrado con ID:", clientId);
        }
      })
      .catch((error) => console.error("Error al cargar clientes:", error));

    axios
      .get("localhost:5000/api/clients/:id/projects")
      .then((response) => {
        console.log("Proyectos cargados:", response.data); // Verifica los datos cargados

        // Buscar el cliente por ID
        const client = response.data.find((client) => client.id === clientId);
        console.log("Cliente encontrado:", client); // Verifica si se encuentra el cliente

        if (client) {
          // Si no existe la propiedad projects, créala como un arreglo vacío
          if (!client.projects) {
            client.projects = [];
          }
          setSelectedClient(client);
          setIsProyectExist(client.projects.length > 0);
        } else {
          console.error("Cliente no encontrado con ID:", clientId);
        }
      })
      .catch((error) => console.error("Error al cargar clientes:", error));
  }, []);

  return (
    <DashboardTemplate title="Detalles del Cliente">
      {selectedClient ? (
        <section className="flex flex-col gap-12 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 xl:p-20 border-2 dark:border-gray-700 border-gray-300 ">
          <article className="">
            <div className="flex w-full justify-end items-center">
              <a href="/clientes/" title="Ir a clientes">
                <MdClose className="text-4xl text-blue-900 dark:text-blue-500" />
              </a>
            </div>
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
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold mb-4">
                Información del Cliente
              </h2>
              <div className="text-lg flex flex-col gap-4">
                <p>
                  <strong>Número de Cliente:</strong>{" "}
                  <br className="md:hidden" />
                  {selectedClient.id}
                </p>
                <p>
                  <strong>Correo Electrónico:</strong>{" "}
                  <br className="md:hidden" />
                  {selectedClient.email}
                </p>
                <p>
                  <strong>Número Telefónico:</strong>{" "}
                  <br className="md:hidden" />
                  {selectedClient.phoneNumber}
                </p>
                <p>
                  <strong>Dirección:</strong> <br className="md:hidden" />
                  {selectedClient.address}
                </p>
                <p>
                  <strong>Proyecto:</strong> <br className="md:hidden" />
                  {selectedClient.project}
                </p>
              </div>
            </div>
            <div className="col-span-12 flex flex-col md:flex-row items-center md:justify-between justify-center gap-6 xl:px-0 py-8">
              <h2 className="text-2xl font-semibold">Visita</h2>
              <div
                id="tarjeta-redes-sociales"
                className="grid grid-cols-4 md:grid-cols-7 items-center gap-8 md:gap-4">
                {[
                  {
                    href: selectedClient?.website,
                    icon: <FaHome size={SocialStyles.iconSize} />,
                    title: "Visitar sitio web",
                  },
                  {
                    href: `mailto:${selectedClient?.email}`,
                    icon: <FaEnvelope size={SocialStyles.iconSize} />,
                    title: "Enviar correo electrónico",
                  },
                  {
                    href: `tel:${selectedClient?.phoneNumber}`,
                    icon: <FaPhone size={SocialStyles.iconSize} />,
                    title: "Llamar",
                  },
                  {
                    href: selectedClient?.linkedin?.trim(),
                    icon: <FaLinkedin size={SocialStyles.iconSize} />,
                    title: "Visitar LinkedIn",
                  },
                  {
                    href: selectedClient?.facebook?.trim(),
                    icon: <FaFacebook size={SocialStyles.iconSize} />,
                    title: "Visitar Facebook",
                  },
                  {
                    href: selectedClient?.instagram?.trim(),
                    icon: <FaInstagram size={SocialStyles.iconSize} />,
                    title: "Visitar Instagram",
                  },
                  {
                    href: selectedClient?.twitter?.trim(),
                    icon: <FaXTwitter size={SocialStyles.iconSize} />,
                    title: "Visitar Twitter",
                  },
                ]
                  .filter((social) => social.href)
                  .map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={SocialStyles.link}
                      aria-label={social.title}
                      title={social.title}>
                      {social.icon}
                    </a>
                  ))}
              </div>
            </div>
          </article>
          <div className="grid md:grid-cols-2">
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
