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
  const [filteredProducts, setFilteredProducts] = useState(
    loaderData?.products
  );
  const [filtersState, setFiltersState] = useState({});
  const [notification, setNotification] = useState(null);
  const { cartItems, addToCart, removeFromCart } = useCart();

  // Fetch and set products on initial load
  useEffect(() => {
    setIsLoading(true);
    setProducts(loaderData?.products);
    setFilteredProducts(loaderData?.products);
    console.log("🚀 loaderdata?.products", loaderData?.products);
    // Getting Categories From Api
    filterConfig.category.options = Array.from(
      new Set(loaderData?.products?.map((p) => p.category))
    ).map((category) => ({
      label: category,
      value: category,
    }));
    setIsLoading(false);
  }, [loaderData?.products]);

  // Truncate title if too long
  const trimTitle = (title) => {
    return title?.length > 17 ? title.substring(0, 17) + "..." : title;
  };

  // Pagination
  // const itemsPerPage = 8;
  // const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Handle page change
  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);

	console.log('Page Number', pageNumber)
	
     const url = `${process.env.REACT_APP_BASE_URL}/products/search?currentPage=${pageNumber -1}&pageSize=${itemsPerPage}&sort=relevance`;

     console.log(
       "Requesting page:",
       pageNumber,
       "with adjusted index:",
       pageNumber
     );
     console.log("Request URL:", url);

     setIsLoading(true);

     try {
       const response = await fetch(url);
       const data = await response.json();
       console.log("Received data:", data);

       if (data.products) {
         setProducts(data.products);
         setFilteredProducts(data.products);
       }
       if (data.pagination) {
         setTotalPages(data.pagination.totalPages);
       }
     } catch (error) {
       console.error("Failed to fetch products:", error);
     }
    setIsLoading(false);
    console.log(loaderData?.pagination);
    handleApplyFilters(filtersState, false);
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

  // Apply filters
  const handleApplyFilters = (filters, resetPage = true) => {
    resetPage && setCurrentPage(1);
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
              {console.log("😍", filteredProducts)}
              {filteredProducts.map((product, index) => (
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
      </div>

      {/* Pagination section */}
      {totalPages > 1 && (
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
const url =
  "https://spartacus-demo.eastus.cloudapp.azure.com:8443/occ/v2/apparel-uk-spa/products/search?fields=products(code%2Cname%2Csummary%2Cconfigurable%2CconfiguratorType%2Cmultidimensional%2Cprice(FULL)%2Cimages(DEFAULT)%2Cstock(FULL)%2CaverageRating%2CvariantOptions)%2Cfacets%2Cbreadcrumbs%2Cpagination(DEFAULT)%2Csorts(DEFAULT)%2CfreeTextSearch%2CcurrentQuery&query=%3Arelevance%3AallCategories%3ANixon%3Aprice%3A%C2%A350-%C2%A399.99&pageSize=12&lang=en&curr=GBP";
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

export const tempAPI = async () => {
  try {
    // Fetch product data from API
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/products/search?fields=products(code%2Cname%2Csummary%2Cconfigurable%2CconfiguratorType%2Cmultidimensional%2Cprice(FULL)%2Cimages(DEFAULT)%2Cstock(FULL)%2CaverageRating%2CvariantOptions)%2Cfacets%2Cbreadcrumbs%2Cpagination(DEFAULT)%2Csorts(DEFAULT)%2CfreeTextSearch%2CcurrentQuery&query=%3Arelevance%3AallCategories%3ANixon%3Aprice%3A%C2%A350-%C2%A399.99&pageSize=12&lang=en&curr=GBP`
    );
    const data = await response.json();
    console.log("🚀 ~ TEMP API:", data);
    return data;
  } catch (error) {
    // Throw error if data retrieval fails
    throw Error("No Data Found");
  }
};


tempAPI();