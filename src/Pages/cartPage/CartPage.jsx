import React, { useState } from "react";
import Text from "../../components/text/Text";
import { useCart } from "../../contexts/CartContext";
import Image from "../../components/image/Image";
import Counter from "../../components/counter/Counter";
import Notification from "../../components/notification/Notification";
import Button from "../../components/button/Button";
const CartPage = ({ location }) => {
  const { cartItems, addToCart, removeFromCart, deleteFromCart } = useCart();
  const [notification, setNotification] = useState(null);

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
      <div className="container mx-auto px-4 py-8">
        <Text customClasses="text-4xl font-bold mb-4">Your Cart</Text>
        {cartItems.length > 0 ? (
          <>
            <table className="mt-8 w-full lg:w-3/5 text-center">
              <thead>
                <tr>
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">Product Name</th>
                  <th className="px-5 py-3">Price</th>
                  <th className="px-5 py-3">Qty</th>
                  <th className="px-5 py-3">Total</th>
                  <th className="px-5 py-3">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems?.map((item, index) => (
                  <tr key={item.id}>
                    <td className="px-6 py-3">
                      <Image
                        src={item.image}
                        alt={item.title}
                        customClasses="max-w-full w-16 h-16 object-contain"
                      />
                    </td>
                    <td className="px-6 py-3">{item.title}</td>
                    <td className="px-5 py-3">${item.price}</td>
                    <td className="px-5 py-3">
                      <Counter
                        quantity={item.quantity}
                        onIncrease={() => handleIncrease(item)}
                        onDecrease={() => handleDecrease(item.id)}
                      />
                    </td>
                    <td className="px-5 py-3">${item.price * item.quantity}</td>
                    <td className="px-5 py-3 text-center">
                      <button
                        onClick={() => deleteFromCart(item.id)}
                        className="text-red-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M5 7h14M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m0 0H9m0 0H5"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <Text customClasses="my-8">
            Your cart is empty. Start adding some products to it.
          </Text>
        )}

      </div>
    </>

  );
};

export default CartPage;
