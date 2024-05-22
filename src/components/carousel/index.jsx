import React, { useState } from 'react';

const Carousel = () => {
    const allImages = [
        "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U",
        "https://picsum.photos/200/300?grayscale",
        "https://picsum.photos/seed/picsum/200/300",
        "https://picsum.photos/200/300.jpg",
        "https://picsum.photos/200/300?grayscale"
    ];

    // Grouping images into slides of four
    const chunkSize = 4;
    const slides = [];
    for (let i = 0; i < allImages.length; i += chunkSize) {
        slides.push(allImages.slice(i, i + chunkSize));
    }

    const [activeIndex, setActiveIndex] = useState(0);

    const goToSlide = (index) => {
        setActiveIndex(index);
    };

    const goToPrevSlide = () => {
        setActiveIndex(index => (index - 1 + slides.length) % slides.length);
    };

    const goToNextSlide = () => {
        setActiveIndex(index => (index + 1) % slides.length);
    };

    return (
        <div id="default-carousel" className="relative w-full">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {slides.map((slide, index) => (
                    <div key={index} className={`flex duration-700 ease-in-out ${index === activeIndex ? 'flex' : 'hidden'}`}>
                        {slide.map((img, imgIndex) => (
                            <img key={imgIndex} src={img} className="block w-1/4" alt={`Slide ${index + 1}, Image ${imgIndex + 1}`} />
                        ))}
                    </div>
                ))}
            </div>
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                {slides.map((_, index) => (
                    <button key={index} type="button" className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-black' : 'bg-white'}`} aria-label={`Slide ${index + 1}`} onClick={() => goToSlide(index)}></button>
                ))}
            </div>
            <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={goToPrevSlide}>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={goToNextSlide}>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    );
};

export default Carousel;
