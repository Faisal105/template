import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory hook
import Card from "../../components/card/Card";
import Text from "../../components/text/Text";
import Heading from "../../components/heading/Heading";
import Image from "../../components/image/Image";
import Pagination from "../../components/pagination/Pagination";
import Button from "../../components/button/Button";

const ProductListingPage = () => {
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(8);
	const navigate = useNavigate(); // Initialize useHistory hook

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

	return (
		<>
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
