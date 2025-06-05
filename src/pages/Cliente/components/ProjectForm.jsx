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
		sections: [],
		startDate: '',
		dueDate: '',
		priority: 'Media',
	},
	onChange,
	onSubmit,
	setProject,
	SERVICE_COSTS = {},
	SECTION_COSTS = {},
	subtotalCost = 0,
	ivaTax = 0,
	isrTax = 0,
	totalCost = 0,
	cupon,
	setCupon,
	descuento,
	setDescuento,
	cuponMsg,
	setCuponMsg,
	validarCupon,
	onClose,
}) => {
	// Cambia el submit para llamar a onClose si existe
	const handleSubmit = async (e) => {
		e.preventDefault();
		await onSubmit(e);
		if (onClose) onClose();
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
						className="p-2 rounded border dark:bg-gray-900 bg-gray-100 dark:text-gray-200"
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
								className="p-2 rounded border  dark:bg-gray-900 bg-gray-100 dark:text-gray-200"
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
								className="p-2 rounded border  dark:bg-gray-900 bg-gray-100 dark:text-gray-200"
							/>
						</div>
					</div>
					<div className="flex flex-col gap-4 w-full md:w-1/2 ">
						<label className="text-xl text-gray-600 dark:text-gray-300 flex items-center gap-2 font-semibold">
							<FaFlag className="text-blue-700" />
							Prioridad
						</label>
						<select
							name="priority"
							value={project.priority}
							onChange={onChange}
							className="p-2 rounded border w-full  dark:bg-gray-900 bg-gray-100 dark:text-gray-200"
						>
							<option value="Alta">Alta</option>
							<option value="Media">Media</option>
							<option value="Baja">Baja</option>
						</select>
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
									className="w-6 h-6 rounded-2xl"
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
					{/* Botón para limpiar todas las secciones */}
					{project.sections.length > 0 && (
						<Button
							variant="primary"
							onClick={() => setProject((prev) => ({ ...prev, sections: [] }))}
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
					className="p-4 md:p-6 rounded border min-h-[220px] dark:bg-gray-900 bg-gray-100 dark:text-gray-200"
				/>
			</div>
			{/* Cupón y totales */}
			<div className="flex flex-col gap-2">
				<div
					id="cupon-section"
					className="flex flex-col md:flex-row gap-4 items-center justify-end"
				>
					<div className="flex gap-4 flex-col items-start justify-start">
						<label className="text-xl text-gray-600 dark:text-gray-300 flex items-center gap-2 font-semibold">
							<FaTag className="text-blue-700" />
							Código de cupón
						</label>
						<input
							className="p-2 md:p-4 rounded border flex-1 h-12  dark:bg-gray-900 bg-gray-100 dark:text-gray-200 md:w-[320px]"
							type="text"
							name="cupon"
							value={cupon}
							onChange={(e) => setCupon(e.target.value)}
							placeholder="Ingresa tu cupón"
							onKeyDown={(e) => {
								if (e.key === 'Enter') e.preventDefault();
							}}
						/>
					</div>
					<div className="flex items-center justify-end gap-2 mt-2">
						<Button
							variant="primary"
							type="button"
							onClick={validarCupon}
							icon={FaCheck}
							text="Validar cupón"
						/>
						<Button
							type="button"
							onClick={() => {
								setCupon('');
								setDescuento(0);
								setCuponMsg('');
							}}
							variant="secondary"
							text="Reiniciar cupón"
							icon={FaArrowRotateLeft}
						/>
					</div>
				</div>
				{cuponMsg && (
					<span className={descuento > 0 ? 'text-green-600' : 'text-red-500'}>{cuponMsg}</span>
				)}
			</div>
			{/* Totales */}
			<div className="mt-6 text-lg font-semibold flex flex-col justify-center w-full items-end gap-4">
				<div>
					Subtotal:{' '}
					<span className="font-semibold text-base">${(subtotalCost ?? 0).toFixed(2)}</span>
				</div>
				<div>
					(+) Impuestos:{' '}
					<span className="font-semibold text-base">${(ivaTax ?? 0).toFixed(2)}</span>
				</div>
				<div>
					(+) I.S.R.: <span className="font-semibold text-base">${(isrTax ?? 0).toFixed(2)}</span>
				</div>
				<div>
					<span className="font-bold">Total: ${(totalCost ?? 0).toFixed(2)}</span>
				</div>
			</div>

			{/* Botones de Acción */}
			<div className="flex items-center justify-center md:justify-end gap-4">
				{isEdit ? (
					<Button
						type="button"
						variant="primary"
						text="Actualizar Proyecto"
						icon={FaArrowsRotate}
						onClick={onSubmit}
					/>
				) : (
					<Button type="submit" variant="primary" text="Crear Proyecto" icon={IoMdAdd} />
				)}
			</div>
		</form>
	);
};

export default ProjectForm;
