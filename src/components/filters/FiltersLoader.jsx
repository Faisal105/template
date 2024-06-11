import React from "react";

const FiltersLoader = () => {
  return (
    <div className="px-6 md:max-lg:px-3 py-4 animate-pulse">
      <div className="space-y-4">
        <div className="flex flex-col">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        </div>
        <div className="flex flex-col">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        </div>
        <div className="flex flex-col">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        </div>
        <hr className="my-5" />
        <div className="h-4 bg-blue-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
};
export default FiltersLoader;
