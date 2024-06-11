import React, { useState, useEffect } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import Card from '../../components/card/Card';
import Text from '../../components/text/Text';
import Heading from '../../components/heading/Heading';
import Image from '../../components/image/Image';
import Pagination from '../../components/pagination/Pagination';
import Button from '../../components/button/Button';
import Loader from '../../components/loader/Loader';
import { useCart } from '../../contexts/CartContext';
import Counter from '../../components/counter/Counter';
import Notification from '../../components/notification/Notification';
import Filters from '../../components/filters/Filters';

const ProductListingPage = () => {
  // State variables
  const loaderData = useLoaderData();
  const [products, setProducts] = useState(loaderData?.products);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState(null);
  const [queryParams, setQueryParams] = useState(null);
  console.log('🚀 ~ ProductListingPage ~ queryParams:', queryParams);
  const { cartItems, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    setIsLoading(true);
    setProducts(loaderData?.products);
    console.log('🚀 loaderdata?.products', loaderData?.products);
    setIsLoading(false);
    setQueryParams(null);
  }, [loaderData?.products]);

  const trimTitle = (title) => {
    return title?.length > 17 ? title.substring(0, 17) + '...' : title;
  };

  const handleFiltersChange = async (selectedFilters) => {
    if (Object.keys(selectedFilters).length === 0) {
       setQueryParams(null);
       setProducts(loaderData?.products);
       return;
    }
    setQueryParams(null);
    const queryParams = Object.entries(selectedFilters)
      .map(([key, values]) => values.map((value) => `${encodeURIComponent(value)}`).join('&'))
      .join('&');

    setIsLoading(true);
    const insertString = '%3AallCategories%3ANixon';
    const splittedString = queryParams.split('%3Arelevance');
    const newQueryParams = `${splittedString[0]}%3Arelevance${insertString}${splittedString[1]}`;
    console.log(queryParams, 'queryParams');
    console.log('🚀 ~ handleFiltersChange ~ newQueryParams:', newQueryParams);
    setQueryParams(newQueryParams);
    const response = await fetch(`https://spartacus-demo.eastus.cloudapp.azure.com:8443/occ/v2/apparel-uk-spa/products/search?fields=products(code%2Cname%2Csummary%2Cconfigurable%2CconfiguratorType%2Cmultidimensional%2Cprice(FULL)%2Cimages(DEFAULT)%2Cstock(FULL)%2CaverageRating%2CvariantOptions)%2Cfacets%2Cbreadcrumbs%2Cpagination(DEFAULT)%2Csorts(DEFAULT)%2CfreeTextSearch%2CcurrentQuery&query=${newQueryParams}&pageSize=12&lang=en&curr=GBP`);
    const data = await response.json();
    console.log('🚀 ~ handleFiltersChange ~ data:', data);
    setProducts(data.products);
    setIsLoading(false);
  };

  // Handle page change
  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);

    const url = `${process.env.REACT_APP_BASE_URL}/products/search?currentPage=${pageNumber - 1}&pageSize=${loaderData?.pagination?.pageSize}&sort=relevance`;
    console.log('Request URL:', url);

    setIsLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
    setIsLoading(false);
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    addToCart(product);
    setNotification({ message: 'Product added to cart', type: 'success' });
    setTimeout(() => {
      setNotification(null);
    }, 1000);
  };

  const handleIncrease = (product) => {
    addToCart(product);
    setNotification({ message: 'Quantity updated', type: 'info' });
    setTimeout(() => {
      setNotification(null);
    }, 800);
  };

  const handleDecrease = (productID) => {
    removeFromCart(productID);
    setNotification({ message: 'Quantity updated', type: 'info' });
    setTimeout(() => {
      setNotification(null);
    }, 800);
  };

  return (
    <>
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}

      {/* Product listing section */}
      <div className='w-full p-4'>
        {isLoading ? (
          <Loader />
        ) : (
          <div className='flex justify-center gap-5'>
            <div className='w-[18%]'>
              <Filters onFiltersChange={handleFiltersChange} />
            </div>
            <div className='w-[82%]'>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4 '>
                {products.length > 0 ? (
                  products?.map((product, index) => (
                    <Card key={`${product?.code}-${index}`} customClasses='hover:shadow-lg rounded-xl space-y-4'>
                      <Link to={`/ProductDescriptionPage/${product.code}`}>
                        <div className='w-full h-48 flex items-center justify-center'>
                          <Image src={queryParams === null ? `https://spartacus-demo.eastus.cloudapp.azure.com:8443/${product?.firstVariantImage}` : `https://spartacus-demo.eastus.cloudapp.azure.com:8443/${product?.images[1].url}`} alt={product.name} customClasses='max-w-full max-h-full object-contain' />
                        </div>
                      </Link>
                      <article className='flex flex-col space-y-2'>
                        <Link to={`/ProductDescriptionPage/${product.code}`}>
                          <div className='flex flex-col space-y-2'>
                            <Heading>{trimTitle(product.name)}</Heading>
                            <Text>Price : {product?.price?.formattedValue}</Text>
                            {/* <Text>Category : {product.category}</Text> */}
                            {/* <Text>Rating : {product.rating.rate}</Text> */}
                          </div>
                        </Link>
                        {cartItems.some((item) => item.code === product.code) ? <Counter quantity={cartItems.find((item) => item.code === product.code).quantity} onIncrease={() => handleIncrease(product)} onDecrease={() => handleDecrease(product?.code)} /> : <Button label='Add To Cart' buttonType='primary' onClick={(e) => handleAddToCart(product, e)} />}
                      </article>
                    </Card>
                  ))
                ) : (
                  <>
                    <h1 className='text-3xl text-gray-700'>No product found! Please try another filter...</h1>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Pagination section */}
      {loaderData?.pagination?.totalPages > 1 && (
        <div className='flex justify-center my-4'>
          <Pagination currentPage={currentPage} totalPages={loaderData?.pagination?.totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </>
  );
};
export default ProductListingPage;

export const ProductListingPageLoaders = async () => {
  try {
    // Fetch product data from API
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/search?currentPage=0&fields=DEFAULT&pageSize=20`);
    const data = await response.json();
    console.log('🚀 ~ ProductListingPageLoaders ', data);
    return data;
  } catch (error) {
    throw Error('No Data Found');
  }
};
