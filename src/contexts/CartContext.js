import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);

  const toggleCart = () => setCartOpen(!isCartOpen);

 const addToCart = (product) => {
    setCartItems((currentItems) => {
      const index = currentItems.findIndex(item => item.code === product.code);
      if (index > -1) {
        const updatedItems = [...currentItems];
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: updatedItems[index].quantity + 1,
          totalPrice: updatedItems[index].price.value * (updatedItems[index].quantity + 1),
        };
        return updatedItems;
      } else {
        return [...currentItems, {...product, quantity: 1, totalPrice: product?.price.value}];
      }
    });
  };

  const removeFromCart = (code) => {
    setCartItems(currentItems =>
      currentItems.reduce((acc, item) => {
        if (item.code === code) {
          if (item.quantity > 1) {
            acc.push({...item, quantity: item.quantity - 1, totalPrice: item?.price.value * (item.quantity - 1)});
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
    );
  };

    const deleteFromCart = (code) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.code !== code))
  };


  return (
    <CartContext.Provider
      value={{ cartItems, isCartOpen, addToCart, removeFromCart, deleteFromCart, toggleCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
