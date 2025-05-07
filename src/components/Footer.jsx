import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white text-center mt-auto fixed bottom-0 w-full h-auto p-5 flex-col justify-evenly items-center p">
      <p className="text-sm mb-3">
        © 2025 dspwebstudio - Todos los derechos reservados.
      </p>
      <div className="flex flex-col md:items-start hidden md:flex-row md:gap-4">
        <p className="text-sm">Desarrollado por DSP Web Studio</p>
        <p className="text-sm">Versión 1.0.0</p>
      </div>
    </footer>
  );
};

export default Footer;
