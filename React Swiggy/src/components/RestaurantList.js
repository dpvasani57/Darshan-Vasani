import React from 'react';
import { RestaurantCard } from './RestaurantCard';
import withRestaurantBadges from '../hocs/withRestaurantBadges';

const RestaurantList = ({ restaurants }) => {
  const RestaurantCardWithBadges = withRestaurantBadges(RestaurantCard);

  return (
    <div className="res-container">
      {restaurants.map((restaurant) => (
        <RestaurantCardWithBadges key={restaurant.info.id} resData={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantList; 