import React from "react";
import { useCart } from "../../contexts/CartContext";
import Image from "../image/Image";
import { redirect } from "react-router-dom";

const Cart = () => {
  const { cartItems, isCartOpen, toggleCart, removeFromCart } = useCart();

  const handleOnclick = () => { 
      redirect('/CartPage')
  };

  return (
    <>
      <div
        className="fixed inset-0"
        style={{
          display: isCartOpen ? "block" : "none",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1000,
        }}
        onClick={toggleCart}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          right: isCartOpen ? 0 : "-100%",
          width: "500px",
          height: "100%",
          backgroundColor: "white",
          transition: "right 0.3s ease",
          padding: "25px",
          boxSizing: "border-box",
          zIndex: 1001,
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2>Cart</h2>
          <button className="text-red-600 text-sm" onClick={toggleCart}>
            X
          </button>
        </div>
        <hr />
        <div
          id="cart"
          className="flex flex-col justify-between h-[88vh] overflow-auto"
        >
          <ul className="">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between my-7"
              >
                <div className="flex justify-between items-center gap-5 w-full">
                  <div className="w-16 h-16">
                    <Image
                      src={item.image}
                      alt={item.title}
                      customClasses="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <span>{item.title}</span>
                  <span>${item.price}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
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
                </div>
              </li>
            ))}
          </ul>
            <button onClick={handleOnclick} className="mt-auto py-4 w-full bg-blue-500 text-white rounded-full">
              Proceed
            </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
