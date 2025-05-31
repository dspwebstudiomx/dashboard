import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import CloseButton from './Botones/CloseButton';
import { FaArrowDown } from 'react-icons/fa';
import { FaArrowUp } from 'react-icons/fa6';

const Modal = ({ isOpen, onClick, children, title }) => {
	const contentRef = useRef(null);
	const [hasOverflow, setHasOverflow] = useState(false);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'; // Evita scroll en la ventana principal
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	useEffect(() => {
		const checkOverflow = () => {
			if (contentRef.current) {
				setHasOverflow(contentRef.current.scrollHeight > contentRef.current.clientHeight);
			}
		};
		checkOverflow();
		window.addEventListener('resize', checkOverflow);
		return () => window.removeEventListener('resize', checkOverflow);
	}, [children, isOpen]);

	if (!isOpen) return null;

	const scrollToTop = () => {
		if (contentRef.current) {
			contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	const scrollToBottom = () => {
		if (contentRef.current) {
			contentRef.current.scrollTo({ top: contentRef.current.scrollHeight, behavior: 'smooth' });
		}
	};

	return (
		<section className="fixed inset-0 bg-black/40 dark:bg-black/80 flex items-center justify-center z-50">
			<div className="relative flex items-center">
				<article
					className={`bg-white rounded-xl shadow-lg ${
						hasOverflow ? 'w-[90vw] md:w-[90vw]' : 'w-[90vw] md:w-[60vw]'
					} max-h-[89vh] md:max-w-full p-6 md:p-12 xl:p-12 border-2 
      border-blue-400 dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-6 justify-between`}
				>
					{/* Botón cerrar modal */}
					<div className="flex justify-end">
						<CloseButton onClick={onClick} />
					</div>
					{/* Título del modal */}
					{title && (
						<h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
							{title}
						</h2>
					)}

					{/* Contenido dinámico */}
					<div ref={contentRef} className="flex-1 overflow-y-auto min-h-0 md:pr-12">
						{children}
					</div>
				</article>
				{hasOverflow && (
					<aside className="flex flex-col justify-center gap-4 dark:bg-gray-800 p-4 z-50 rounded-r-xl shadow-lg h-full">
						{/* Botones para subir y bajar la información que se encuentra dentro del modal */}
						<button
							className="bg-blue-500 text-white p-2 w-16 h-16 shadow-lg hover:bg-blue-600 transition flex items-center justify-center rounded-full"
							onClick={scrollToTop}
						>
							<FaArrowUp size={28} />
						</button>
						<button
							className="bg-blue-500 text-white p-2 w-16 h-16 shadow-lg hover:bg-blue-600 transition flex items-center justify-center rounded-full"
							onClick={scrollToBottom}
						>
							<FaArrowDown size={28} />
						</button>
					</aside>
				)}
			</div>
		</section>
	);
};

Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	children: PropTypes.node.isRequired,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string,
};

export default Modal;
