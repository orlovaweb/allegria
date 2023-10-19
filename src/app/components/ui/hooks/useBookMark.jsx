import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  addUnauthorizedFavorite,
  getFavorite,
  getIsLoggedIn,
  getUnauthorizedFavorite,
  removeFavorite,
  removeUnauthorizedFavorite
} from "../../../store/users";

const useBookmark = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const favoriteArray = useSelector(getFavorite());
  const unauthorizedFavoriteArray = useSelector(getUnauthorizedFavorite());
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
      if (unauthorizedFavoriteArray.includes(id)) {
        dispatch(removeUnauthorizedFavorite(id));
      } else {
        dispatch(addUnauthorizedFavorite(id));
      }
    }
  };
  return onToggleBookmark;
};

export default useBookmark;
