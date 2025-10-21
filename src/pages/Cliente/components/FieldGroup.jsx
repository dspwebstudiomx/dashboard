import React from 'react';
import { BsCircleFill } from 'react-icons/bs';
// Componente que renderiza un grupo de campos definido en ProjectForm
const FieldGroup = ({ group, fields, project, onChange }) => {
	// Mapas de etiquetas amigables (español) para los campos conocidos
	const FIELD_LABELS = {
		title: 'Título',
		startDate: 'Fecha de inicio',
		dueDate: 'Fecha de término',
		priority: 'Prioridad',
	};

	return (
		<section key={group.title} className="flex flex-col gap-4 w-full">
			<label className="text-xl text-gray-600 dark:text-gray-300 flex items-center gap-2 font-semibold">
				{fields.find((f) => f.name === group.fields[0])?.icon}
				{group.title}
			</label>
			<div className="grid md:grid-cols-2 gap-4">
				{group.fields.map((fname) => {
					const field = fields.find((f) => f.name === fname);
					if (!field) return null;

					// id único por campo
					const id = `field-${field.name}`;
					const labelText = FIELD_LABELS[field.name] || field.placeholder || field.name;

					if (field.type === 'textarea') {
						return (
							<div key={field.name} className="flex flex-col">
								<label
									htmlFor={id}
									className="text-lg text-gray-900 dark:text-gray-300 font-medium"
								>
									{labelText}
								</label>
								<textarea
									id={id}
									name={field.name}
									placeholder={field.placeholder || ''}
									value={project[field.name]}
									onChange={onChange}
									required={field.required}
									rows={10}
									className="p-4 md:p-6 rounded border w-full"
								/>
							</div>
						);
					}

					if (field.type === 'radio-group') {
						return (
							<div key={field.name} className="flex flex-col gap-2">
								<label className="text-gray-900 text-lg dark:text-gray-300 font-medium">
									{labelText}
								</label>
								<div className="flex gap-2 w-full">
									{field.options.map((opt) => {
										const isSelected = project[field.name] === opt;
										let colorClass;
										if (opt === 'Alta') {
											colorClass = isSelected ? 'text-red-600' : 'text-red-400';
										} else if (opt === 'Media') {
											colorClass = isSelected ? 'text-yellow-600' : 'text-yellow-400';
										} else {
											colorClass = isSelected ? 'text-green-800' : 'text-green-400';
										}
										return (
											<label
												key={opt}
												className={`flex items-center gap-2 border w-full cursor-pointer px-4 py-2 rounded-lg ${
													isSelected
														? opt === 'Alta'
															? 'bg-red-50 border-red-400 text-red-600'
															: opt === 'Media'
															? 'bg-yellow-50 border-yellow-400 text-yellow-600'
															: 'bg-green-50 border-green-400 text-green-800'
														: ''
												}`}
											>
												{/* Icono de círculo con color según prioridad */}
												<BsCircleFill className={`${colorClass} shrink-0`} />
												<span>{opt}</span>
												<input
													id={`${id}-${opt}`}
													type="radio"
													name={field.name}
													value={opt}
													checked={project[field.name] === opt}
													onChange={onChange}
													className="sr-only"
												/>
											</label>
										);
									})}
								</div>
							</div>
						);
					}

					// default: input
					return (
						<div key={field.name} className="flex flex-col">
							<label htmlFor={id} className="text-sm text-gray-700 dark:text-gray-300 font-medium">
								{labelText}
							</label>
							<input
								id={id}
								type={field.type}
								name={field.name}
								placeholder={field.placeholder || ''}
								value={project[field.name]}
								onChange={onChange}
								required={field.required}
								className="py-2 px-4 rounded-lg border dark:border-blue-800"
							/>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default FieldGroup;
