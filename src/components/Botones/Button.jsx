import clsx from 'clsx';

const VARIANT_CLASSES = {
	blue_1: 'bg-blue-400 hover:bg-blue-500 text-gray-100',
	blue_2: 'bg-blue-500 hover:bg-blue-600 text-gray-100',
	blue_3: 'bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-600',
	blue_4: 'bg-blue-100 hover:bg-blue-200 text-blue-100',
	primary: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200',
	secondary: 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 border border-gray-300 dark:from-gray-700 dark:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-700 dark:text-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200',
	outline: 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 dark:bg-blue-50 dark:text-blue-600 hover:border-blue-700 transition-all duration-200',
	ghost: 'bg-transparent text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 transition-all duration-200',
};

const SIZE_CLASSES = {
	sm: 'px-4 py-2 text-sm font-medium rounded-lg min-w-[120px]',
	md: 'px-6 py-3 text-base font-medium rounded-lg min-w-[160px]',
	lg: 'px-8 py-4 text-lg font-semibold rounded-lg min-w-[200px]',
};

const Button = ({ id, type, text, onClick, icon: Icon, variant = 'primary', size = 'md' }) => {
	const iconClass = clsx(
		'w-5 h-5 transition-transform duration-200 group-hover:scale-110',
		variant === 'primary' ? 'text-white' : 
		variant === 'secondary' ? 'text-gray-600 dark:text-gray-300' : 'text-blue-600'
	);
	const iconSize = 20;

	return (
		<button
			id={id}
			type={type}
			className={clsx(
				'group flex items-center justify-center gap-3 font-medium focus:ring-4 focus:ring-blue-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
				SIZE_CLASSES[size],
				VARIANT_CLASSES[variant]
			)}
			onClick={onClick}
		>
			{Icon && <Icon className={iconClass} size={iconSize} />}
			<span>{text}</span>
		</button>
	);
};

export default Button;
