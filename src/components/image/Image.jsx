const Image = ({ src, alt, customClasses, ...props }) => {
	const imageClasses = `rounded-lg object-contain ${customClasses}`;
	return <img src={src} alt={alt} className={imageClasses} {...props} />;
};

export default Image;
