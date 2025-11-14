import {
	MdEmail,
	MdPhone,
	MdHome,
	MdAssignmentInd,
	MdFingerprint,
	MdDateRange,
	MdFolder,
} from 'react-icons/md';
import ClientSocialLinks from './ClientSocialLinks';

const iconClass = 'inline mr-2 text-2xl text-blue-600 dark:text-blue-500';

const ClientInfo = ({ selectedClient }) => {
	const clientDetails = [
		{
			label: 'Número de Cliente',
			icon: MdAssignmentInd,
			value: selectedClient.id,
		},
		{
			label: 'Correo Electrónico',
			icon: MdEmail,
			value: selectedClient.email || 'Sin correo',
			className: 'lowercase',
		},
		{
			label: 'Número Telefónico',
			icon: MdPhone,
			value: selectedClient.phoneNumber || 'Sin teléfono',
		},
		{
			label: 'Dirección',
			icon: MdHome,
			value: selectedClient.address || 'Sin dirección',
		},
		{
			label: 'RFC',
			icon: MdFingerprint,
			value: selectedClient.rfc || 'Sin RFC',
		},
		{
			label: 'CURP',
			icon: MdFingerprint,
			value: selectedClient.curp || 'Sin CURP',
		},
		{
			label: 'Fecha de Registro',
			icon: MdDateRange,
			value: new Date(selectedClient.createdAt).toLocaleDateString('es-MX', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			}),
		},
	];

	return (
		<section className="flex flex-col gap-6 items-start justify-start text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800">
			<h2 className="text-xl md:text-2xl font-semibold mb-12">Información del Cliente</h2>
			<article className="md:text-base flex flex-col gap-6 md:ml-4 md:flex-row">
				<ul className="grid md:grid-cols-3 gap-8 w-full">
					{clientDetails.map((detail, idx) => (
						<li key={idx} className="flex flex-col">
							<span className="font-normal">
								<detail.icon className={iconClass} /> {detail.label}:
							</span>
							<br className="md:hidden" />
							<span
								className={`text-blue-900 dark:text-blue-400 font-semibold ml-10 ${
									detail.className || ''
								}`}
							>
								{detail.value}
							</span>
						</li>
					))}
					<li>
						<span className="font-normal">
							<MdFolder className={iconClass} /> Proyectos:
						</span>
						<br className="md:hidden" />
						<span className="text-gray-800 dark:text-gray-100 font-normal ml-10 md:ml-0">
							{Array.isArray(selectedClient.projects) && selectedClient.projects.length > 0 ? (
								<ul className="ml-6 mt-3">
									{selectedClient.projects.map((proyecto, idx) => (
										<li key={idx} className="mb-1 list-none">
											<span>
												<MdFolder className={`${iconClass} text-xl font-medium`} />
											</span>
											{proyecto.title ? proyecto.title : JSON.stringify(proyecto)}
										</li>
									))}
								</ul>
							) : (
								'Sin proyectos'
							)}
						</span>
					</li>
				</ul>
			</article>
			<ClientSocialLinks selectedClient={selectedClient} />
		</section>
	);
};

export default ClientInfo;
