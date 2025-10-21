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
import FieldGroup from './FieldGroup';
import ServiceSelector from './ServiceSelector';
import SectionSelector from './SectionSelector';
import CouponSection from './CouponSection';

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
	'Otro',
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
	// Campos y grupos para renderizado dinámico (similar a ClientFormFields)
	const fields = [
		{
			name: 'title',
			icon: <FaRegFileAlt className="text-blue-700" />,
			type: 'text',
			placeholder: 'Título del proyecto',
			required: true,
		},
		{
			name: 'startDate',
			icon: <FaRegCalendarAlt className="text-blue-700" />,
			type: 'date',
			placeholder: 'Fecha de inicio',
			required: true,
		},
		{
			name: 'dueDate',
			icon: <FaCalendarAlt className="text-blue-700" />,
			type: 'date',
			placeholder: 'Fecha de término',
			required: true,
		},
		{
			name: 'priority',
			icon: <FaFlag className="text-blue-700" />,
			type: 'radio-group',
			options: ['Alta', 'Media', 'Baja'],
			required: true,
		},
	];

	const groups = [
		{
			title: 'Información general',
			fields: ['title', 'startDate', 'dueDate', 'priority'],
		},
	];
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
			{/* Renderizar grupos y campos dinámicamente */}
			<div className="flex flex-col gap-8">
				{groups.map((group) => (
					<FieldGroup
						key={group.title}
						group={group}
						fields={fields}
						project={project}
						onChange={onChange}
					/>
				))}
			</div>

			{/* Servicios */}
			<ServiceSelector
				SERVICES={SERVICES}
				SERVICE_COSTS={SERVICE_COSTS}
				project={project}
				setProject={setProject}
			/>
			{/* Secciones */}
			<SectionSelector
				SECTIONS={SECTIONS}
				SECTION_COSTS={SECTION_COSTS}
				project={project}
				setProject={setProject}
			/>
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
			<CouponSection
				coupon={coupon}
				setcoupon={setcoupon}
				validarcoupon={validarcoupon}
				setdiscount={setdiscount}
				setcouponMsg={setcouponMsg}
				couponMsg={couponMsg}
			/>
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
