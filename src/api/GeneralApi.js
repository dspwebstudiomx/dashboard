// Función para ir al inicio de la página
const handleScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Desplazamiento suave
  });
};
// Función para ir al final de la página
const handleScrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth", // Desplazamiento suave
  });
};

export { handleScrollToTop, handleScrollToBottom };
