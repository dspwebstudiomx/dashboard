import clsx from 'clsx';

const VARIANT_CLASSES = {
	blue_1: 'bg-blue-400 hover:bg-blue-500 text-gray-100',
	blue_2: 'bg-blue-500 hover:bg-blue-600 text-gray-100',
	blue_3: 'bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-600',
	blue_4: 'bg-blue-100 hover:bg-blue-200 text-blue-100',
	primary: 'bg-blue-600 hover:bg-blue-700 text-white',
	secondary: 'bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-600',
	outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 dark:bg-blue-50',
	ghost: 'bg-transparent text-blue-600 hover:bg-blue-50',
};

const SIZE_CLASSES = {
	sm: 'px-3 py-1 text-sm md:h-9 md:w-[120px] text-base md:text-sm',
	md: 'px-4 py-2 text-base h-18 md:h-12 md:w-[180px] text-base md:text-sm',
	lg: 'px-6 py-3 text-lg  md:h-15 md:w-[190px] text-base md:text-sm',
};

const Button = ({ id, type, text, onClick, icon: Icon, variant = 'primary', size = 'md' }) => {
	const iconClass = clsx('w-5 h-5', variant === 'primary' ? 'text-white' : 'text-white-100');
	const iconSize = 24;

	return (
		<button
			id={id}
			type={type}
			className={clsx(
				'md:ml-4 w-full rounded-lg transition ml-0 flex items-center justify-center gap-2',
				SIZE_CLASSES[size],
				VARIANT_CLASSES[variant]
			)}
			onClick={onClick}
		>
			{Icon && <Icon className={iconClass} size={iconSize} />}
			{text}
		</button>
	);
};

export default Button;
