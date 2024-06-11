import React from "react";

const FiltersLoader = () => {
  return (
    <div className="px-6 md:max-lg:px-3 py-4 animate-pulse">
      <div className="space-y-4">
        <div className="flex flex-col">
          <div className="h-4 bg-gray-300 rounded  w-5/6 mb-2"></div>
          <div className="grid grid-cols-1 gap-2">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="h-4 bg-gray-300 rounded  w-5/6 mb-2"></div>
          <div className="grid grid-cols-1 gap-2">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="h-4 bg-gray-300 rounded  w-5/6 mb-2"></div>
          <div className="grid grid-cols-1 gap-2">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="h-4 bg-blue-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );
};
export default FiltersLoader;
