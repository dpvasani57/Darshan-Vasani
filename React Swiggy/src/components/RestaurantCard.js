import React from "react";
import { CDN_URL } from "../utils/constant";
import { Link } from "react-router-dom";

const RestaurantCard = (props) => {
  const { resData } = props;

  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    costForTwo,
    sla,
    id
  } = resData?.info || {};

  const deliveryTime = sla?.deliveryTime || "N/A";

  return (
    <Link to={`/restaurant/${id}`} style={{ textDecoration: "none" }}>
      <div className="res-card" style={{ backgroundColor: "#f0f0f0" }}>
        <img
          className="res-logo"
          alt={name || "restaurant-logo"}
          src={cloudinaryImageId ? CDN_URL + cloudinaryImageId : "https://via.placeholder.com/300x200?text=No+Image"}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
          }}
        />
        <h3>{name || "Restaurant Name Not Available"}</h3>
        <h4>{cuisines && cuisines.length > 0 ? cuisines.join(", ") : "Cuisines not specified"}</h4>
        <h4>{avgRating ? `${avgRating} stars` : "Rating not available"}</h4>
        <h4>{costForTwo ? costForTwo : "Cost not available"}</h4>
        <h4>{deliveryTime !== "N/A" ? `${deliveryTime} minutes` : "Delivery time not available"}</h4>
      </div>
    </Link>
  );
};

export {RestaurantCard}; 