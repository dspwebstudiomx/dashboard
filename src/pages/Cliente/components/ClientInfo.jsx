import {
  MdEmail,
  MdPhone,
  MdHome,
  MdAssignmentInd,
  MdFingerprint,
  MdDateRange,
  MdFolder,
} from "react-icons/md";

const iconClass = "inline mr-2 text-2xl text-blue-600 dark:text-blue-500";

const ClientInfo = ({ selectedClient }) => (
  <div className="flex flex-col gap-6">
    <h2 className="text-xl md:text-2xl font-semibold mb-4">
      Información del Cliente
    </h2>
    <div className="md:text-base flex flex-col gap-6 md:ml-4">
      <p>
        <span className="font-normal">
          <MdAssignmentInd className={iconClass} /> Número de Cliente:
        </span>{" "}
        <br className="md:hidden" />
        <span className="text-blue-900 dark:text-blue-400 font-semibold ml-10 md:ml-0">
          {selectedClient.id}
        </span>
      </p>
      <p>
        <span className="font-normal">
          <MdEmail className={iconClass} /> Correo Electrónico:
        </span>{" "}
        <br className="md:hidden" />
        <span className="text-blue-900 dark:text-blue-400 font-semibold ml-10 md:ml-0 lowercase">
          {selectedClient.email ? selectedClient.email : "Sin correo"}
        </span>
      </p>
      <p>
        <span className="font-normal">
          <MdPhone className={iconClass} /> Número Telefónico:
        </span>{" "}
        <br className="md:hidden" />
        <span className="text-blue-900 dark:text-blue-400 font-semibold ml-10 md:ml-0">
          {selectedClient.phoneNumber
            ? selectedClient.phoneNumber
            : "Sin teléfono"}
        </span>
      </p>
      <p>
        <span className="font-normal">
          <MdHome className={iconClass} /> Dirección:
        </span>{" "}
        <br className="md:hidden" />
        <span className="text-blue-900 dark:text-blue-400 font-semibold ml-10 md:ml-0">
          {selectedClient.address ? selectedClient.address : "Sin dirección"}
        </span>
      </p>
      <p>
        <span className="font-normal">
          <MdFingerprint className={iconClass} /> RFC:
        </span>{" "}
        <br className="md:hidden" />
        <span className="text-blue-900 dark:text-blue-400 font-semibold ml-10 md:ml-0">
          {selectedClient.rfc ? selectedClient.rfc : "Sin RFC"}
        </span>
      </p>
      <p>
        <span className="font-normal">
          <MdFingerprint className={iconClass} /> CURP:
        </span>{" "}
        <br className="md:hidden" />
        <span className="text-blue-900 dark:text-blue-400 font-semibold ml-10 md:ml-0">
          {selectedClient.curp ? selectedClient.curp : "Sin CURP"}
        </span>
      </p>
      <p>
        <span className="font-normal">
          <MdDateRange className={iconClass} /> Fecha de Registro:
        </span>{" "}
        <br className="md:hidden" />
        <span className="text-blue-900 dark:text-blue-400 font-semibold ml-10 md:ml-0">
          {new Date(selectedClient.createdAt).toLocaleDateString("es-MX", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </p>
      <p>
        <span className="font-normal">
          <MdFolder className={iconClass} /> Proyectos:
        </span>{" "}
        <br className="md:hidden" />
        <span className="text-gray-800 dark:text-gray-100 font-semibold ml-10 md:ml-0">
          {Array.isArray(selectedClient.projects) &&
          selectedClient.projects.length > 0 ? (
            <ul className="list-disc ml-6 mt-3">
              {selectedClient.projects.map((proyecto, idx) => (
                <li key={idx} className="mb-1 list-none">
                  <span>
                    <MdFolder className={`${iconClass} text-xl`} />
                  </span>
                  {proyecto.title ? proyecto.title : JSON.stringify(proyecto)}
                </li>
              ))}
            </ul>
          ) : (
            "Sin proyectos"
          )}
        </span>
      </p>
    </div>
  </div>
);

export default ClientInfo;
