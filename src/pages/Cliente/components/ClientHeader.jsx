import ClientImage from "@components/Imagenes/ClientImage";
import FullNameText from "@components/Texts/FullNameText";
import NewClientTag from "@components/Tags/NewClientTag";
import Button from "@components/Botones/Button";
import { FaRegEdit } from "react-icons/fa";
import ClientsModal from "@pages/ClientsPage/ClientsModal";

const ClientHeader = ({ selectedClient, setIsModalOpen, isModalOpen }) => (
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
      variant="secondary"
    />
    {isModalOpen && (
      <ClientsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        client={selectedClient} // <--- Cambia aquí
        // onSave={handleSaveClient} // si tienes una función para guardar
      />
    )}
  </h1>
);

export default ClientHeader;
