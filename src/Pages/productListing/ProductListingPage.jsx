import React, { useState, useEffect } from "react";
import { useNavigate, useLoaderData, useNavigation } from "react-router-dom";
import Card from "../../components/card/Card";
import Text from "../../components/text/Text";
import Heading from "../../components/heading/Heading";
import Image from "../../components/image/Image";
import Pagination from "../../components/pagination/Pagination";
import Button from "../../components/button/Button";
import Loader from "../../components/loader/Loader";
import { filterConfig } from "../../components/filter/FilterOptions";
import Filters from "../../components/filter/Filter";

const ProductListingPage = () => {
	const loaderData = useLoaderData();
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [filteredProducts, setFilteredProducts] = useState(loaderData);

	const navigation = useNavigation();
	const navigate = useNavigate();

	useEffect(() => {
		setProducts(loaderData);
		setFilteredProducts(loaderData);

		filterConfig.category.options = Array.from(new Set(loaderData.map(p => p.category))).map(category => ({
			label: category,
			value: category
		}));

	}, [loaderData]);

	const trimTitle = (title) => {
		return title.length > 17 ? title.substring(0, 17) + "..." : title;
	};

	const itemsPerPage = 8;
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	const currentItems = products
		? products.slice(indexOfFirstItem, indexOfLastItem)
		: [];
	const totalPages = Math.ceil(products.length / itemsPerPage);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const navigateToPDP = (productId) => {
		navigate(`/ProductDescriptionPage/${productId}`);
		console.log(`Buying product with ID: ${productId}`);
	};

	const handleApplyFilters = (filters) => {
		let filtered = [...products];

		if (filters.category && Object.values(filters.category).some(val => val)) {
			filtered = filtered.filter(product =>
				Object.entries(filters.category).some(([key, value]) => value && product.category === key)
			);
		}

		if (filters.price) {
			filtered.sort((a, b) => {
				return filters.price === 'lowToHigh' ? a.price - b.price : b.price - a.price;
			});
		}

		if (filters.rating) {
			filtered.sort((a, b) => {
				return filters.rating === 'lowToHigh' ? a.rating.rate - b.rating.rate : b.rating.rate - a.rating.rate;
			});
		}

		setFilteredProducts(filtered);
	};

	return (
		<>
			<div className="flex flex-row">
				<div className="w-1/6 p-4">
					<Filters onApplyFilters={handleApplyFilters} filterConfig={filterConfig} />
				</div>

				<div className="w-10/12 p-4">
					{navigation.state === "loading" ? (
						<Loader />
					) : (
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
							{filteredProducts.map((product) => (
								<Card key={product.id} customClasses="hover:shadow-lg rounded-xl space-y-4" onClick={() => navigateToPDP(product.id)}>
									<div className="w-full h-48 flex items-center justify-center">
										<Image
											src={product.image}
											alt={product.title}
											customClasses="max-w-full max-h-full object-contain"
										/>
									</div>
									<article className="flex flex-col space-y-2">
										<Heading>{trimTitle(product.title)}</Heading>
										<Text>Price : ${product.price}</Text>
										<Text>Category : {product.category}</Text>
										<Text>Rating : {product.rating.rate}</Text>
										<Button
											label="Buy Now"
											buttonType="secondary"
											customClasses=""
											onClick={() => navigateToPDP(product.id)}
										/>
									</article>
								</Card>
							))}
						</div>
					)}
				</div>
			</div>

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
		const response = await fetch("https://fakestoreapi.com/products/");
		const data = await response.json();
		return data;
		console.log("data is coming", data);
	} catch (error) {
		throw Error("No Data Found");
	}
};
