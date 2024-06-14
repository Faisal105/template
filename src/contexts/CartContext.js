import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [isCartOpen, setCartOpen] = useState(false);

  const toggleCart = () => setCartOpen(!isCartOpen);

  const fetchCartId = async () => {
    const userId = JSON.parse(localStorage.getItem("user"))?.customerId;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/${userId}/carts`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      const data = await response.json();
      if (data && data.carts.length > 0) {
        setCartId(data.carts[0].code);
      } else {
        createCart(userId);
      }
    } catch (error) {
      console.error("Error fetching/creating cart:", error);
    }
  };

  const createCart = async (userId) => {
    try {
      const newCartResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/${userId}/carts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      const newCartData = await newCartResponse.json();
      if (newCartResponse.ok) {
        setCartId(newCartData.code);
      } else {
        throw new Error(`Failed to create cart: ${newCartData.message}`);
      }
    } catch (error) {
      console.error("Error creating cart:", error);
    }
  };

  useEffect(() => {
    fetchCartId();
  }, []);

  const addToCart = async (product) => {
    if (!cartId) {
      console.error(
        "No cart ID available. Please ensure the cart is fetched or created."
      );
      return;
    }

    const userId = "current"; // or fetch from localStorage if needed

    try {
      const requestBody = {
        product: {
          code: product.code,
          quantity: 1,
        },
      };

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/${userId}/carts/${cartId}/entries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }

      const responseData = await response.json();

      // Check if there's a specific field in the response to update UI or handle differently
      if (responseData.statusCode === "error") {
        throw new Error(responseData.statusMessage);
      }

      // Assuming the API returns the updated cart entries in the response
      setCartItems(responseData.entry); // You may need to adjust depending on your API response
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeFromCart = (code) => {
    setCartItems((currentItems) =>
      currentItems.reduce((acc, item) => {
        if (item.code === code) {
          if (item.quantity > 1) {
            acc.push({
              ...item,
              quantity: item.quantity - 1,
              totalPrice: item?.price.value * (item.quantity - 1),
            });
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
      currentItems.filter((item) => item.code !== code)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        addToCart,
        removeFromCart,
        deleteFromCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
