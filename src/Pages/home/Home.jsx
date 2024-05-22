import React from "react";
import Banner from "../../components/banner/Banner";
import topbanner from "../../assests/top-banner.avif";
import InfoBanner from "../../components/infoBanner";
import Carousel from "../../components/carousel";

const Home = () => {
	return (
		<div className="container mx-auto px-4 py-8 space-y-3">
			<Banner imageUrl={topbanner} alt="Banner Image" />
			<Carousel />
			<InfoBanner />
		</div>
	);
};

export default Home;
