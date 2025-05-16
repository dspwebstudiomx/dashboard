import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CloseButton = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full justify-end items-center">
      <button
        id="boton-cerrar"
        onClick={() => navigate(-1)}
        title="Volver a la página anterior"
        className="bg-transparent border-none cursor-pointer">
        <MdClose className="text-3xl md:text-4xl text-blue-900 dark:text-blue-500" />
      </button>
    </div>
  );
};

export default CloseButton;
