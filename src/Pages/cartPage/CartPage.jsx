import React, { useState } from "react";
import Text from "../../components/text/Text";
import { useCart } from "../../contexts/CartContext";
import Image from "../../components/image/Image";
import Counter from "../../components/counter/Counter";
import Notification from "../../components/notification/Notification";
const CartPage = ({ location }) => {
  const { cartItems, addToCart, removeFromCart } = useCart();
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
        <table className="mt-8">
          <thead>
            <tr>
              <th className="px-5 py-3">Product</th>
              <th className="px-5 py-3">Product Name</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Qty</th>
              <th className="px-5 py-3">Total</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>

  );
};

export default CartPage;
