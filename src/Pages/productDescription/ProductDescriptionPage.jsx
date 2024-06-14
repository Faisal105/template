import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import Card from "../../components/card/Card";
import Button from "../../components/button/Button";
import Heading from "../../components/heading/Heading";
import Text from "../../components/text/Text";
import Image from "../../components/image/Image";
import Loader from "../../components/loader/Loader";
import { useCart } from "../../contexts/CartContext";
import Counter from "../../components/counter/Counter";
import Notification from "../../components/notification/Notification";

const ProductDescriptionPage = () => {
	const product = useLoaderData();
	const navigation = useNavigation();
	const { cartItems, addToCart, removeFromCart } = useCart();
	const [notification, setNotification] = useState(null);
	const [showViewCart, setShowViewCart] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const cartItem = cartItems.find((item) => item.id === product.id);
		setShowViewCart(cartItem ? cartItem.quantity > 0 : false);
	}, [cartItems, product.id]);

	const handleBuyNow = (product, e) => {
		e.preventDefault();
		addToCart(product);
		setNotification({ message: "Product added to cart", type: "success" });
		setTimeout(() => {
			setNotification(null);
		}, 1000);
	};

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

	const handleViewCart = () => {
		navigate("/CartPage");
	};

	const cartItem = cartItems.find((item) => item.id === product.id);

	return (
    <>
      {navigation.state === "loading" ? (
        <Loader />
      ) : (
        <>
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification(null)}
            />
          )}
          <div className="my-20 mx-auto max-w-5xl px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Display product image in a Card component */}
            <div>
              <Card key={product.id} customClasses="flex items-center">
                <Image
                  src={`https://spartacus-demo.eastus.cloudapp.azure.com:8443/${product?.images[0]?.url}`}
                  alt={product.name}
                  customClasses="max-w-full h-auto"
                />
              </Card>
            </div>
            {/* Display product details */}
            <div className="flex flex-col justify-center gap-4">
              <div>
                {/* Display product title using Heading component */}
                <Heading>{product.name}</Heading>

                {/* Display product category */}
                <div className="flex items-center my-2">
                  <Heading className="mr-2 ">Category:</Heading>
                  <Text>{product.category}</Text>
                </div>

                {/* Display product price */}
                <div className="flex items-center my-2">
                  <Heading className="mr-2">Price:</Heading>
                  <Text>${product?.price?.formattedValue}</Text>
                </div>
              </div>
              {/* Display product description */}
              <div>
                <Heading customClasses="my-2">Description:</Heading>
                <Text>{product.description}</Text>
              </div>
              {/* Button to add product to cart or counter */}
              {cartItem && cartItem.quantity > 0 ? (
                <>
                  <Counter
                    quantity={cartItem.quantity}
                    onIncrease={() => handleIncrease(product)}
                    onDecrease={() => handleDecrease(product.id)}
                  />
                  <Button
                    label="View Cart"
                    buttonType="primary"
                    customClasses="mt-4"
                    onClick={handleViewCart}
                  />
                </>
              ) : (
                <Button
                  label="Add To Cart"
                  buttonType="primary"
                  onClick={(e) => handleBuyNow(product, e)}
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDescriptionPage;

export const ProductDetailPageLoaders = async ({ request, params }) => {
  try {
    // Fetch product data from API
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/products/${params.productId}?fields=FULL`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    // Throw error if data retrieval fails
    throw Error("No Data Found");
  }
};