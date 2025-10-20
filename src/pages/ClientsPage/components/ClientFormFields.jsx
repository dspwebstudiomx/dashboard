import React from 'react';
import { FaUserAlt, FaFileAlt, FaGlobe } from 'react-icons/fa';

import {
	FaAddressCard,
	FaBuilding,
	FaEnvelope,
	FaPhone,
	FaUser,
	FaFacebook,
	FaXTwitter,
	FaInstagram,
	FaLinkedinIn,
	FaTrash,
} from 'react-icons/fa6';

const fields = [
	{
		name: 'fullName',
		icon: <FaUserAlt />,
		type: 'text',
		placeholder: 'Nombre(s)',
		required: true,
	},
	{
		name: 'lastName',
		icon: <FaUserAlt />,
		type: 'text',
		placeholder: 'Apellido Paterno',
		required: true,
	},
	{
		name: 'lastName2',
		icon: <FaUser />,
		type: 'text',
		placeholder: 'Apellido Materno',
	},
	{
		name: 'email',
		icon: <FaEnvelope />,
		type: 'email',
		placeholder: 'Correo electrónico',
		required: true,
	},
	{
		name: 'phoneNumber',
		icon: <FaPhone />,
		type: 'tel',
		placeholder: 'Teléfono',
		required: true,
	},
	{
		name: 'address',
		icon: <FaAddressCard />,
		type: 'text',
		placeholder: 'Dirección',
	},
	{
		name: 'company',
		icon: <FaBuilding />,
		type: 'text',
		placeholder: 'Empresa',
		required: true,
	},
	{
		name: 'project',
		icon: <FaFileAlt />,
		type: 'text',
		placeholder: 'Proyecto',
	},
	{ name: 'rfc', icon: <FaFileAlt />, type: 'text', placeholder: 'RFC' },
	{ name: 'curp', icon: <FaFileAlt />, type: 'text', placeholder: 'CURP' },
	{ name: 'website', icon: <FaGlobe />, type: 'url', placeholder: 'Sitio web' },
	{
		name: 'facebook',
		icon: <FaFacebook />,
		type: 'url',
		placeholder: 'Facebook',
	},
	{
		name: 'twitter',
		icon: <FaXTwitter />,
		type: 'url',
		placeholder: 'Twitter',
	},
	{
		name: 'instagram',
		icon: <FaInstagram />,
		type: 'url',
		placeholder: 'Instagram',
	},
	{
		name: 'linkedin',
		icon: <FaLinkedinIn />,
		type: 'url',
		placeholder: 'LinkedIn',
	},
];

const ClientFormFields = ({ formData, handleChange, columns = { base: 1, md: 2, xl: 3 } }) => {
	// Definir grupos por especialidad
	const groups = [
		{
			title: 'Información personal',
			fields: ['fullName', 'lastName', 'lastName2', 'curp'],
			columns: { base: 1, md: 2, xl: 4 },
		},
		{
			title: 'Contacto',
			fields: ['email', 'phoneNumber', 'address', 'website'],
			columns: { base: 1, md: 2, xl: 4 },
		},
		{
			title: 'Empresa y proyecto',
			fields: ['company', 'project', 'rfc'],
		},
		{
			title: 'Redes sociales',
			fields: ['facebook', 'twitter', 'instagram', 'linkedin'],
			columns: { base: 1, md: 2, xl: 4 },
		},
	];

	const getField = (name) => fields.find((f) => f.name === name);

	const breakpointMap = {
		base: '',
		sm: 'sm',
		md: 'md',
		lg: 'lg',
		xl: 'xl',
		'2xl': '2xl',
	};

	const gridClassesFromColumns = (colCfg) => {
		// colCfg can be a number or an object { base:1, md:2 }
		if (!colCfg) colCfg = columns;
		if (typeof colCfg === 'number') return `grid-cols-${colCfg}`;
		// build classes
		return Object.entries(colCfg)
			.map(([bp, n]) => {
				const prefix = bp === 'base' ? '' : `${breakpointMap[bp]}:`;
				return `${prefix}grid-cols-${n}`;
			})
			.join(' ');
	};

	return (
		<div className="flex flex-col gap-8">
			{groups.map((group) => (
				<section
					key={group.title}
					aria-labelledby={`group-${group.title}`}
					className="bg-white dark:bg-gray-800 p-4 rounded-md dark:border-2 dark:border-gray-700"
				>
					<h3
						id={`group-${group.title}`}
						className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-8"
					>
						{group.title}
					</h3>
					<div className={`grid ${gridClassesFromColumns(group.columns || columns)} gap-8`}>
						{group.fields.map((fieldName) => {
							const field = getField(fieldName);
							if (!field) return null;
							const { name, icon, type, placeholder, required } = field;
							const id = `client-field-${name}`;
							const labelText = placeholder || name;
							return (
								<div key={name} className="form-group flex flex-col gap-2">
									<label
										htmlFor={id}
										className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-200 my-4"
									>
										{React.cloneElement(icon, {
											className: 'text-blue-800 text-3xl dark:text-blue-500',
										})}
										<span>{labelText}</span>
									</label>
									<input
										id={id}
										type={type}
										name={name}
										value={formData[name] || ''}
										onChange={handleChange}
										placeholder={placeholder}
										className="flex-1 p-2 border rounded-md bg-white text-gray-800 dark:bg-gray-800 dark:border-blue-700 dark:text-gray-200 focus:border-blue-700 focus:border-2 focus:outline-none active:border-blue-700"
										required={required}
									/>
								</div>
							);
						})}
					</div>
				</section>
			))}
		</div>
	);
};

export default ClientFormFields;
