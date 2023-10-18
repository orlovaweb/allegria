import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  getFavorite,
  getIsLoggedIn,
  removeFavorite
} from "../../../store/users";

const useBookmark = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const favoriteArray = useSelector(getFavorite());
  const onToggleBookmark = (id) => {
    if (isLoggedIn) {
      if (favoriteArray) {
        if (favoriteArray.includes(id)) {
          dispatch(removeFavorite(id));
        } else {
          dispatch(addFavorite(id));
        }
      } else {
        dispatch(addFavorite(id));
      }
    } else {
      if (localStorage.favorite) {
        const favoriteArray = JSON.parse(localStorage.favorite);
        if (favoriteArray.includes(id)) {
          const newFavoriteArray = favoriteArray.filter((i) => i !== id);
          localStorage.favorite = JSON.stringify(newFavoriteArray);
        } else {
          favoriteArray.push(id);
          localStorage.favorite = JSON.stringify(favoriteArray);
        }
      } else {
        const favoriteArray = [];
        favoriteArray.push(id);
        localStorage.favorite = JSON.stringify(favoriteArray);
      }
    }
  };
  return onToggleBookmark;
};

export default useBookmark;
