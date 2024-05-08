import React, { useState, useEffect } from "react";
import { useNavigate, useLoaderData, useNavigation } from "react-router-dom"; // Import useHistory hook
import Card from "../../components/card/Card";
import Text from "../../components/text/Text";
import Heading from "../../components/heading/Heading";
import Image from "../../components/image/Image";
import Pagination from "../../components/pagination/Pagination";
import Button from "../../components/button/Button";
import Filter from "../../components/filter/Filter";
import Loader from "../../components/loader/Loader";

const ProductListingPage = () => {
	const loaderData = useLoaderData();
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate(); // Initialize useHistory hook
	const [selectedFilter, setSelectedFilter] = useState("");
	const navigation = useNavigation();
	useEffect(() => {
		setProducts(loaderData);
	}, [loaderData]);

	const trimTitle = (title) => {
		return title.length > 17 ? title.substring(0, 17) + "..." : title;
	};

	const itemsPerPage = 8;
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
		// Example logic: sort products by price
		if (value === "price") {
			const sortedProducts = [...products].sort((a, b) => a.price - b.price);
			setProducts(sortedProducts);
		}
		// Example logic: sort products alphabetically
		else if (value === "alphabetically") {
			const sortedProducts = [...products].sort((a, b) =>
				a.title.localeCompare(b.title)
			);
			setProducts(sortedProducts);
		}
		// Example logic: filter products by category
		else if (value === "category") {
			// Implement category filtering logic here
		}
	};

	return (
		<>
			<Filter
				options={[
					{ label: "Price", value: "price" },
					{ label: "Category", value: "category" },
					{ label: "Alphabetically", value: "alphabetically" },
				]}
				onSelect={handleFilterSelect}
			/>
			{navigation.state === "loading" ?
				<Loader /> : <div className="m-5 grid grid-cols-2 md:grid-cols-4 gap-2">
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
			}
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
	} catch (error) {
		throw Error('No Data Found');
	}
};