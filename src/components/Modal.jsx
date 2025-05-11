import React from "react";
import PropTypes from "prop-types";

const Modal = ({ isOpen, children, title }) => {
  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 bg-blue-900 dark:bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <article className="bg-white rounded-lg shadow-lg w-[90vw] h-[90vh] xl:h-[95vh] 2xl:w-[70vw] 2xl:h-[90vh] md:max-w-full p-6 md:p-12 xl:p-16 border-4 border-blue-400 dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-6">
        {/* Título del modal */}
        {title && (
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
            {title}
          </h2>
        )}

        {/* Contenido dinámico */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </article>
    </section>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Modal;
