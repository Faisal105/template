import React from "react";
import Heading from "../../components/heading/Heading"; // Import the Heading component
import Text from "../../components/text/Text"; // Import the Text component
import Button from "../../components/button/Button"; // Import the Button component

const CartPage = () => {
	return (
		<div className="container mx-auto px-4 py-8">
			<Heading customClasses="text-3xl font-bold mb-4">Your Cart</Heading>{" "}
			{/* Use the Heading component */}
			<div className="bg-white shadow-md rounded-md p-4">
				<div className="grid grid-cols-4 gap-4 border-b pb-2 mb-4">
					{/* Use the Text component for labels */}
					<Text customClasses="font-bold">Product</Text>
					<Text customClasses="font-bold">Price</Text>
					<Text customClasses="font-bold">Quantity</Text>
					<Text customClasses="font-bold">Total</Text>
				</div>
				<div className="flex items-center border-b py-2">
					<div className="flex items-center col-span-1">
						<img
							src="https://via.placeholder.com/100"
							alt="Product"
							className="w-16 h-16 object-cover mr-4"
						/>
						<div>
							{/* Use the Text component for product details */}
							<Text customClasses="font-semibold">Product Name</Text>
							<Text customClasses="text-gray-500">Product Description</Text>
						</div>
					</div>
					<div className="col-span-1 flex justify-center">
						{/* Use the Text component for price */}
						<Text customClasses="text-center">$10.00</Text>
					</div>
					<div className="col-span-1 flex justify-center">
						{/* Use the Text component for quantity */}
						<Text customClasses="text-center">2</Text>
					</div>
					<div className="col-span-1 flex justify-center">
						{/* Use the Text component for total */}
						<Text customClasses="text-center">$20.00</Text>
					</div>
				</div>
				<div className="flex justify-end mt-4">
					{/* Use the Button component for the checkout button */}
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
