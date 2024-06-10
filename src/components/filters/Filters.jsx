import React, { useEffect, useState } from "react";

const Filters = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [expandedFacet, setExpandedFacet] = useState(null);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch(
          "https://spartacus-demo.eastus.cloudapp.azure.com:8443/occ/v2/apparel-uk-spa/products/search?fields=facets"
        );
        const data = await response.json();
        setFilters(data.facets || []);
      } catch (error) {
        console.error("Failed to fetch filters:", error);
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

  const toggleFacet = (facetName) => {
    setExpandedFacet(expandedFacet === facetName ? null : facetName);
  };

  return (
    <div className="filters-container bg-gray-100 p-4 rounded-xl">
      {filters.map((facet) => (
        <div key={facet.name} className="my-6">
          <h3
            className="mb-2 text-base cursor-pointer"
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
      <button
        onClick={applyFilters}
        className="underline bg-gray-200 px-2 py-1 text-base rounded-lg"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;
