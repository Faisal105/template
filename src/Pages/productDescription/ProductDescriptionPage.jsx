import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/card/Card";
import Button from "../../components/button/Button";
import Heading from "../../components/heading/Heading";
import Text from "../../components/text/Text";
import Image from "../../components/image/Image";

const ProductDescriptionPage = () => {
	// Function to handle adding product to cart
	const handleBuyNow = (product) => {
		console.log("Product Added to Cart:", product);
	};

	// Get productId from URL parameters using useParams hook from react-router-dom
	const { productId } = useParams();

	// State to hold product details
	const [product, setProduct] = useState(null);

	// Fetch product details from API when component mounts using useEffect hook
	useEffect(() => {
		const fetchProduct = async () => {
			try {
				// Fetch product details from the API using productId
				const response = await fetch(
					`https://fakestoreapi.com/products/${productId}`
				);
				// Parse the response data
				const data = await response.json();
				// Log the fetched data to the console
				console.log(data);
				// Set the fetched product data to the state
				setProduct(data);
			} catch (error) {
				// Log any errors that occur during fetching
				console.error("Error fetching product details:", error);
			}
		};

		// Call the fetchProduct function when component mounts
		fetchProduct();
	}, [productId]); // Dependency array ensures useEffect runs only when productId changes

	// Render loading message if product data is not yet fetched
	if (!product) {
		return <div>Loading...</div>;
	}

	return (
		<div className="my-20 mx-auto max-w-5xl px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
			{/* Display product image in a Card component */}
			<div>
				<Card key={product.id} customClasses="flex items-center">
					<Image
						src={product.image}
						alt={product.title}
						customClasses="max-w-full h-auto"
					/>
				</Card>
			</div>
			{/* Display product details */}
			<div className="flex flex-col justify-center gap-4">
				<div>
					{/* Display product title using Heading component */}
					<Heading>{product.title}</Heading>

					{/* Display product category */}
					<div className="flex items-center my-2">
						<Heading className="mr-2 ">Category:</Heading>
						<Text>{product.category}</Text>
					</div>

					{/* Display product price */}
					<div className="flex items-center my-2">
						<Heading className="mr-2">Price:</Heading>
						<Text>${product.price}</Text>
					</div>
				</div>
				{/* Display product description */}
				<div>
					<Heading customClasses="my-2">Description:</Heading>
					<Text>{product.description}</Text>
				</div>
				{/* Button to add product to cart */}
				<Button
					customClasses="my-2"
					label="Add to Cart"
					buttonType="secondary"
					onClick={() => handleBuyNow(product)}
				/>
			</div>
		</div>
	);
};

export default ProductDescriptionPage;
