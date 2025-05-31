import React, { createContext, useContext, useState } from 'react';

const ModalStackContext = createContext();

export const useModalStack = () => useContext(ModalStackContext);

export const ModalStackProvider = ({ children }) => {
	const [stack, setStack] = useState([]);

	const registerModal = (id) => {
		setStack((prev) => [...prev, id]);
	};

	const unregisterModal = (id) => {
		setStack((prev) => prev.filter((modalId) => modalId !== id));
	};

	const getTopModalId = () => stack[stack.length - 1];

	return (
		<ModalStackContext.Provider value={{ registerModal, unregisterModal, getTopModalId }}>
			{children}
		</ModalStackContext.Provider>
	);
};
