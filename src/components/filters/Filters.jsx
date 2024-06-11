import React, { useEffect, useState } from "react";
import FiltersLoader from "./FiltersLoader";

const Filters = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [expandedFacet, setExpandedFacet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch(
          "https://spartacus-demo.eastus.cloudapp.azure.com:8443/occ/v2/apparel-uk-spa/products/search?fields=facets"
        );
        const data = await response.json();
        setFilters(data.facets || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch filters:", error);
        setIsLoading(false);
      }
    };
    fetchFilters();
  }, []);

  const handleFilterSelection = (facetName, queryValue, isChecked) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev };
      if (isChecked) {
        updatedFilters[facetName] = [
          ...(updatedFilters[facetName] || []),
          queryValue,
        ];
      } else {
        updatedFilters[facetName] = updatedFilters[facetName].filter(
          (value) => value !== queryValue
        );
      }
      return updatedFilters;
    });
  };

  const applyFilters = () => {
    onFiltersChange(selectedFilters);
  };

  const clearFilters = () => {
    setSelectedFilters({});
    onFiltersChange({});
  };

  const toggleFacet = (facetName) => {
    setExpandedFacet(expandedFacet === facetName ? null : facetName);
  };

  return (
    <div className="filters-container bg-gray-100 px-3 py-5 rounded-xl space-y-5">
      {isLoading ? (
        <FiltersLoader />
      ) : (
        <>
          {filters
            .filter(
              (facet) =>
                !["Price", "Size", "Category", "Brand", "Collection"].includes(
                  facet.name
                )
            )
            .map((facet) => (
              <div key={facet.name} className="">
                <h3
                  className="mb-2 text-sm cursor-pointer"
                  onClick={() => toggleFacet(facet.name)}
                >
                  {facet.name}
                </h3>
                {expandedFacet === facet.name && (
                  <div className="flex flex-col gap-2">
                    {facet.values.map((value) => (
                      <label key={value.name}>
                        <input
                          className="mr-2"
                          type="checkbox"
                          onChange={(e) =>
                            handleFilterSelection(
                              facet.name,
                              value.query.query.value,
                              e.target.checked
                            )
                          }
                          name={value.name}
                        />
                        <span className="text-sm">
                          {value.name} ({value.count})
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          <hr className="my-5" />
          <div className="flex flex-col gap-3 ">
            <button
              onClick={clearFilters}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 text-xs rounded-lg"
            >
              Clear Filters
            </button>
            <button
              onClick={applyFilters}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-xs rounded-lg"
            >
              Apply Filters
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Filters;
