import React, { useEffect, useState } from "react";

const ClientsTable = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
          <thead className="bg-blue-800 text-white border-blue-800">
            <tr>
              <th className="px-4 py-2 text-left text-base font-medium border-b">
                Nombre Completo
              </th>
              <th className="px-4 py-2 text-left text-base font-medium border-b">
                Proyecto
              </th>
              <th className="px-4 py-2 text-left text-base font-medium border-b">
                Correo Electrónico
              </th>
              <th className="px-4 py-2 text-left text-base font-medium border-b">
                Número Telefónico
              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr
                key={client.id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">
                  {client.fullName} {client.lastName} {client.lastName2}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">
                  {client.project}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">
                  {client.email}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">
                  {client.phoneNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsTable;
