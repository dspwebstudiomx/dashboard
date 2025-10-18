import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import CloseButton from './Botones/CloseButton';
import { FaArrowDown } from 'react-icons/fa';
import { FaArrowUp } from 'react-icons/fa6';
import { useModalStack } from '@context/ModalStackContext';

const Modal = ({ isOpen, onClose, children, title }) => {
	const contentRef = useRef(null);
	const [hasOverflow, setHasOverflow] = useState(false);
	const [modalId] = useState(() => Math.random().toString(36).substr(2, 9));
	const { registerModal, unregisterModal, getTopModalId } = useModalStack();

	useEffect(() => {
		if (isOpen) {
			registerModal(modalId);
			// bloquear scroll del body y compensar ancho del scrollbar para evitar 'layout shift'
			const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
			document.body.style.overflow = 'hidden';
			if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
			document.body.classList.add('modal-open');
		} else {
			unregisterModal(modalId);
			document.body.style.overflow = '';
			document.body.style.paddingRight = '';
			document.body.classList.remove('modal-open');
		}
		return () => {
			unregisterModal(modalId);
			document.body.style.overflow = '';
			document.body.style.paddingRight = '';
			document.body.classList.remove('modal-open');
		};
		// eslint-disable-next-line
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

	const isTopModal = getTopModalId() === modalId;

	const scrollToTop = () => {
		if (isTopModal && contentRef.current) {
			contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	const scrollToBottom = () => {
		if (isTopModal && contentRef.current) {
			contentRef.current.scrollTo({ top: contentRef.current.scrollHeight, behavior: 'smooth' });
		}
	};

	return (
		<section
			className="fixed inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center 2xl:min-w-screen-2xl"
			style={{ zIndex: 50 + (isTopModal ? 1 : 0) }}
		>
			<div className="relative flex items-center">
				<article
					className={`bg-white rounded-xl shadow-lg ${
						hasOverflow ? 'w-auto max-w-[80vw] md:max-h-[90vh]' : 'w-[70vw] max-h-[90vh]'
					} max-h-[89vh] md:max-w-full p-6 md:p-12 xl:p-12 border-2 
      border-blue-400 dark:bg-gray-800 dark:border-gray-500 flex flex-col gap-6 justify-between`}
				>
					<div className="flex justify-end">
						<CloseButton onClick={onClose} />
					</div>
					{title && (
						<h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 md:mb-12 text-center">
							{title}
						</h2>
					)}
					<div
						ref={contentRef}
						className="flex-1 overflow-y-auto min-h-0 max-h-[65vh] md:max-h-[70vh] md:px-0 md:pr-8"
					>
						{children}
					</div>
				</article>
				{hasOverflow && isTopModal && (
					<aside className="hidden md:flex bg-gray-100 border-r-2 border-gray-500 flex-col justify-center gap-4 dark:bg-gray-700 dark:border-gray-600 py-8 px-4 z-50 rounded-r-xl shadow-lg h-full">
						<button
							className="bg-blue-500 text-white p-2 w-16 h-16 shadow-lg hover:bg-blue-600 transition flex items-center justify-center rounded-full border border-blue-700"
							onClick={scrollToTop}
						>
							<FaArrowUp size={28} />
						</button>
						<button
							className="bg-blue-500 text-white p-2 w-16 h-16 shadow-lg hover:bg-blue-600 transition flex items-center justify-center rounded-full border border-blue-700"
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
