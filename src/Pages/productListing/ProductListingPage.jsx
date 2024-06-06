import React, { useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import Card from "../../components/card/Card";
import Text from "../../components/text/Text";
import Heading from "../../components/heading/Heading";
import Image from "../../components/image/Image";
import Pagination from "../../components/pagination/Pagination";
import Button from "../../components/button/Button";
import Loader from "../../components/loader/Loader";
import { useCart } from "../../contexts/CartContext";
import Counter from "../../components/counter/Counter";
import Notification from "../../components/notification/Notification";

const ProductListingPage = () => {
  // State variables
  const loaderData = useLoaderData();
  const [products, setProducts] = useState(loaderData?.products);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState(null);
  const { cartItems, addToCart, removeFromCart } = useCart();

  // Fetch and set products on initial load
  useEffect(() => {
    setIsLoading(true);
    setProducts(loaderData?.products);
    console.log("🚀 loaderdata?.products", loaderData?.products);
    setIsLoading(false);
  }, [loaderData?.products]);

  // Truncate title if too long
  const trimTitle = (title) => {
    return title?.length > 17 ? title.substring(0, 17) + "..." : title;
  };

  // Handle page change
  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);

	
     const url = `${process.env.REACT_APP_BASE_URL}/products/search?currentPage=${pageNumber - 1}&pageSize=${loaderData?.pagination?.pageSize}&sort=relevance`;
     console.log("Request URL:", url);

     setIsLoading(true);

     try {
       const response = await fetch(url);
       const data = await response.json();

       if (data.products) {
         setProducts(data.products);
       }
     } catch (error) {
       console.error("Failed to fetch products:", error);
     }
    setIsLoading(false);
  };

  const handleAddToCart = (product, e) => {
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



  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

        {/* Product listing section */}
        <div className="w-full p-4">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
              {products.map((product, index) => (
                <Card
                  key={`${product?.code}-${index}`}
                  customClasses="hover:shadow-lg rounded-xl space-y-4"
                >
                  <Link to={`/ProductDescriptionPage/${product.code}`}>
                    <div className="w-full h-48 flex items-center justify-center">
                      <Image
                        src={`https://spartacus-demo.eastus.cloudapp.azure.com:8443/${product?.firstVariantImage}`}
                        alt={product.name}
                        customClasses="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </Link>
                  <article className="flex flex-col space-y-2">
                    <Link to={`/ProductDescriptionPage/${product.code}`}>
                      <div className="flex flex-col space-y-2">
                        <Heading>{trimTitle(product.name)}</Heading>
                        <Text>Price : {product?.price?.formattedValue}</Text>
                        {/* <Text>Category : {product.category}</Text> */}
                        {/* <Text>Rating : {product.rating.rate}</Text> */}
                      </div>
                    </Link>
                    {cartItems.some((item) => item.code === product.code) ? (
                      <Counter
                        quantity={
                          cartItems.find((item) => item.code === product.code)
                            .quantity
                        }
                        onIncrease={() => handleIncrease(product)}
                        onDecrease={() => handleDecrease(product?.code)}
                      />
                    ) : (
                      <Button
                        label="Add To Cart"
                        buttonType="primary"
                        onClick={(e) => handleAddToCart(product, e)}
                      />
                    )}
                  </article>
                </Card>
              ))}
            </div>
          )}
        </div>
      {/* Pagination section */}
      {loaderData?.pagination?.totalPages > 1 && (
        <div className="flex justify-center my-4">
          <Pagination
            currentPage={currentPage}
            totalPages={loaderData?.pagination?.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};
export default ProductListingPage;

export const ProductListingPageLoaders = async () => {
  try {
    // Fetch product data from API
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/products/search?currentPage=0&fields=DEFAULT&pageSize=20`
    );
    const data = await response.json();
    console.log("🚀 ~ ProductListingPageLoaders ~ dataProducts:", data);
    return data;
  } catch (error) {
    // Throw error if data retrieval fails
    throw Error("No Data Found");
  }
};
