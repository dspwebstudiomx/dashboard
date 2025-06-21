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
import { ClientsProvider } from '@context/ClientsProvider';

const App = () => {
	return (
		<ModalStackProvider>
			<Router>
				<Routes>
					<Route path="/" element={<DashboardPage />} />
					<Route path="/proyectos" element={<ProjectsPage />} />
					<Route
						path="/clientes"
						element={
							<ClientsProvider>
								<ClientProvider>
									<ClientsPage />
								</ClientProvider>
							</ClientsProvider>
						}
					/>
					<Route path="/tareas" element={<TasksPage />} />
					<Route path="/cotizaciones" element={<QuotesPage />} />
					<Route
						path="/clientes/:id"
						element={
							<ClientProvider>
								<Client />
							</ClientProvider>
						}
					/>
				</Routes>
			</Router>
		</ModalStackProvider>
	);
};

export default App;
