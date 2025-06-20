import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import ClientsPage from './pages/ClientsPage/ClientsPage';
import TasksPage from './pages/TasksPage/TasksPage';
import QuotesPage from './pages/QuotesPage/QuotesPage';
import Client from './pages/Cliente/components/ClientWindow/Client';
import { ModalStackProvider } from '@context/ModalStackContext';
import { ClientProvider } from '@context/ClientContext';

const App = () => {
	return (
		<ModalStackProvider>
			<Router>
				<ClientProvider>
					<Routes>
						<Route path="/" element={<DashboardPage />} />
						<Route path="/proyectos" element={<ProjectsPage />} />
						<Route path="/clientes" element={<ClientsPage />} />
						<Route path="/tareas" element={<TasksPage />} />
						<Route path="/cotizaciones" element={<QuotesPage />} />
						<Route path="/clientes/:id" element={<Client />} />
					</Routes>
				</ClientProvider>
			</Router>
		</ModalStackProvider>
	);
};

export default App;
