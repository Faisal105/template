import React, { useState, useEffect } from "react";
import Card from "../../components/card/Card";
import Text from "../../components/text/Text";
import Heading from "../../components/heading/Heading";
import Image from "../../components/image/Image";
import Pagination from "../../components/pagination/Pagination";

const ProductListingPage = () => {
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(8);

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			const response = await fetch("https://fakestoreapi.com/products/");
			const data = await response.json();
			console.log(data);
			setProducts(data);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	};

	const trimTitle = (title) => {
		return title.length > 17 ? title.substring(0, 17) + "..." : title;
	};

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(products.length / itemsPerPage);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<>
			<div className=" m-5 grid grid-cols-2 md:grid-cols-4 gap-2">
				{currentItems.map((product) => (
					<Card key={product.id}>
						<Image src={product.image} alt={product.title} />
						<div>
							<Heading>{trimTitle(product.title)}</Heading>
							<Text>category: {product.category}</Text>
							<Text>price: ${product.price}</Text>
						</div>
					</Card>
				))}
			</div>
			<div className="flex justify-center mt-4">
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
