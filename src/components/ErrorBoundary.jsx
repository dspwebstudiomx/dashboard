// filepath: d:\Sitios Web\dashboard\src\components\ErrorBoundary.jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para mostrar la interfaz de error
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Puedes registrar el error en un servicio de monitoreo
    console.error("Error capturado por ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Renderiza una interfaz alternativa en caso de error
      return (
        <h2>
          Ocurrió un error al cargar esta sección. Por favor, inténtalo más
          tarde.
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
