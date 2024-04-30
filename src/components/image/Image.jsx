const Image = ({ src, alt, customClasses, ...props }) => {
	const imageClasses = "max-w-full h-48 rounded-lg object-contain";
	return (
		<img
			src={src}
			alt={alt}
			className={`${imageClasses} ${customClasses}`}
			{...props}
		/>
	);
};

export default Image;
