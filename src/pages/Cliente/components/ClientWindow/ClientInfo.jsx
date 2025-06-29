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

const ClientInfo = ({ selectedClient }) => (
	<section className="flex flex-col gap-6 items-start justify-start text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800">
		<h2 className="text-xl md:text-2xl font-semibold mb-12">Información del Cliente</h2>
		<article className="md:text-base flex flex-col gap-6 md:ml-4 md:flex-row">
			<ul className="grid md:grid-cols-3 gap-8 w-full">
				{/* Número de Cliente */}
				<li className="flex flex-col">
					<span className="font-normal">
						<MdAssignmentInd className={iconClass} /> Número de Cliente:
					</span>{' '}
					<br className="md:hidden" />
					<span className="text-blue-900 dark:text-blue-400 font-semibold ml-10">
						{selectedClient.id}
					</span>
				</li>
				{/* Correo Electrónico */}
				<li className="flex flex-col">
					<span className="font-normal">
						<MdEmail className={iconClass} /> Correo Electrónico:
					</span>{' '}
					<br className="md:hidden" />
					<span className="text-blue-900 dark:text-blue-400 font-semibold ml-10 lowercase">
						{selectedClient.email ? selectedClient.email : 'Sin correo'}
					</span>
				</li>
				{/* Número Telefónico */}
				<li className="flex flex-col">
					<span className="font-normal">
						<MdPhone className={iconClass} /> Número Telefónico:
					</span>{' '}
					<br className="md:hidden" />
					<span className="text-blue-900 dark:text-blue-400 font-semibold ml-10">
						{selectedClient.phoneNumber ? selectedClient.phoneNumber : 'Sin teléfono'}
					</span>
				</li>
				{/* Dirección */}
				<li className="flex flex-col">
					<span className="font-normal">
						<MdHome className={iconClass} /> Dirección:
					</span>{' '}
					<br className="md:hidden" />
					<span className="text-blue-900 dark:text-blue-400 font-semibold ml-10">
						{selectedClient.address ? selectedClient.address : 'Sin dirección'}
					</span>
				</li>
				{/* RFC */}
				<li className="flex flex-col">
					<span className="font-normal">
						<MdFingerprint className={iconClass} /> RFC:
					</span>{' '}
					<br className="md:hidden" />
					<span className="text-blue-900 dark:text-blue-400 font-semibold ml-10 ">
						{selectedClient.rfc ? selectedClient.rfc : 'Sin RFC'}
					</span>
				</li>
				{/* CURP */}
				<li className="flex flex-col">
					<span className="font-normal">
						<MdFingerprint className={iconClass} /> CURP:
					</span>{' '}
					<br className="md:hidden" />
					<span className="text-blue-900 dark:text-blue-400 font-semibold ml-10">
						{selectedClient.curp ? selectedClient.curp : 'Sin CURP'}
					</span>
				</li>
				{/* Proyectos */}
				<li className="flex flex-col">
					<span className="font-normal">
						<MdDateRange className={iconClass} /> Fecha de Registro:
					</span>{' '}
					<br className="md:hidden" />
					<span className="text-blue-900 dark:text-blue-400 font-semibold ml-10">
						{new Date(selectedClient.createdAt).toLocaleDateString('es-MX', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					</span>
				</li>
				<li>
					<span className="font-normal">
						<MdFolder className={iconClass} /> Proyectos:
					</span>{' '}
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

export default ClientInfo;
