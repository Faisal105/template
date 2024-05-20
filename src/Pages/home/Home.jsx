import React from "react";
import Banner from "../../components/banner/Banner";
import topbanner from "../../assests/top-banner.avif";
const Home = () => {
	return (
		<div className="container mx-auto px-4 py-8">
			<Banner imageUrl={topbanner} alt="Banner Image" />
		</div>
	);
};

export default Home;
