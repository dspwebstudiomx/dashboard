import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";

const ClientsTable = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 3; // Límite de clientes por página

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("/server/clients.json");
        if (!response.ok) {
          throw new Error("Error al obtener los datos de los clientes");
        }
        const data = await response.json();
        setClients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // Calcular los índices de los clientes para la página actual
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(clients.length / clientsPerPage);

  // Cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="overflow-x-auto flex flex-col items-stretch justify-between w-full min-h-[380px]">
      <table
        id="clients-table"
        className="min-w-full border border-gray-300 bg-white border-collapse ">
        <thead className="bg-blue-700 text-white border-blue-800">
          <tr>
            <th className="px-4 py-2 text-left font-medium border border-gray-300">
              Cliente
            </th>
            <th className="px-4 py-2 text-left font-medium border border-gray-300">
              Proyecto
            </th>
            <th className="px-4 py-2 text-left font-medium border border-gray-300">
              Correo Electrónico
            </th>
            <th className="px-4 py-2 text-left font-medium border border-gray-300">
              Número Telefónico
            </th>
            <th className="px-8 py-2 text-left font-medium border border-gray-300">
              Ver
            </th>
          </tr>
        </thead>
        <tbody>
          {currentClients.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-8 text-center text-gray-500 border border-gray-300">
                No hay clientes para mostrar.
              </td>
            </tr>
          ) : (
            <>
              {currentClients.map((client, index) => (
                <tr
                  key={client.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-4 py-4 text-sm text-gray-700 border border-gray-300 flex items-center gap-4">
                    <a href={`/clientes/${client.id}`}>
                      <img
                        id="imagen-cliente"
                        src={
                          client.image
                            ? `http://localhost:5000${client.image}`
                            : "../../../server/uploads/avatar_placeholder_large.png"
                        }
                        alt={client.fullName}
                        className="w-12 h-12 md:hidden xl:block rounded-full border-2 border-gray-300 object-cover bg-white"
                      />
                    </a>
                    {client.fullName} {client.lastName} {client.lastName2}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300">
                    {client.project}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300">
                    {client.email}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300">
                    {client.phoneNumber}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border border-gray-300">
                    <a
                      href={`/clientes/${client.id}`}
                      className="text-blue-600 hover:text-blue-800">
                      <FaEye className="w-6 h-6 mx-auto" />
                    </a>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      {/* Mostrar controles de paginación solo si hay más de 3 clientes */}
      {clients.length > clientsPerPage && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 border rounded-full ${
                currentPage === index + 1
                  ? "bg-blue-700 text-white"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200"
              }`}>
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientsTable;
