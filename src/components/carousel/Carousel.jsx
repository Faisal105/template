import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../card/Card";
import Heading from "../heading/Heading";
import Text from "../text/Text";
import Image from "../image/Image";
import Button from "../button/Button";

const Carousel = ({ heading, products:{products} }) => {
	console.log("🚀 ~ Carousel ~ products:", products)
	const [currentIndex, setCurrentIndex] = useState(0);
	const itemsToShow = 4;

	const handlePrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0
				? Math.max(products && products.length - itemsToShow, 0)
				: prevIndex - 1
		);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex >= products && products.length - itemsToShow ? 0 : prevIndex + 1
		);
	};

	return (
    <div className="flex flex-col items-center justify-center w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">{heading}</h2>
      <div className="relative w-full">
        <div className="flex justify-around gap-10 overflow-hidden">
          {products &&
            products
              .slice(currentIndex, currentIndex + itemsToShow)
              .map((product, index) => (
                <Card
                  key={product.code}
                  customClasses="hover:shadow-lg w-96 rounded-xl space-y-4"
                >
                  <Link
                    to={`/Open-Catalogue/Components/Power-Supplies/Power-Adapters-%26-Inverters/AC-Adapter-AC-L200/p/${product.code}`}
                  >
                    <div className="w-full h-48 flex items-center justify-center">
                      {/* Product image */}
                      <Image
                        src={`https://spartacus-demo.eastus.cloudapp.azure.com:8443/${product?.firstVariantImage}`}
                        alt={product?.name}
                        customClasses="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </Link>
                  <article className="flex flex-col space-y-2">
                    {/* Product details */}
                    <Link to={`/ProductDescriptionPage/${product.code}`}>
                      <div className="flex flex-col space-y-2">
                        <Heading>{product.name}</Heading>
                        <Text>Price : {product?.price?.formattedValue}</Text>
                        {/* <Text>Price : ${product.price}</Text> */}
                      </div>
                    </Link>
                  </article>
                </Card>
              ))}
        </div>
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-transparent hover:bg-gray-200 focus:outline-none transition-colors duration-300"
          aria-label="Previous"
        >
          <svg
            className="w-6 h-6 text-blue-500 hover:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-transparent hover:bg-gray-200 focus:outline-none transition-colors duration-300"
          aria-label="Next"
        >
          <svg
            className="w-6 h-6 text-blue-500 hover:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex mt-4">
        {Array.from({ length: Math.ceil(products?.length / itemsToShow) }).map(
          (_, index) => (
            <div
              key={index}
              className={`w-3 h-3 mx-1 rounded-full ${
                index === Math.floor(currentIndex / itemsToShow)
                  ? "bg-blue-500"
                  : "bg-gray-300"
              }`}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Carousel;
