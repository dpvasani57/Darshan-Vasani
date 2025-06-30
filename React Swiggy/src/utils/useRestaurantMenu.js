import { useEffect, useState } from 'react';
import { MENU_API_URL } from './constant';

const useRestaurantMenu = (resId) => {
  const [restaurant, setRestaurant] = useState(null);
  const [menuSections, setMenuSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      const data = await fetch(MENU_API_URL + resId);
      const json = await data.json();
      const restInfo = json?.data;

      // Extract restaurant info
      const restaurantData = restInfo?.cards?.find(
        (c) => c?.card?.card?.info?.name
      )?.card?.card?.info;

      // Extract menu sections
      const menuCards =
        restInfo?.cards
          ?.find((c) => c.groupedCard?.cardGroupMap?.REGULAR)
          ?.groupedCard.cardGroupMap.REGULAR.cards || [];

      const sections = menuCards
        .filter((c) => c.card?.card?.title && c.card?.card?.itemCards)
        .map((section) => ({
          title: section.card.card.title,
          items: section.card.card.itemCards,
        }));

      setRestaurant(restaurantData);
      setMenuSections(sections);
      setLoading(false);
    };
    if (resId) fetchMenu();
  }, [resId]);

  return { restaurant, menuSections, loading };
};

export default useRestaurantMenu;