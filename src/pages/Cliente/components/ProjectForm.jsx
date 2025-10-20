import Button from '@components/Botones/Button';
import { IoMdAdd } from 'react-icons/io';
import { FaCalendarAlt, FaRegCalendarAlt, FaRegFileAlt, FaTools, FaTag } from 'react-icons/fa';
import {
	FaAlignLeft,
	FaArrowRotateLeft,
	FaArrowsRotate,
	FaCheck,
	FaFlag,
	FaLayerGroup,
} from 'react-icons/fa6';
import { FaCircle } from 'react-icons/fa';
import CostsProjectList from '@components/CostsProjectList';
import { useEffect } from 'react';

const SERVICES = [
	'Consultoria SEO',
	'Consultoría UX/UI',
	'Consultoría de Diseño Web',
	'Desarrollo Web',
	'Diseño Web',
	'E-commerce',
	'Integración de APIs',
	'Landing Page',
	'Mantenimiento Web',
	'Optimización SEO',
	'Rediseño Web',
];

const SECTIONS = [
	'Quienes Somos',
	'Nuestros Servicios',
	'Proyectos',
	'Contacto',
	'Blog',
	'Testimonios',
	'Equipo',
	'Clientes',
	'Portafolio',
	'Ubicación',
	'Preguntas Frecuentes',
	'Términos y Condiciones',
	'Redes Sociales',
	'Política de Privacidad',
	'Política de Cookies',
	'Aviso Legal',
	'Facturación',
];

const ProjectForm = ({
	isEdit,
	project = {
		title: '',
		description: '',
		services: [],
		otherServiceAmount: 0,
		otherSectionAmount: 0,
		sections: [],
		startDate: '',
		dueDate: '',
		priority: 'Media',
		costs: {
			totalServices: 0,
			totalSections: 0,
			baseRate: 0,
			ivaTax: 0,
			subtotal: 0,
			ivaRetention: 0,
			isrRetention: 0,
			netPayable: 0,
		},
	},
	onChange,
	onSubmit,
	setProject,
	SERVICE_COSTS = {},
	SECTION_COSTS = {},
	coupon,
	setcoupon,
	discount,
	setdiscount,
	couponMsg,
	setcouponMsg,
	validarcoupon,
	onClose,
}) => {
	// Actualiza los costos en tiempo real
	useEffect(() => {
		const totalServicesFromList = (project.services || []).reduce(
			(acc, service) => acc + (SERVICE_COSTS[service] || 0),
			0
		);
		const otherAmount = Number(project.otherServiceAmount) || 0;
		const totalServices = totalServicesFromList + otherAmount;
		const otherSectionAmount = Number(project.otherSectionAmount) || 0;
		const totalSections =
			(project.sections || []).reduce((acc, section) => acc + (SECTION_COSTS[section] || 0), 0) +
			otherSectionAmount;

		const validDiscount = typeof discount === 'number' && discount >= 0 ? discount : 0;
		const netPayable = totalServices + totalSections - validDiscount;
		const baseRate = netPayable / 0.95332923754846;
		const ivaTax = baseRate * 0.16;
		const subtotal = baseRate + ivaTax;
		const ivaRetention = baseRate * 0.10667;
		const isrRetention = baseRate * 0.1;
		const isrTax = baseRate * 0.1;

		setProject((prev) => ({
			...prev, // Copia todas las propiedades existentes del estado anterior (prev) al nuevo estado.
			costs: {
				// Sobrescribe o define la propiedad `costs` en el nuevo estado.
				totalServices, // Estas son variables (probablemente definidas previamente) que se asignan como valores de las propiedades.
				totalSections,
				baseRate,
				ivaTax,
				subtotal,
				ivaRetention,
				isrRetention,
				isrTax,
				netPayable: netPayable >= 0 ? netPayable : 0,
			},
		}));
	}, [
		project.services,
		project.sections,
		project.otherServiceAmount,
		project.otherSectionAmount,
		discount,
		SERVICE_COSTS,
		SECTION_COSTS,
		setProject,
	]);

	// Cambia el submit para llamar a onClose si existe
	const handleSubmit = async (e) => {
		e.preventDefault();
		await onSubmit(e);
		if (onClose) {
			onClose();
		}
	};

	return (
		<form
			id="form-proyecto"
			className="flex flex-col gap-6 md:gap-12 p-4 md:p-0 rounded-lg mb-8 overflow-y-auto"
			onSubmit={handleSubmit}
		>
			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-4 w-full">
					<label className="text-xl text-gray-600 dark:text-gray-300 flex items-center gap-2 font-semibold">
						<FaRegFileAlt className="text-blue-700" />
						Nombre del Proyecto
					</label>
					<input
						type="text"
						name="title"
						placeholder="Título del proyecto"
						value={project.title}
						onChange={onChange}
						required
						className="p-2 rounded border"
					/>
				</div>
				<div className="flex flex-col md:flex-row gap-4 justify-between">
					<div className="flex flex-col md:flex-row gap-8">
						<div className="flex flex-col gap-4">
							<label className="text-xl text-gray-600 dark:text-gray-300 flex items-center gap-2 font-semibold">
								<FaRegCalendarAlt className="text-blue-700" />
								Fecha de Inicio
							</label>
							<input
								type="date"
								name="startDate"
								value={project.startDate}
								onChange={onChange}
								required
								className="p-2 rounded border"
							/>
						</div>
						<div className="flex flex-col gap-4">
							<label className="text-xl text-gray-600 dark:text-gray-300 flex items-center gap-2 font-semibold">
								<FaCalendarAlt className="text-blue-700" />
								Fecha de Término
							</label>
							<input
								type="date"
								name="dueDate"
								value={project.dueDate}
								onChange={onChange}
								required
								className="p-2 rounded border"
							/>
						</div>
					</div>
					<div className="flex flex-col gap-4 w-full md:w-1/2 ">
						<label className="text-xl text-gray-600 dark:text-gray-300 flex items-center gap-2 font-semibold">
							<FaFlag className="text-blue-700" />
							Prioridad
						</label>
						{/* Selector de prioridad con react-icons y colores */}
						<div className="flex gap-2 w-full">
							<label
								className={`flex items-center gap-2 p-2 rounded border w-full cursor-pointer ${
									project.priority === 'Alta' ? 'bg-red-50 border-red-400 text-red-600' : ''
								}`}
							>
								<input
									type="radio"
									name="priority"
									value="Alta"
									checked={project.priority === 'Alta'}
									onChange={onChange}
									className="sr-only"
								/>
								<FaCircle className="text-red-600" />
								<span>Alta</span>
							</label>

							<label
								className={`flex items-center gap-2 p-2 rounded border w-full cursor-pointer  ${
									project.priority === 'Media'
										? 'bg-yellow-50 border-yellow-400 text-yellow-600'
										: ''
								}`}
							>
								<input
									type="radio"
									name="priority"
									value="Media"
									checked={project.priority === 'Media'}
									onChange={onChange}
									className="sr-only"
								/>
								<FaCircle className="text-yellow-500" />
								<span>Media</span>
							</label>

							<label
								className={`flex items-center gap-2 p-2 rounded border w-full cursor-pointer ${
									project.priority === 'Baja' ? 'bg-green-50 border-green-400 text-green-800' : ''
								}`}
							>
								<input
									type="radio"
									name="priority"
									value="Baja"
									checked={project.priority === 'Baja'}
									onChange={onChange}
									className="sr-only"
								/>
								<FaCircle className="text-green-600" />
								<span>Baja</span>
							</label>
						</div>
					</div>
				</div>
			</div>

			{/* Servicios */}
			<div className="flex flex-col gap-8 text-lg">
				<label className="text-xl text-gray-600 dark:text-gray-300 flex items-center gap-2 font-semibold">
					<FaTools className="text-blue-700" />
					Tipo de Servicio
				</label>
				<div className="grid md:grid-cols-3 gap-4 md:ml-6">
					{SERVICES.sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' })).map(
						(service) => (
							<label key={service} className="flex items-center gap-2">
								<input
									className="w-6 h-6 rounded-2xl border-2 hover:border-blue-600  border-blue-600 active:border-blue-600 focus:border-blue-700 caret-blue-600"
									type="checkbox"
									name="services"
									value={service}
									checked={
										Array.isArray(project.services) ? project.services.includes(service) : false
									}
									onChange={(e) => {
										const checked = e.target.checked;
										setProject((prev) => {
											const prevServices = Array.isArray(prev.services) ? prev.services : [];
											if (checked) {
												return { ...prev, services: [...prevServices, service] };
											} else {
												return {
													...prev,
													services: prevServices.filter((s) => s !== service),
												};
											}
										});
									}}
								/>
								<span>
									{service}{' '}
									<span className="text-xs text-gray-500">
										(${SERVICE_COSTS && SERVICE_COSTS[service] ? SERVICE_COSTS[service] : 0})
									</span>
								</span>
							</label>
						)
					)}
					{/* Opción 'Otro' con cantidad */}
					<div className="flex items-center gap-2 col-span-full md:col-span-3">
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								className="w-6 h-6 rounded-2xl"
								name="services"
								value="Otro"
								checked={
									Array.isArray(project.services) ? project.services.includes('Otro') : false
								}
								onChange={(e) => {
									const checked = e.target.checked;
									setProject((prev) => {
										const prevServices = Array.isArray(prev.services) ? prev.services : [];
										if (checked) {
											return { ...prev, services: [...prevServices, 'Otro'] };
										} else {
											return {
												...prev,
												services: prevServices.filter((s) => s !== 'Otro'),
												otherServiceAmount: 0,
											};
										}
									});
								}}
							/>
							<span>Otro</span>
						</label>
						{Array.isArray(project.services) && project.services.includes('Otro') && (
							<input
								type="number"
								min="0"
								step="0.01"
								className="p-2 rounded border-2 hover:border-blue-600  border-blue-600 active:border-blue-600 focus:border-blue-700 caret-blue-600 w-40"
								value={project.otherServiceAmount || 0}
								onChange={(e) =>
									setProject((prev) => ({ ...prev, otherServiceAmount: Number(e.target.value) }))
								}
							/>
						)}
					</div>
					{/* Botón para limpiar todos los servicios */}
					{project.services.length > 0 && (
						<Button
							variant="primary"
							onClick={() => setProject((prev) => ({ ...prev, services: [] }))}
							type="button"
							text="Limpiar"
							icon={FaArrowRotateLeft}
						/>
					)}
				</div>
			</div>
			{/* Secciones */}
			<div className="flex flex-col gap-6 text-lg">
				<label className="text-xl text-gray-600 dark:text-gray-300 flex items-center gap-2 font-semibold">
					<FaLayerGroup className="text-blue-700" />
					Secciones del Proyecto
				</label>
				<div className="grid md:grid-cols-3 gap-4 md:ml-6">
					{SECTIONS.sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' })).map(
						(section) => (
							<div key={section} className="flex items-center gap-2">
								<input
									className="w-6 h-6 rounded-2xl"
									type="checkbox"
									name="sections"
									value={section}
									checked={
										Array.isArray(project.sections) ? project.sections.includes(section) : false
									}
									onChange={(e) => {
										const checked = e.target.checked;
										setProject((prev) => {
											const prevSections = Array.isArray(prev.sections) ? prev.sections : [];
											if (checked) {
												return { ...prev, sections: [...prevSections, section] };
											} else {
												return {
													...prev,
													sections: prevSections.filter((s) => s !== section),
												};
											}
										});
									}}
								/>
								<span>
									{section}{' '}
									<span className="text-xs text-gray-500">(${SECTION_COSTS[section]})</span>
								</span>
							</div>
						)
					)}

					{/* Opción 'Otro' para secciones con cantidad */}
					<div className="flex items-center gap-2 col-span-full md:col-span-3">
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								className="w-6 h-6 rounded-2xl"
								name="sections"
								value="Otro"
								checked={
									Array.isArray(project.sections) ? project.sections.includes('Otro') : false
								}
								onChange={(e) => {
									const checked = e.target.checked;
									setProject((prev) => {
										const prevSections = Array.isArray(prev.sections) ? prev.sections : [];
										if (checked) {
											return { ...prev, sections: [...prevSections, 'Otro'] };
										} else {
											return {
												...prev,
												sections: prevSections.filter((s) => s !== 'Otro'),
												otherSectionAmount: 0,
											};
										}
									});
								}}
							/>
							<span>Otro</span>
						</label>
						{Array.isArray(project.sections) && project.sections.includes('Otro') && (
							<input
								type="number"
								min="0"
								step="0.01"
								className="p-2 rounded border-2 hover:border-blue-600  border-blue-600 active:border-blue-600 focus:border-blue-700 caret-blue-600 w-40"
								value={project.otherSectionAmount || 0}
								onChange={(e) =>
									setProject((prev) => ({ ...prev, otherSectionAmount: Number(e.target.value) }))
								}
							/>
						)}
					</div>
					{/* Botón para limpiar todas las secciones */}
					{project.sections.length > 0 && (
						<Button
							variant="primary"
							onClick={() =>
								setProject((prev) => ({ ...prev, sections: [], otherSectionAmount: 0 }))
							}
							type="button"
							text="Limpiar"
							icon={FaArrowRotateLeft}
						/>
					)}
				</div>
			</div>
			{/* Descripción */}
			<div className="flex flex-col gap-6">
				<label className="text-xl text-gray-600 dark:text-gray-300 flex items-center gap-2 font-semibold">
					<FaAlignLeft className="text-blue-700" />
					Descripción general del Proyecto
				</label>
				<textarea
					name="description"
					placeholder=""
					value={project.description}
					onChange={onChange}
					required
					rows={10}
					className="p-4 md:p-6 rounded border"
				/>
			</div>
			{/* Cupón y totales */}
			<div className="flex flex-col gap-2 items-right justify-center">
				<div
					id="coupon-section"
					className="flex flex-col md:flex-row gap-4 items-end justify-start"
				>
					{/* Cupón */}
					<div className="flex gap-4 flex-col items-start justify-start">
						<label className="text-xl text-gray-600 dark:text-gray-300 flex items-center gap-2 font-semibold mb-6">
							<FaTag className="text-blue-700" />
							Código de cupón
						</label>
						<div className="flex items-center justify-center">
							<input
								className="p-2 md:p-4 rounded border flex-1 h-12 md:w-[320px]"
								type="text"
								name="coupon"
								value={coupon}
								onChange={(e) => setcoupon(e.target.value)}
								placeholder="Ingresa tu cupón"
								onKeyDown={(e) => {
									if (e.key === 'Enter') e.preventDefault();
								}}
							/>

							{/* Botones de Validar y Reiniciar Cupón */}
							<div className="flex items-center justify-end gap-2 mt-2 md:mt-0">
								<Button
									variant="primary"
									type="button"
									onClick={validarcoupon}
									icon={FaCheck}
									text="Validar cupón"
								/>
								<Button
									type="button"
									onClick={() => {
										setcoupon('');
										setdiscount(0);
										setcouponMsg('');
									}}
									variant="secondary"
									text="Reiniciar cupón"
									icon={FaArrowRotateLeft}
								/>
							</div>
						</div>
					</div>
				</div>
				{couponMsg && (
					<span className={discount > 0 ? 'text-green-600' : 'text-red-500'}>{couponMsg}</span>
				)}
			</div>
			{/* Totales */}
			<div className="mt-6 text-base font-semibold flex flex-col justify-center w-full items-end">
				<CostsProjectList costs={project.costs} />
			</div>

			{/* Botones de Acción */}
			<div className="flex items-center justify-center md:justify-end gap-4">
				<Button
					type="submit"
					variant="primary"
					text={isEdit ? 'Actualizar Proyecto' : 'Crear Proyecto'}
					icon={isEdit ? FaArrowsRotate : IoMdAdd}
				/>
			</div>
		</form>
	);
};

export default ProjectForm;
