import React from "react";
import Banner from "../../components/banner/Banner";
import topbanner from "../../assests/top-banner.avif";
import InfoBanner from "../../components/infoBanner";
import Carousel from "../../components/carousel/Carousel";

const Home = () => {
	const images = [
		"https://via.placeholder.com/800x400?text=Image+1",
		"https://via.placeholder.com/800x400?text=Image+2",
		"https://via.placeholder.com/800x400?text=Image+3",
		"https://via.placeholder.com/800x400?text=Image+4",

		"https://via.placeholder.com/800x400?text=Image+5",
		"https://via.placeholder.com/800x400?text=Image+6",
		"https://via.placeholder.com/800x400?text=Image+7",
		"https://via.placeholder.com/800x400?text=Image+8",
	];

	return (
		<div className="container mx-auto px-4 py-8 space-y-3">
			<Banner imageUrl={topbanner} alt="Banner Image" />
			<div className="w-full py-8">
				<Carousel images={images} heading="WHAT'S NEW" />
			</div>
			<div className="w-full py-8">
				<Carousel images={images} heading="OUR BET SELLING PRODUCTS" />
			</div>
			<InfoBanner />
		</div>
	);
};

export default Home;
