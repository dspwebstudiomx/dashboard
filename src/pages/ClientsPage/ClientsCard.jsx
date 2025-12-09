/*
  ClientesCard.jsx - Componente para mostrar la tarjeta de un cliente.
  Este componente muestra la información del cliente, incluyendo su imagen,
  nombre completo, correo electrónico, teléfono, dirección, empresa, proyecto,
  RFC, CURP y redes sociales. También permite editar y eliminar al cliente.
  Creado por: Daniel Pérez
  Fecha de creación: 2025-8-25
*/

import React, { useState } from 'react';
import {
	FaTrash,
	FaEnvelope,
	FaPhone,
	FaFacebook,
	FaInstagram,
	FaLinkedin,
	FaHome,
	FaEye,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { IoWarningOutline } from 'react-icons/io5';
import ClientDetailsTable from './ClientDetailsTable';
import { Link } from 'react-router-dom';
import EditClientButton from '@components/Botones/EditClientButton';

const ClientsCard = ({ client, fetchClients, handleOpenModal }) => {
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [isTableModalOpen, setIsTableModalOpen] = useState(false);

	const openConfirmModal = () => {
		setIsConfirmModalOpen(true);
	};

	const closeConfirmModal = () => {
		setIsConfirmModalOpen(false);
	};

	const openTableModal = () => {
		setIsTableModalOpen(true);
	};

	const closeTableModal = () => {
		setIsTableModalOpen(false);
	};

	const handleDeleteClient = async (id) => {
		try {
			const response = await fetch(`http://localhost:5000/api/clients/${id}`, {
				method: 'DELETE',
			});
			if (!response.ok) {
				throw new Error(`Error al eliminar cliente: ${response.statusText}`);
			}
			if (typeof fetchClients === 'function') {
				await fetchClients();
			}
		} catch (error) {
			console.error('Error eliminando cliente:', error);
		} finally {
			closeConfirmModal();
		}
	};

	const SocialStyles = {
		link: 'text-blue-700 hover:text-blue-500 mx-auto',
		iconSize: '32',
	};

	return (
		<article className="grid md:grid-cols-12 shadow-2xl rounded-2xl p-8 justify-center items-center md:items-start gap-5 bg-white dark:bg-gray-800 font-semibold mb-0 xl:h-auto last:md:mb-0 border-4 dark:border-gray-700 border-blue-400">
			<div
				id="client-logo"
				className="col-span-12 md:col-span-12 items-center justify-between h-auto gap-12 my-auto"
			>
				<div
					id="tarjeta-clients-imagen-nombreCompleto-redesSociales"
					className="flex flex-col items-center justify-center gap-6"
				>
					<img
						id="imagen-cliente"
						src={
							client.image
								? `http://localhost:5000${client.image}`
								: '../../../server/uploads/avatar_placeholder_large.png'
						}
						alt={client.fullName}
						className="w-24 h-24 rounded-full mx-auto border-2 border-gray-300 object-cover bg-white"
					/>
					<div
						id="cliente-nombre-completo"
						className="text-center flex flex-col items-center justify-center gap-0"
					>
						<h2 className="text-lg font-bold text-gray-700 dark:text-gray-100 text-center w-full m-4 flex flex-col md:flex-row gap-1 md:text-xl justify-center">
							<span>{client?.fullName}</span>
							<span>
								{client?.lastName} {client?.lastName2}
							</span>
						</h2>
						<Link
							className="bg-blue-400 px-4 py-2 rounded-4xl text-blue-800"
							to={`/clientes/${client?.id}`}
						>
							{client?.id}
						</Link>
						<div className="col-span-12 flex flex-col md:flex-row items-center md:justify-between justify-center gap-6 xl:px-2 py-12">
							<div
								id="tarjeta-redes-sociales"
								className="flex flex-wrap items-center gap-8 md:gap-4"
							>
								{[
									{
										href: client?.website,
										icon: <FaHome size={SocialStyles.iconSize} />,
										title: 'Visitar sitio web',
									},
									{
										href: `mailto:${client?.email}`,
										icon: <FaEnvelope size={SocialStyles.iconSize} />,
										title: 'Enviar correo electrónico',
									},
									{
										href: `tel:${client?.phoneNumber}`,
										icon: <FaPhone size={SocialStyles.iconSize} />,
										title: 'Llamar',
									},
									{
										href: client?.linkedin?.trim(),
										icon: <FaLinkedin size={SocialStyles.iconSize} />,
										title: 'Visitar LinkedIn',
									},
									{
										href: client?.facebook?.trim(),
										icon: <FaFacebook size={SocialStyles.iconSize} />,
										title: 'Visitar Facebook',
									},
									{
										href: client?.instagram?.trim(),
										icon: <FaInstagram size={SocialStyles.iconSize} />,
										title: 'Visitar Instagram',
									},
									{
										href: client?.twitter?.trim(),
										icon: <FaXTwitter size={SocialStyles.iconSize} />,
										title: 'Visitar Twitter',
									},
								]
									.filter((social) => social.href)
									.map((social, index) => (
										<a
											key={index}
											href={social.href}
											target="_blank"
											rel="noopener noreferrer"
											className={SocialStyles.link}
											aria-label={social.title}
											title={social.title}
										>
											{social.icon}
										</a>
									))}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="client-data" className="col-span-12 text-sm xl:text-base border-collapse h-full">
				<div
					id="redes-sociales-botones-edicion"
					className="flex gap-4 justify-between items-center w-full"
				>
					<EditClientButton client={client} handleOpenModal={handleOpenModal} />
					<div className="flex gap-4">
						<button
							onClick={openTableModal}
							className=" rounded-lg flex items-center justify-center"
						>
							<FaEye size={34} className="inline mr-2 text-blue-700  hover:text-blue-500" />
						</button>
						<button
							id="eliminar-cliente"
							onClick={openConfirmModal}
							className="text-red-500 hover:text-red-700"
							aria-label={`Eliminar cliente ${client?.fullName}`}
						>
							<FaTrash size={28} />
						</button>
					</div>
				</div>
			</div>

			{isConfirmModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/45 opacity-100 z-50">
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
						<h2 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
							<IoWarningOutline className="inline-block mr-2 text-amber-300 text-3xl" />
							Confirmar eliminación
						</h2>
						<p className="text-gray-600 dark:text-gray-400 mb-6">
							¿Estás seguro de que deseas eliminar al cliente{' '}
							<span className="font-bold">{client?.fullName || 'Usuario no encontrado'}</span>?
						</p>
						<div className="flex flex-row justify-end gap-4">
							<button
								onClick={closeConfirmModal}
								className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
							>
								Cancelar
							</button>
							<button
								id="eliminar-cliente"
								onClick={() => handleDeleteClient(client?.id)}
								className="px-4 py-2 bg-blue-900 hover:bg-blue-500 text-white rounded shadow-md"
							>
								Eliminar cliente
							</button>
						</div>
					</div>
				</div>
			)}
			<ClientDetailsTable
				client={client}
				isTableModalOpen={isTableModalOpen}
				closeTableModal={closeTableModal}
			/>
		</article>
	);
};

export default ClientsCard;
