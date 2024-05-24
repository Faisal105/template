import React from "react";
import Text from "../../components/text/Text";
import { useCart } from "../../contexts/CartContext";
import Image from "../../components/image/Image";
const CartPage = ({ location }) => {
  const { cartItems } = useCart();
  console.log("🚀 cartItems:", cartItems);

  return (
    <div className="container mx-auto px-4 py-8">
      <Text customClasses="text-4xl font-bold mb-4 text-center">Your Cart</Text>
      <table className="mt-5">
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
              <td>
                <Image
                  src={item.image}
                  alt={item.title}
                  customClasses="max-w-full h-40 object-contain"
                />
              </td>
              <td className="px-5 py-3">{item.title}</td>
              <td className="px-5 py-3">${item.price}</td>
              <td className="px-5 py-3">{item.quantity}</td>
              <td className="px-5 py-3">${item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartPage;
