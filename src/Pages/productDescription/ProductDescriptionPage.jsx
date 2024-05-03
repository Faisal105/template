import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/card/Card";
import Button from "../../components/button/Button";
import Heading from "../../components/heading/Heading";
import Text from "../../components/text/Text";
import Image from "../../components/image/Image";

const ProductDescriptionPage = () => {
	const handleBuyNow = (product) => {
		console.log("Product Added to Cart:", product);
	};
	const { productId } = useParams();
	const [product, setProduct] = useState(null);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await fetch(
					`https://fakestoreapi.com/products/${productId}`
				);
				const data = await response.json();
				console.log(data);
				setProduct(data);
			} catch (error) {
				console.error("Error fetching product details:", error);
			}
		};

		fetchProduct();
	}, [productId]);

	if (!product) {
		return <div>Loading...</div>;
	}

	return (
		<div className="my-20 mx-auto max-w-5xl px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
			<div>
				<Card key={product.id} customClasses="flex items-center">
					<Image
						src={product.image}
						alt={product.title}
						customClasses="max-w-full h-auto"
					/>
				</Card>
			</div>
			<div className="flex flex-col justify-center gap-4">
				<div>
					<Heading>{product.title}</Heading>

					<div className="flex items-center my-2">
						<Heading className="mr-2 ">Category:</Heading>
						<Text>{product.category}</Text>
					</div>
					<div className="flex items-center my-2">
						<Heading className="mr-2">Price:</Heading>
						<Text>${product.price}</Text>
					</div>
				</div>
				<div>
					<Heading customClasses="my-2">Description:</Heading>
					<Text>{product.description}</Text>
				</div>
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
