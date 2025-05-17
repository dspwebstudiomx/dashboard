import ClientImage from "@components/Imagenes/ClientImage";
import FullNameText from "@components/Texts/FullNameText";
import NewClientTag from "@components/Tags/NewClientTag";
import Button from "@components/Botones/Button";
import EditarCliente from "../EditarCliente";
import { FaRegEdit } from "react-icons/fa";

const ClientHeader = ({
  selectedClient,
  setIsModalOpen,
  isModalOpen,
  setSelectedClient,
}) => (
  <h1 className="text-2xl md:text-3xl mb-12 flex flex-col md:flex-row items-center gap-4">
    <div className="flex items-center gap-4">
      <ClientImage selectedClient={selectedClient} />
      <div className="flex flex-col gap-3">
        <FullNameText selectedClient={selectedClient} />
        <NewClientTag selectedClient={selectedClient} />
      </div>
    </div>
    <Button
      onClick={() => setIsModalOpen(true)}
      text="Editar cliente"
      icon={FaRegEdit}
    />
    <EditarCliente
      selectedClient={selectedClient}
      setSelectedClient={setSelectedClient}
      isModalOpen={isModalOpen}
      handleSaveClient={() => setIsModalOpen(false)}
      handleCloseModal={() => setIsModalOpen(false)}
      handleClientUpdate={() => setIsModalOpen(false)}
    />
  </h1>
);

export default ClientHeader;
