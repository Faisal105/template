import React, { useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
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
import Notification from "../../components/notification/Notification";

const ProductListingPage = () => {
	// State variables
	const loaderData = useLoaderData();
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [filteredProducts, setFilteredProducts] = useState(loaderData);
	const [filtersState, setFiltersState] = useState({});
	const [notification, setNotification] = useState(null);
	const { cartItems, addToCart, removeFromCart } = useCart();


	// Fetch and set products on initial load
	useEffect(() => {
		setIsLoading(true);
		setProducts(loaderData);
		setFilteredProducts(loaderData);

		// Getting Categories From Api
		filterConfig.category.options = Array.from(
			new Set(loaderData.map((p) => p.category))
		).map((category) => ({
			label: category,
			value: category,
		}));
		setIsLoading(false);
	}, [loaderData]);

	// Truncate title if too long
	const trimTitle = (title) => {
		return title.length > 17 ? title.substring(0, 17) + "..." : title;
	};

	// Pagination
	const itemsPerPage = 8;
	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

	// Handle page change
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
		handleApplyFilters(filtersState);
	};

	const handleAddToCart = (product) => {
		addToCart(product);
		setNotification({ message: 'Product added to cart', type: 'success' });
		setTimeout(() => {
			setNotification(null);
		}, 1000);
	};

	const handleIncrease = (product) => {
		addToCart(product)
		setNotification({ message: 'Quantity updated', type: 'info' });
		setTimeout(() => {
			setNotification(null);
		}, 800);
	}

	const handleDecrease = (productID) => {
		removeFromCart(productID)
		setNotification({ message: 'Quantity updated', type: 'info' });
		setTimeout(() => {
			setNotification(null);
		}, 800);
	}

	// Apply filters
	const handleApplyFilters = (filters) => {
		setFiltersState(filters);
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
			{notification && (
				<Notification
					message={notification.message}
					type={notification.type}
					onClose={() => setNotification(null)}
				/>
			)}
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
					{isLoading ? (
						<Loader />
					) : (
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
							{filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((product) => (
								<Card
									key={product.id}
									customClasses="hover:shadow-lg rounded-xl space-y-4">
									<Link
										to={`/ProductDescriptionPage/${product.id}`}>
										<div className="w-full h-48 flex items-center justify-center">
											{/* Product image */}
											<Image
												src={product.image}
												alt={product.title}
												customClasses="max-w-full max-h-full object-contain"
											/>
										</div>
									</Link>
									<article className="flex flex-col space-y-2">
										{/* Product details */}
										<Link
											to={`/ProductDescriptionPage/${product.id}`}>
											<div className="flex flex-col space-y-2">

												<Heading>{trimTitle(product.title)}</Heading>
												<Text>Price : ${product.price}</Text>
												<Text>Category : {product.category}</Text>
												<Text>Rating : {product.rating.rate}</Text>
											</div>
										</Link>

										{/* Counter component for quantity */}
										{cartItems.some(item => item.id === product.id) ? (
											<Counter
												quantity={cartItems.find(item => item.id === product.id).quantity}
												onIncrease={() => handleIncrease(product)}
												onDecrease={() => handleDecrease(product.id)}
											/>
										) : (
											<Button
												label="Add To Cart"
												buttonType="primary"
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
			{
				totalPages > 1 && (
					<div className="flex justify-center my-4">
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					</div>
				)
			}

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
