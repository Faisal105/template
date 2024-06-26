import React, { useState, useEffect } from "react";
import Text from "../../components/text/Text";
import { useCart } from "../../contexts/CartContext";
import Image from "../../components/image/Image";
import Counter from "../../components/counter/Counter";
import Notification from "../../components/notification/Notification";

const CartPage = ({ location }) => {
	const { cartItems, addToCart, removeFromCart, deleteFromCart } = useCart();
	const [notification, setNotification] = useState(null);
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		const calculateTotalPrice = () => {
			const total = cartItems.reduce(
        (sum, item) => sum + item?.price?.value * item.quantity,
        0
      );
			setTotalPrice(total);
		};
		calculateTotalPrice();
	}, [cartItems]);

	const handleIncrease = (product) => {
		addToCart(product);
		setNotification({ message: "Quantity updated", type: "info" });
		setTimeout(() => {
			setNotification(null);
		}, 800);
	};

	const handleDecrease = (productID) => {
		removeFromCart(productID);
		setNotification({ message: "Quantity updated", type: "info" });
		setTimeout(() => {
			setNotification(null);
		}, 800);
	};

	return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="container mx-auto pl-4 pr-8 py-4">
        <Text customClasses="text-4xl font-bold mb-4 text-center">
          Your Cart
        </Text>
        {cartItems.length > 0 ? (
          <>
            <table className="mt-8 w-full xl:w-2/3 mx-auto text-center">
              <thead>
                <tr>
                  <th className="pl-4 pr-8 py-4">Product</th>
                  <th className="pl-4 pr-8 py-4">Unit Price</th>
                  <th className="pl-4 pr-8 py-4">Qty</th>
                  <th className="pl-4 pr-8 py-4">Total</th>
                  <th className="pl-4 pr-8 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems?.map((item) => (
                  <tr key={item.code} className="border-t border-gray-300">
                    <td className="pl-4 pr-8 py-4 flex items-center gap-5 ">
                      <Image
                        src={`https://spartacus-demo.eastus.cloudapp.azure.com:8443/${item?.firstVariantImage}`}
                        alt={item.name}
                        customClasses="max-w-full w-16 h-16 object-contain"
                      />
                      <span className="ml-4">{item.name}</span>
                    </td>
                    <td className="pl-4 pr-8 py-4">
                      {item?.price?.formattedValue}
                    </td>
                    <td className="pl-4 pr-8 py-4">
                      <Counter
                        quantity={item.quantity}
                        onIncrease={() => handleIncrease(item)}
                        onDecrease={() => handleDecrease(item.code)}
                      />
                    </td>
                    <td className="pl-4 pr-8 py-4">
                      £{(item.price.value * item.quantity).toFixed(1)}
                    </td>
                    <td className="pl-4 pr-8 py-4 text-center">
                      <button
                        onClick={() => deleteFromCart(item.code)}
                        className="text-red-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
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
              <tfoot>
                <tr>
                  <td
                    colSpan="4"
                    className="text-right font-bold pl-4 pr-8 py-4"
                  >
                    Total Price:
                  </td>
                  <td className="pl-4 pr-8 py-4 font-bold">
                    £{totalPrice.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </>
        ) : (
          <Text customClasses="my-8 text-center">
            Your cart is empty. Start adding some products to it.
          </Text>
        )}
      </div>
    </>
  );
};

export default CartPage;
