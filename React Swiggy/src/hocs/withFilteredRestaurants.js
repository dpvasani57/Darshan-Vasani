import React from 'react';

const withFilteredRestaurants = (config) => (WrappedComponent) => {
  return (props) => {
    const { restaurants } = props;
    let filteredList = [...restaurants];

    // --- Filtering Logic ---
    if (config.filterOpen) {
      filteredList = filteredList.filter(res => res.info.isOpen);
    }
    if (config.withDiscounts) {
      filteredList = filteredList.filter(res => res.info.aggregatedDiscountInfoV3);
    }
    // --- End Filtering Logic ---

    // --- Sorting Logic ---
    if (config.sortBy) {
      const { key, ascending } = config.sortBy;
      filteredList.sort((a, b) => {
        let valA, valB;
        if(key === 'deliveryTime') {
            valA = a.info.sla?.[key];
            valB = b.info.sla?.[key];
        } else if (key === 'costForTwo') {
            valA = parseInt(a.info?.[key]?.match(/\d+/g));
            valB = parseInt(b.info?.[key]?.match(/\d+/g));
        }
        else {
            valA = a.info?.[key];
            valB = b.info?.[key];
        }

        if (valA < valB) return ascending ? -1 : 1;
        if (valA > valB) return ascending ? 1 : -1;
        return 0;
      });
    }
    // --- End Sorting Logic ---

    return <WrappedComponent {...props} restaurants={filteredList} />;
  };
};

export default withFilteredRestaurants; 