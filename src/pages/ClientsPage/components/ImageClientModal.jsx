import React from 'react';
import { FaRegImage } from 'react-icons/fa6';
import { RiDeleteBin6Line } from 'react-icons/ri';

const ImageClientModal = ({ formData, handleImageUpload, handleRemoveImage }) => {
	return (
		<div
			id="image-group"
			className="form-group flex flex-col md:flex-row items-center md:items-end gap-6 mt-12 xl:mt-6 w-full"
		>
			<div className="flex flex-col md:flex-row items-center gap-8">
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
						<img
							src={src}
							alt="Imagen del cliente"
							className="w-24 h-24 objectm-cover border-2 border-gray-200 dark:border-gray-700 rounded-full"
							onError={(e) => {
								// Fallback al placeholder si la imagen falla en cargar
								e.currentTarget.src = 'http://localhost:5000/uploads/avatar_placeholder_large.png';
							}}
						/>
					);
				})()}
			</div>
			<div className="flex flex-col gap-4 justify-center items-start">
				<label className="text-gray-700 dark:text-gray-300 flex items-start gap-4">
					<FaRegImage className="text-blue-900 text-2xl dark:text-blue-500" />
					<span className="text-lg">{formData.image ? 'Cambiar imagen' : 'Agregar imagen'}</span>
				</label>
				<input
					type="file"
					name="file"
					accept="image/*"
					onChange={handleImageUpload}
					className="p-2 rounded-md dark:bg-gray-800 border-0 dark:text-gray-300 outline-none w-full md:w-[310px]"
				/>
			</div>
			<button
				type="button"
				onClick={handleRemoveImage}
				className="flex gap-2 bg-red-500 border-2 border-red-700 hover:bg-red-400 text-white text-base w-full md:w-12 h-12 rounded-md place-items-center justify-center"
			>
				<RiDeleteBin6Line className="text-white text-2xl" />
				<span className="md:hidden">Eliminar imagen</span>
			</button>
		</div>
	);
};

export default ImageClientModal;
