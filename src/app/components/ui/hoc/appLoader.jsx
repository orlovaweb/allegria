import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBrandsList } from "../../../store/brands";
import { loadCategoriesList } from "../../../store/categories";
import { loadGoodsList } from "../../../store/goods";
import { loadSizesClothList } from "../../../store/sizesCloth";
import { loadSizesShoesList } from "../../../store/sizesShoes";
import {
  getIsLoggedIn,
  loadUnauthorizedCart,
  loadUnauthorizedFavorite,
  loadUser
} from "../../../store/users";
import { loadSubscriptionList } from "../../../store/subscription";
import { loadLettersList } from "../../../store/letters";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  useEffect(() => {
    dispatch(loadBrandsList());
    dispatch(loadCategoriesList());
    dispatch(loadGoodsList());
    dispatch(loadSizesClothList());
    dispatch(loadSizesShoesList());
    dispatch(loadSubscriptionList());
    dispatch(loadLettersList());
    if (isLoggedIn) {
      dispatch(loadUser());
    } else {
      dispatch(loadUnauthorizedFavorite());
      dispatch(loadUnauthorizedCart());
    }
  }, [isLoggedIn]);

  return children;
};
AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
export default AppLoader;
