import { MdClose } from "react-icons/md";
// import { useNavigate } from "react-router-dom";

const CloseButton = ({ onClick }) => {
  // const navigate = useNavigate();
  return (
    <button
      id="boton-cerrar"
      onClick={onClick}
      title="Volver a la página anterior"
      className="bg-transparent border-none cursor-pointer">
      <MdClose className="text-3xl md:text-4xl text-blue-900 dark:text-blue-500" />
    </button>
  );
};

export default CloseButton;
