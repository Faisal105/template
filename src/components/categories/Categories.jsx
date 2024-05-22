import React, { useEffect, useState } from "react";
import Banner from "../../components/banner/Banner";
import topbanner from "../../assests/top-banner.avif";
import InfoBanner from "../../components/infoBanner";
import Carousel from "../../components/carousel/Carousel";

const Categories = () => {

	const images = [
		"https://via.placeholder.com/800x400?text=Image+1",
		"https://via.placeholder.com/800x400?text=Image+2",
		"https://via.placeholder.com/800x400?text=Image+3",
		"https://via.placeholder.com/800x400?text=Image+4",
		"https://via.placeholder.com/800x400?text=Image+5",
		"https://via.placeholder.com/800x400?text=Image+6",
		"https://via.placeholder.com/800x400?text=Image+7",
		"https://via.placeholder.com/800x400?text=Image+8",
	];

	return (
		<div className="container mx-auto px-4 py-8 space-y-3">
			<div className="flex justify-between items-center gap-4">
                <article className="relative cursor-pointer">
                    <img className="w-full h-full" src="https://vincerocollective.com/cdn/shop/files/4_1_560x600_crop_center@2x.webp?v=1696980419" alt="" />
                    <div className="absolute w-full bottom-0 text-center py-4 bg-[#ffffff8f]">
                        <span className="text-lg font-medium">Watches</span>
                    </div>
                </article>
                <article className="relative cursor-pointer">
                    <img className="w-full h-full" src="https://vincerocollective.com/cdn/shop/files/Mens_Jewelry_Chains_560x600_crop_center@2x.webp?v=1696980758" alt="" />
                    <div className="absolute w-full bottom-0 text-center py-4 bg-[#ffffff8f]">
                        <span className="text-lg font-medium">Jewlery</span>
                    </div>
                </article>
                <article className="relative cursor-pointer">
                    <img className="w-full h-full" src="https://vincerocollective.com/cdn/shop/files/Mens_Eyewear_560x600_crop_center@2x.webp?v=1696985490" alt="" />
                    <div className="absolute w-full bottom-0 text-center py-4 bg-[#ffffff8f]">
                        <span className="text-lg font-medium">Eyewear</span>
                    </div>
                </article>
                <article className="relative cursor-pointer">
                    <img className="w-full h-full" src="https://vincerocollective.com/cdn/shop/files/Mens_Every_Day_Carry_560x600_crop_center@2x.webp?v=1696985632" alt="" />
                    <div className="absolute w-full bottom-0 text-center py-4 bg-[#ffffff8f]">
                        <span className="text-lg font-medium">Everyday Carry</span>
                    </div>
                </article>
            </div>
		</div>
	);
};

export default Categories;