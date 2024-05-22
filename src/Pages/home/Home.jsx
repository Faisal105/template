import React, { useEffect, useState } from "react";
import Banner from "../../components/banner/Banner";
import topbanner from "../../assests/top-banner.avif";
import InfoBanner from "../../components/infoBanner";
import Carousel from "../../components/carousel/Carousel";
import { useLoaderData } from "react-router-dom";
import Categories from "../../components/categories/Categories";

const Home = () => {
	const loaderData = useLoaderData();
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// Fetch and set products on initial load
	useEffect(() => {
		setIsLoading(true);
		setProducts(loaderData);
	}, [loaderData]);

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
				<Categories />
			</div>
			<div className="w-full py-8">
				<Carousel products={products} heading="WHAT'S NEW" />
			</div>
			<div className="w-full py-8">
				<Carousel products={products.toReversed()} heading="OUR BET SELLING PRODUCTS" />
			</div>
			<InfoBanner />
		</div>
	);
};

export default Home;
