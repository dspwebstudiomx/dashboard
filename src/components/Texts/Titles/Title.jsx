import React from 'react';

export const Title = ({ level = 1, children }) => {
	const Tag = `h${level}`;
	const classNames = [
		'text-4xl font-bold',
		'text-3xl font-semibold',
		'text-2xl font-medium',
		'text-xl font-normal',
		'text-lg font-light',
		'text-base font-thin',
	];
	return <Tag className={classNames[level - 1] || classNames[0]}>{children}</Tag>;
};
