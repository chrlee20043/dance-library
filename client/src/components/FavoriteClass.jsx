import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
  selectFavorites,
} from "../Redux/favoriteSlice";
import { addNewFavorite, deleteFavorite } from "../helpers/fetching";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import "../App.css";

export default function FavoriteClass({ userId, videoId, token }) {
  const favoriteClasses = useSelector(selectFavorites);
  const dispatch = useDispatch();

  const isFavorite = favoriteClasses.some(
    (item) => item.videoId === Number(videoId)
  );

  const handleAddFavorite = async () => {
    if (!isFavorite) {
      console.log("isFavorite", isFavorite);
      const addedFavorite = await addNewFavorite(userId, videoId, token);
      dispatch(addFavorite(addedFavorite));
    }
  };

  const handleRemoveFavorite = async () => {
    if (isFavorite) {
      try {
        // Find the favorite object with matching userId
        const favoriteToRemove = favoriteClasses.find(
          (favorite) =>
            favorite.userId === Number(userId) &&
            favorite.videoId === Number(videoId)
        );

        if (favoriteToRemove) {
          const favoriteId = favoriteToRemove.favoriteId;
          await deleteFavorite(favoriteId, token);

          dispatch(removeFavorite({ favoriteId }));
        }
      } catch (error) {
        console.error("Error removing favorite:", error);
      }
    }
  };

  return (
    <div className="favorite-video">
      {isFavorite ? (
        <>
          <div className="heart-container">
            <HiHeart
              size={36}
              className="heart-button"
              onClick={handleRemoveFavorite}
            />
            <span className="favorite-text">Remove from Favorites</span>
          </div>
        </>
      ) : (
        <>
          <div className="heart-container">
            <HiOutlineHeart
              size={36}
              color="#450245"
              className="heart-button"
              onClick={handleAddFavorite}
            />
            <span className="favorite-text">Add to Favorites</span>
          </div>
        </>
      )}
    </div>
  );
}
