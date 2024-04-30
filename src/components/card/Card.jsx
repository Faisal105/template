const Card = ({ children, customClasses = "", ...props }) => {
	const cardClasses =
		"block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700";

	return (
		<a href="#" className={`${cardClasses} ${customClasses}`} {...props}>
			{children}
		</a>
	);
};
export default Card;
