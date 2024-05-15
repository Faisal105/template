import React from "react";
import Heading from "../../components/heading/Heading";
import Text from "../../components/text/Text";
import Button from "../../components/button/Button";

const CartPage = ({ location }) => {
	// Check if location state exists and contains product details
	const productDetails = location?.state?.product;
	console.log("productDetails", productDetails);
	// If product details exist, display them; otherwise, display a message
	if (!productDetails) {
		return (
			<div className="container mx-auto px-4 py-8">
				<Heading customClasses="text-3xl font-bold mb-4">Your Cart</Heading>
				<div className="bg-white shadow-md rounded-md p-4">
					<Text customClasses="text-red-500 font-semibold">
						No product details found.
					</Text>
				</div>
			</div>
		);
	}

	// Display product details
	return (
		<div className="container mx-auto px-4 py-8">
			<Heading customClasses="text-3xl font-bold mb-4">Your Cart</Heading>
			<div className="bg-white shadow-md rounded-md p-4">
				<div className="grid grid-cols-4 gap-4 border-b pb-2 mb-4">
					<Text customClasses="font-bold">Product</Text>
					<Text customClasses="font-bold">Price</Text>
					<Text customClasses="font-bold">Quantity</Text>
					<Text customClasses="font-bold">Total</Text>
				</div>
				<div className="flex items-center border-b py-2">
					<div className="flex items-center col-span-1">
						<img
							src={productDetails.image}
							alt={productDetails.title}
							className="w-16 h-16 object-cover mr-4"
						/>
						<div>
							<Text customClasses="font-semibold">{productDetails.title}</Text>
							<Text customClasses="text-gray-500">
								{productDetails.description}
							</Text>
						</div>
					</div>
					<div className="col-span-1 flex justify-center">
						<Text customClasses="text-center">${productDetails.price}</Text>
					</div>
					<div className="col-span-1 flex justify-center">
						{/* For now, let's assume quantity is 1 */}
						<Text customClasses="text-center">1</Text>
					</div>
					<div className="col-span-1 flex justify-center">
						<Text customClasses="text-center">${productDetails.price}</Text>
					</div>
				</div>
				<div className="flex justify-end mt-4">
					<Button
						label="Checkout"
						buttonType="primary"
						customClasses="bg-blue-500 text-white px-4 py-2 rounded-md"
					/>
				</div>
			</div>
		</div>
	);
};

export default CartPage;
