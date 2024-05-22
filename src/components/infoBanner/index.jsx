import React from 'react';

const InfoBanner = () => {
    const bannerItems = [
        { id: 1, number: "25%", description: "Great Prices & Great Deals" },
        { id: 2, number: "30 day", description: "Shop with Confidence Easy 30-Day Return Policy" },
        { id: 3, number: "6 pm", description: "Order by 6PM Same Day Shipment" },
        { id: 4, number: "24/7", description: "Great Service After You Buy" }
    ];

    return (
        <div className="bg-gray-300 flex justify-between items-center p-4">
            {bannerItems.map(item => (
                <div key={item.id} className="text-center flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-white">{item.number}</span>
                    <span className="text-sm text-white">{item.description}</span>
                </div>
            ))}
        </div>
    );
};

export default InfoBanner;
