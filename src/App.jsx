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
import React, { useState } from 'react';
import Header from './components/Menus/Header';
import Sidebar from './components/Menus/Sidebar';

const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	return (
		<ModalStackProvider>
			<Router>
				<Header toggleSidebar={toggleSidebar} />
				<main className="App grid grid-cols-12 w-full bg-blue-900 dark:bg-gray-900 min-h-[91.1vh]">
					<div className="col-span-10">
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
					</div>
					<div className="col-span-2">
						<Sidebar isOpen={isSidebarOpen} />
					</div>
				</main>
				<footer className="bg-blue-900 dark:bg-gray-900">
					<div className="flex justify-center items-center py-8">
						<p className="text-gray-100 dark:text-gray-400 text-sm px-12 md:px-0">
							&copy; {new Date().getFullYear()} dspwebstudio. Todos los derechos reservados.
						</p>
					</div>
				</footer>
			</Router>
		</ModalStackProvider>
	);
};

export default App;
