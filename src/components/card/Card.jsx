const Card = ({ children, customClasses = "", ...props }) => {
	const cardClasses = `max-w-sm p-6 border border-gray-200 rounded-md shadow hover:shadow-lg flex flex-col justify-center items-center ${customClasses}`;
	return (
		<a href="#" className={cardClasses} {...props}>
			{children}
		</a>
	);
};
export default Card;
