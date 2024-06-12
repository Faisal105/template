import React from "react";
import { useCart } from "../../contexts/CartContext";
import Image from "../image/Image";
import { redirect } from "react-router-dom";

const Cart = () => {
	const { cartItems, isCartOpen, toggleCart, removeFromCart, deleteFromCart } =
		useCart();

	const handleOnclick = () => {
		redirect("/CartPage");
	};

	return (
		<>
			<div
				className={`fixed inset-0 z-50 ${isCartOpen ? "block" : "hidden"} bg-black bg-opacity-50`}
				onClick={toggleCart}
			/>
			<div
				className={`fixed top-0 ${isCartOpen ? "right-0" : "-right-full"} w-[500px] h-full bg-white transition-right duration-300 ease-in-out p-6 box-border z-50`}>
				<div className="flex justify-between items-center mb-4">
					<h2>Cart</h2>
					<button className="text-red-600 text-sm" onClick={toggleCart}>
						X
					</button>
				</div>
				<hr />
				<div
					id="cart"
					className="flex flex-col justify-between h-[88vh] overflow-auto">
					<table className="mt-2">
						<tbody className="space-y-6">
							{cartItems.map((item, index) => (
								<tr key={item.code}>
									<td className="py-3 pr-3">
										<div className="w-16 h-16">
											<Image
												src={item.image}
												alt={item.title}
												customClasses="max-w-full max-h-full object-contain"
											/>
										</div>
									</td>
									<td className="py-3 px-3">{item.title}</td>
									<td className="py-3 px-3">x{item.quantity}</td>
									<td className="py-3 px-3">
										${(item.price * item.quantity).toFixed(2)}
									</td>
									<td className="py-3 pl-3 text-right">
										{" "}
										<button
											onClick={() => deleteFromCart(item.id)}
											className="text-red-500">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												stroke-width="2">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M5 7h14M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m0 0H9m0 0H5"
												/>
											</svg>
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					<button
						onClick={handleOnclick}
						className="mt-auto py-4 w-full bg-blue-500 text-white rounded-full">
						Proceed
					</button>
				</div>
			</div>
		</>
	);
};

export default Cart;
