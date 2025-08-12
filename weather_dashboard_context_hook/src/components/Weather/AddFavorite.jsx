import { useContext, useEffect, useState } from "react";
import RedHeartIcon from "../../assets/heart-red.svg";
import HeartIcon from "../../assets/heart.svg";
import { FavoriteContext, WeatherContext } from "../../context";

const AddFavorite = () => {
  const { weatherData } = useContext(WeatherContext);
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoriteContext);

  const [isFavorite, toggleFavorite] = useState();

  const { latitude, longitude, location } = weatherData;

  useEffect(() => {
    const found = favorites.find((fav) => fav.location === location);

    toggleFavorite(found);
  }, [favorites, location]);

  const handleFavorite = () => {
    const found = favorites.find((fav) => fav.location === location);

    if (!found) {
      addToFavorites(latitude, longitude, location);
    } else {
      removeFromFavorites(location);
    }

    toggleFavorite((prev) => !prev);
  };

  return (
    <div className="md:col-span-2">
      <div className="flex items-center justify-end space-x-6">
        <button
          className="text-sm md:text-base inline-flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#C5C5C54D] cursor-pointer"
          onClick={handleFavorite}
        >
          <span>{isFavorite ? "Remove" : "Add to"} Favorite</span>
          <img src={isFavorite ? RedHeartIcon : HeartIcon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default AddFavorite;
