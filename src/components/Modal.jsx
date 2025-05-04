import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        {/* Botón para cerrar el modal */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          ✕
        </button>
        {/* Contenido del modal */}
        {children}
      </div>
    </div>,
    document.getElementById("modal-root") // Asegúrate de tener un div con id="modal-root" en tu HTML
  );
};

export default Modal;
