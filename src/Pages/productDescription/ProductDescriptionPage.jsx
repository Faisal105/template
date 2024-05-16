import { useLoaderData, useNavigation } from "react-router-dom";
import Card from "../../components/card/Card";
import Button from "../../components/button/Button";
import Heading from "../../components/heading/Heading";
import Text from "../../components/text/Text";
import Image from "../../components/image/Image";
import Loader from "../../components/loader/Loader";

const ProductDescriptionPage = () => {
	const product = useLoaderData();
	const navigation = useNavigation();
	const handleBuyNow = (product) => {
		console.log("Product Added to Cart:", product);
	};

	return (
		<>
			{navigation.state === "loading" ? (
				<Loader />
			) : (
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
			)}
		</>
	);
};

export default ProductDescriptionPage;
export const ProductDetailPageLoaders = async ({ request, params }) => {
	console.log(params);
	try {
		// Fetch product data from API
		const response = await fetch(
			`https://fakestoreapi.com/products/${params.productId}`
		);
		const data = await response.json();
		return data;
		console.log("data is coming", data);
	} catch (error) {
		// Throw error if data retrieval fails
		throw Error("No Data Found");
	}
};
