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
    <div className="md:text-lg flex flex-col gap-6">
      <p>
        <strong>
          <MdAssignmentInd className={iconClass} /> Número de Cliente:
        </strong>{" "}
        <br className="md:hidden" />
        {selectedClient.id}
      </p>
      <p>
        <strong>
          <MdEmail className={iconClass} /> Correo Electrónico:
        </strong>{" "}
        <br className="md:hidden" />
        {selectedClient.email}
      </p>
      <p>
        <strong>
          <MdPhone className={iconClass} /> Número Telefónico:
        </strong>{" "}
        <br className="md:hidden" />
        {selectedClient.phoneNumber}
      </p>
      <p>
        <strong>
          <MdHome className={iconClass} /> Dirección:
        </strong>{" "}
        <br className="md:hidden" />
        {selectedClient.address}
      </p>
      <p>
        <strong>
          <MdFingerprint className={iconClass} /> RFC:
        </strong>{" "}
        <br className="md:hidden" />
        {selectedClient.rfc}
      </p>
      <p>
        <strong>
          <MdFingerprint className={iconClass} /> CURP:
        </strong>{" "}
        <br className="md:hidden" />
        {selectedClient.curp}
      </p>
      <p>
        <strong>
          <MdDateRange className={iconClass} /> Fecha de Registro:
        </strong>{" "}
        <br className="md:hidden" />
        {new Date(selectedClient.createdAt).toLocaleDateString("es-MX", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <p>
        <strong>
          <MdFolder className={iconClass} /> Proyecto:
        </strong>{" "}
        <br className="md:hidden" />
        {selectedClient.project || "Sin proyecto"}
      </p>
    </div>
  </div>
);

export default ClientInfo;
