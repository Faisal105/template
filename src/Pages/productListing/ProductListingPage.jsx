import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory hook
import Card from "../../components/card/Card";
import Text from "../../components/text/Text";
import Heading from "../../components/heading/Heading";
import Image from "../../components/image/Image";
import Pagination from "../../components/pagination/Pagination";
import Button from "../../components/button/Button";
import Filter from "../../components/filter/Filter";
import { filterOptions } from "../../components/filter/FilterOptions";

const ProductListingPage = () => {
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(8);
	const navigate = useNavigate(); // Initialize useHistory hook
	const [selectedFilter, setSelectedFilter] = useState("");
	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			const response = await fetch("https://fakestoreapi.com/products/");
			const data = await response.json();
			console.log(data);
			setProducts(data);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	const trimTitle = (title) => {
		return title.length > 17 ? title.substring(0, 17) + "..." : title;
	};

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(products.length / itemsPerPage);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handleBuyNow = (productId) => {
		// Navigate to ProductDescriptionPage with specific product ID
		navigate(`/ProductDescriptionPage/${productId}`);
		console.log(`Buying product with ID: ${productId}`);
	};
	const handleFilterSelect = (value) => {
		// Apply sorting/filtering logic based on the selected filter
		setSelectedFilter(value);
		if (value === "priceHighToLow") {
			// Sort products by price in descending order
			const sortedProducts = [...products].sort((a, b) => b.price - a.price);
			setProducts(sortedProducts);
		} else if (value === "priceLowToHigh") {
			// Sort products by price in ascending order
			const sortedProducts = [...products].sort((a, b) => a.price - b.price);
			setProducts(sortedProducts);
		} else if (value === "category") {
			// Apply category-based filtering logic
			// Example: Filter products by category (e.g., Men, Women, Children)
			// Implement your specific logic here
		} else if (value === "ratingHighToLow") {
			// Apply rating-based filtering logic
			// Example: Filter products by rating (highest to lowest)
			// Implement your specific logic here
		} else if (value === "ratingLowToHigh") {
			// Apply rating-based filtering logic
			// Example: Filter products by rating (lowest to highest)
			// Implement your specific logic here
		}
	};

	return (
		<>
			<>
				{Object.entries(filterOptions).map(([key, options]) => (
					<Filter key={key} options={options} onSelect={handleFilterSelect} />
				))}
			</>

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
								onClick={() => handleBuyNow(product.id)} // Pass productId to handleBuyNow function
							/>
						</div>
					</Card>
				))}
			</div>
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
