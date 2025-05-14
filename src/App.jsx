import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import ClientsPage from "./pages/ClientsPage/ClientsPage";
import TasksPage from "./pages/TasksPage/TasksPage";
import QuotesPage from "./pages/QuotesPage/QuotesPage";
import "./App.css";
import Cliente from "@pages/Cliente/Cliente";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/proyectos" element={<ProjectsPage />} />
        <Route path="/clientes" element={<ClientsPage />} />
        <Route path="/tareas" element={<TasksPage />} />
        <Route path="/cotizaciones" element={<QuotesPage />} />
        <Route path="/clientes/:id" element={<Cliente />} />
      </Routes>
    </Router>
  );
};

export default App;
