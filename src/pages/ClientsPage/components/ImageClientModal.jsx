import React from 'react';
import { FaRegImage } from 'react-icons/fa6';
import { RiDeleteBin6Line } from 'react-icons/ri';

const ImageClientModal = ({ formData, handleImageUpload, handleRemoveImage }) => {
	return (
		<div className="flex flex-col lg:flex-row items-center gap-6">
			{/* Vista previa de la imagen */}
			<div className="flex-shrink-0">
				{(() => {
					let src = 'http://localhost:5000/uploads/avatar_placeholder_large.png';
					// Usar imagePreview solo si no es un blob persistido en el JSON
					if (
						formData.imagePreview &&
						typeof formData.imagePreview === 'string' &&
						!formData.imagePreview.startsWith('blob:')
					) {
						src = formData.imagePreview;
					} else if (formData.image) {
						// Si image es una ruta relativa (empieza con /), anteponer host del servidor;
						// si ya es una URL absoluta (http/https/data:), usar tal cual.
						if (typeof formData.image === 'string') {
							if (formData.image.startsWith('/')) src = `http://localhost:5000${formData.image}`;
							else src = formData.image;
						}
					}
					return (
						<div className="relative group">
							<div className="w-32 h-32 rounded-full border-4 border-gray-200 dark:border-gray-600 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 shadow-lg">
								<img
									src={src}
									alt="Imagen del cliente"
									className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
									onError={(e) => {
										// Fallback al placeholder si la imagen falla en cargar
										e.currentTarget.src = 'http://localhost:5000/uploads/avatar_placeholder_large.png';
									}}
								/>
							</div>
							{formData.image && (
								<div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
									<svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
									</svg>
								</div>
							)}
						</div>
					);
				})()}
			</div>

			{/* Controles de imagen */}
			<div className="flex-1 space-y-4">
				<div className="flex flex-col sm:flex-row gap-4">
					{/* Upload de imagen */}
					<div className="flex-1">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
							{formData.image ? 'Cambiar imagen' : 'Seleccionar imagen'}
						</label>
						<div className="relative">
							<input
								type="file"
								name="file"
								accept="image/*"
								onChange={handleImageUpload}
								className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
							/>
							<div className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 transition-colors bg-gray-50 dark:bg-gray-700">
								<FaRegImage className="text-gray-400 text-xl" />
								<span className="text-gray-600 dark:text-gray-300 text-sm">
									Haz clic o arrastra una imagen aquí
								</span>
							</div>
						</div>
					</div>

					{/* Botón eliminar */}
					<div className="flex items-end">
						<button
							type="button"
							onClick={handleRemoveImage}
							className="flex items-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
							disabled={!formData.image && !formData.imagePreview}
						>
							<RiDeleteBin6Line className="text-lg" />
							<span className="hidden sm:inline">Eliminar</span>
						</button>
					</div>
				</div>

				{/* Información adicional */}
				<div className="text-xs text-gray-500 dark:text-gray-400">
					<p>Formatos soportados: JPG, PNG, GIF. Tamaño máximo: 5MB</p>
				</div>
			</div>
		</div>
	);
};

export default ImageClientModal;
