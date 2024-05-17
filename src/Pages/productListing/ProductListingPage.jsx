import React, { useState, useEffect } from "react";
import { useNavigate, useLoaderData, useNavigation } from "react-router-dom";
import Card from "../../components/card/Card";
import Text from "../../components/text/Text";
import Heading from "../../components/heading/Heading";
import Image from "../../components/image/Image";
import Pagination from "../../components/pagination/Pagination";
import Button from "../../components/button/Button";
import Loader from "../../components/loader/Loader";
import { useCart } from '../../contexts/CartContext'
import { filterConfig } from "../../components/filter/FilterOptions";
import Filters from "../../components/filter/Filter";
import Counter from "../../components/counter/Counter";

const ProductListingPage = () => {
	// State variables
	const loaderData = useLoaderData();
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [filteredProducts, setFilteredProducts] = useState(loaderData);
	const [cart, setCart] = useState({}); // Track cart items and quantities

	// Hooks
	const navigation = useNavigation();
  	const { addToCart } = useCart(); 

  
  // Fetch and set products on initial load
  useEffect(() => {
    setProducts(loaderData);
    setFilteredProducts(loaderData);

    // Set up filter options based on loaded data
    filterConfig.category.options = Array.from(
      new Set(loaderData.map((p) => p.category))
    ).map((category) => ({
      label: category,
      value: category,
    }));

  }, [loaderData]);

  // Truncate title if too long
  const trimTitle = (title) => {
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  };

  // Pagination
  const itemsPerPage = 8;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

	// Function to handle adding product to cart
	const handleAddToCart = (product) => {
		addToCart(product)
	};

	// Handle counter change
	const handleCounterChange = (productId, newQuantity) => {
		setCart((prevCart) => {
			if (newQuantity === 0) {
				const { [productId]: _, ...remainingItems } = prevCart;
				return remainingItems;
			} else {
				return {
					...prevCart,
					[productId]: {
						...prevCart[productId],
						quantity: newQuantity,
					},
				};
			}
		});
	};

  // Apply filters
  const handleApplyFilters = (filters) => {
    let filtered = [...products];

    // Filter by category
    if (
      filters.category &&
      Object.values(filters.category).some((val) => val)
    ) {
      filtered = filtered.filter((product) =>
        Object.entries(filters.category).some(
          ([key, value]) => value && product.category === key
        )
      );
    }

    // Sort by price
    if (filters.price) {
      filtered.sort((a, b) => {
        return filters.price === "lowToHigh"
          ? a.price - b.price
          : b.price - a.price;
      });
    }

    // Sort by rating
    if (filters.rating) {
      filtered.sort((a, b) => {
        return filters.rating === "lowToHigh"
          ? a.rating.rate - b.rating.rate
          : b.rating.rate - a.rating.rate;
      });
    }

    setFilteredProducts(filtered);
  };

  return (
    <>
      {/* Filter section */}
      <div className="flex flex-row">
        <div className="w-1/6 p-4">
          {/* Filters component for filtering products */}
          <Filters
            onApplyFilters={handleApplyFilters}
            filterConfig={filterConfig}
          />
        </div>

				{/* Product listing section */}
				<div className="w-10/12 p-4">
					{navigation.state === "loading" ? (
						<Loader />
					) : (
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
							{filteredProducts.map((product) => (
								<Card
									key={product.id}
									customClasses="hover:shadow-lg rounded-xl space-y-4">
									<div className="w-full h-48 flex items-center justify-center">
										{/* Product image */}
										<Image
											src={product.image}
											alt={product.title}
											customClasses="max-w-full max-h-full object-contain"
										/>
									</div>
									<article className="flex flex-col space-y-2">
										{/* Product details */}
										<Heading>{trimTitle(product.title)}</Heading>
										<Text>Price : ${product.price}</Text>
										<Text>Category : {product.category}</Text>
										<Text>Rating : {product.rating.rate}</Text>
										{/* Counter component for quantity */}
										{cart[product.id]?.quantity ? (
											<Counter
												quantity={cart[product.id].quantity}
												onIncrease={() =>
													handleCounterChange(
														product.id,
														cart[product.id].quantity + 1
													)
												}
												onDecrease={() =>
													handleCounterChange(
														product.id,
														cart[product.id].quantity - 1
													)
												}
											/>
										) : (
											/* Button to add product to cart */
											<Button
												label="Add To Cart"
												buttonType="primary"
												customClasses=""
												onClick={() => handleAddToCart(product)}
											/>
										)}
									</article>
								</Card>
							))}
						</div>
					)}
				</div>
			</div>

      {/* Pagination section */}
      <div className="flex justify-center my-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default ProductListingPage;

export const ProductListingPageLoaders = async () => {
	try {
		// Fetch product data from API
		const response = await fetch("https://fakestoreapi.com/products/");
		const data = await response.json();
		console.log("data is coming", data);
		return data;
	} catch (error) {
		// Throw error if data retrieval fails 
		throw Error("No Data Found");
	}
};
