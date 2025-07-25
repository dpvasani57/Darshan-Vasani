import {React, useEffect, useState, useContext } from 'react';
import { RestaurantCard } from './RestaurantCard';
import resList from '../utils/mockData';
import Shimmer from "./Shimmer";
import useOnlineStatus from '../utils/useOnlineStatus';
import withRestaurantBadges from '../hocs/withRestaurantBadges';
import withFilteredRestaurants from '../hocs/withFilteredRestaurants';
import RestaurantList from './RestaurantList';
import { UserContext } from '../utils/UserContext';


const Body = () => {
  // Local State Variable - Super powerful variable
  const [listOfRestaurants, setListOfRestraunt] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage] = useState(20);

  // Higher Order Component to add badges
  const RestaurantCardWithBadges = withRestaurantBadges(RestaurantCard);

  // Create a new component for a featured section
  const FeaturedRestaurantList = withFilteredRestaurants({
    withDiscounts: true,
    sortBy: { key: 'avgRating', ascending: false }
  })(RestaurantList);

  // Whenever state variables update, react triggers a reconciliation cycle(re-renders the component)
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // API call to fetch data
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.022505&lng=72.5713621&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      const json = await data.json();

      // Extract restaurants from multiple possible card locations
      let allRestaurants = [];
      
      // Check multiple card indices for restaurants
      for (let i = 0; i < json?.data?.cards?.length; i++) {
        const card = json?.data?.cards[i];
        
        // Check for restaurants in gridElements.infoWithStyle.restaurants
        const restaurants = card?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
        if (restaurants.length > 0) {
          allRestaurants = [...allRestaurants, ...restaurants];
        }
        
        // Also check for restaurants in data.data.cards (older structure)
        const oldRestaurants = card?.data?.data?.cards || [];
        if (oldRestaurants.length > 0) {
          allRestaurants = [...allRestaurants, ...oldRestaurants];
        }
      }
      
      // Remove duplicates based on restaurant ID
      const uniqueRestaurants = allRestaurants.filter((restaurant, index, self) => 
        index === self.findIndex(r => r.info?.id === restaurant.info?.id)
      );
      
      
      setListOfRestraunt(uniqueRestaurants);
      setFilteredRestaurant(uniqueRestaurants);
      setCurrentPage(1); // Reset to first page when new data loads
    } catch (error) {
      // Fallback to mock data if API fails
      setListOfRestraunt(resList);
      setFilteredRestaurant(resList);
      setCurrentPage(1);
    }
  };

  // Handle search functionality
  const handleSearch = () => {
    if (!listOfRestaurants || listOfRestaurants.length === 0) return;
    if (!searchText.trim()) {
      setFilteredRestaurant(listOfRestaurants);
      setCurrentPage(1);
      return;
    }
    const filtered = listOfRestaurants.filter((res) =>
      res.info.name?.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurant(filtered);
    setCurrentPage(1);
  };

  // Handle top rated filter
  const handleTopRated = () => {
    if (!listOfRestaurants || listOfRestaurants.length === 0) return;
    
    const filteredList = listOfRestaurants.filter(
      (res) => res.info.avgRating > 4
    );
    setFilteredRestaurant(filteredList);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Clear filters and show all restaurants
  const clearFilters = () => {
    setFilteredRestaurant(listOfRestaurants);
    setSearchText("");
    setCurrentPage(1); // Reset to first page when clearing filters
  };

  // Pagination logic
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = filteredRestaurant.slice(indexOfFirstRestaurant, indexOfLastRestaurant);
  const totalPages = Math.ceil(filteredRestaurant.length / restaurantsPerPage);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const onlineStatus = useOnlineStatus();
  const { user, setUser } = useContext(UserContext);

  if (!onlineStatus) {
    return (
      <div className="offline-message">
        <h2>You are offline!</h2>
        <p>Please check your internet connection.</p>
      </div>
    );
  }

  if (listOfRestaurants?.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <div className="filter">
        <div className="flex items-center gap-4 mb-4">
          <div className="search flex-1">
            <input
              type="text"
              className="search-box"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              placeholder="Search for restaurants..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <button onClick={handleSearch}>
              Search
            </button>
          </div>
          {/* User Info */}
          {user && (
            <div className="flex flex-col items-end">
              <div className="flex items-center bg-white rounded-lg shadow px-3 py-2 gap-2 border border-gray-200 mb-1">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border-2 border-indigo-400" />
                <div className="text-sm font-semibold text-gray-700">{user.name}</div>
              </div>
              <input
                type="text"
                className="border px-2 py-1 rounded text-sm focus:outline-none focus:ring focus:border-indigo-400"
                value={user.name}
                onChange={e => setUser({ ...user, name: e.target.value })}
                placeholder="Change user name"
              />
            </div>
          )}
        </div>
        <div className="filter-buttons">
          <button
            className="filter-btn"
            onClick={handleTopRated}
          >
            Top Rated Restaurants
          </button>
          <button
            className="clear-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
        <div className="restaurant-count">
          <p>Showing {currentRestaurants.length} of {filteredRestaurant.length} restaurants (Page {currentPage} of {totalPages})</p>
        </div>
      </div>
      
      <div className="res-container">
        {currentRestaurants && currentRestaurants.length > 0 ? (
          currentRestaurants.map((restaurant) => (
            <RestaurantCardWithBadges key={restaurant.info.id || restaurant.info.name} resData={restaurant} />
          ))
        ) : (
          <div className="no-results">
            <h3>No restaurants found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <div className="pagination">
            <button 
              className="pagination-btn prev-btn"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>
            
            <div className="page-numbers">
              {getPageNumbers().map((number, index) => (
                <button
                  key={index}
                  className={`page-number ${number === currentPage ? 'active' : ''} ${number === '...' ? 'ellipsis' : ''}`}
                  onClick={() => typeof number === 'number' && paginate(number)}
                  disabled={number === '...'}
                >
                  {number}
                </button>
              ))}
            </div>
            
            <button 
              className="pagination-btn next-btn"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
          
          <div className="pagination-info">
            <span>Page {currentPage} of {totalPages}</span>
            <span>•</span>
            <span>{filteredRestaurant.length} total restaurants</span>
          </div>
        </div>
      )}

      {/* Featured Section */}
      <div className="featured-section">
          <h2 style={{textAlign: 'center', margin: '20px', fontSize: '2em'}}>Restaurants With Great Discounts!</h2>
          <FeaturedRestaurantList restaurants={listOfRestaurants} />
      </div>
    </div>
  );
};

export default Body;