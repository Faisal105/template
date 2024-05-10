import React, { useState, useEffect } from "react";
import { useNavigate, useLoaderData, useNavigation } from "react-router-dom";
import Card from "../../components/card/Card";
import Text from "../../components/text/Text";
import Heading from "../../components/heading/Heading";
import Image from "../../components/image/Image";
import Pagination from "../../components/pagination/Pagination";
import Button from "../../components/button/Button";
import Filter from "../../components/filter/Filter";
import Loader from "../../components/loader/Loader";
import { filterOptions } from "../../components/filter/FilterOptions";

const ProductListingPage = () => {
	const loaderData = useLoaderData();
	const [originalProducts, setOriginalProducts] = useState([]);
	const [products, setProducts] = useState([]); // Initialize products with an empty array
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();
	const [selectedFilter, setSelectedFilter] = useState("");
	const navigation = useNavigation();

	useEffect(() => {
		setOriginalProducts(loaderData);
		setProducts(loaderData);
	}, [loaderData]);

	const trimTitle = (title) => {
		return title.length > 17 ? title.substring(0, 17) + "..." : title;
	};

	const itemsPerPage = 8;
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	// Check if products is defined before calling slice method
	const currentItems = products
		? products.slice(indexOfFirstItem, indexOfLastItem)
		: [];
	const totalPages = Math.ceil(products.length / itemsPerPage);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handleBuyNow = (productId) => {
		navigate(`/ProductDescriptionPage/${productId}`);
		console.log(`Buying product with ID: ${productId}`);
	};

	const handleFilterSelect = (value) => {
		setSelectedFilter(value);
		let sortedProducts = [...originalProducts];
		if (value === "priceHighToLow") {
			sortedProducts.sort((a, b) => b.price - a.price);
		} else if (value === "priceLowToHigh") {
			sortedProducts.sort((a, b) => a.price - b.price);
		}
		setProducts(sortedProducts);
	};

	return (
		<>
			{Object.entries(filterOptions).map(([key, options]) => (
				<Filter key={key} options={options} onSelect={handleFilterSelect} />
			))}
			{navigation.state === "loading" ? (
				<Loader />
			) : (
				<div className="m-5 grid grid-cols-2 md:grid-cols-4 gap-2">
					{currentItems.map((product) => (
						<Card key={product.id}>
							<Image
								src={product.image}
								alt={product.title}
								customClasses="max-w-full h-48"
							/>
							<div>
								<Heading>{trimTitle(product.title)}</Heading>
								<Text>category: {product.category}</Text>
								<Text>price: ${product.price}</Text>
								<Button
									label="Buy Now"
									buttonType="secondary"
									customClasses="m-2"
									onClick={() => handleBuyNow(product.id)}
								/>
							</div>
						</Card>
					))}
				</div>
			)}
			<div className="flex justify-center mt-4">
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			</div>
		</>
	);
};

export default ProductListingPage;
export const ProductListingPageLoaders = async () => {
	try {
		const response = await fetch("https://fakestoreapi.com/products/");
		const data = await response.json();
		return data;
		console.log("data is coming", data);
	} catch (error) {
		throw Error("No Data Found");
	}	
};
