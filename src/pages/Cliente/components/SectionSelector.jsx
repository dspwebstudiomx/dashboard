import React from 'react';
import Button from '@components/Botones/Button';
import { FaLayerGroup } from 'react-icons/fa6';

const SectionSelector = ({ SECTIONS, SECTION_COSTS, project, setProject }) => {
	return (
		<div className="flex flex-col gap-6 text-lg">
			<label className="text-2xl text-gray-800 dark:text-gray-700 flex items-center gap-2 font-semibold">
				<FaLayerGroup className="text-blue-700" />
				Secciones del Proyecto
			</label>
			<div className="grid md:grid-cols-3 gap-4 md:ml-6 relative pb-12">
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
											return { ...prev, sections: prevSections.filter((s) => s !== section) };
										}
									});
								}}
							/>
							<span>
								{section} <span className="text-xs text-gray-500">(${SECTION_COSTS[section]})</span>
							</span>
						</div>
					)
				)}

				<div className="flex items-center gap-2 col-span-full md:col-span-3">
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							className="w-6 h-6 rounded-2xl"
							name="sections"
							value="Otro"
							checked={Array.isArray(project.sections) ? project.sections.includes('Otro') : false}
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

					{/* Botón movido a posición absoluta en la esquina inferior derecha */}
				</div>

				{Array.isArray(project.sections) && project.sections.length > 0 && (
					<div className="absolute right-0 bottom-0 p-2">
						<Button
							variant="primary"
							onClick={() =>
								setProject((prev) => ({ ...prev, sections: [], otherSectionAmount: 0 }))
							}
							type="button"
							text="Limpiar"
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default SectionSelector;
