import React from 'react';
import { Title } from '../../components/Texts/Titles/Title';
const StyleGuide = () => {
	return (
		<div id="style-guide" className="bg-gray-200 min-h-[100vh] grid grid-cols-12">
			{/* Titulos */}
			<div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2 p p-4">
				<Title level={1}>Título H1</Title>
				<Title level={2}>Título H2</Title>
				<Title level={3}>Título H3</Title>
				<Title level={4}>Título H4</Title>
				<Title level={5}>Título H5</Title>
				<Title level={6}>Título H6</Title>
			</div>
		</div>
	);
};

export default StyleGuide;
