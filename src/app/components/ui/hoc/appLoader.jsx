import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadBrandsList } from "../../../store/brands";
import { loadCategoriesList } from "../../../store/categories";
import { loadGoodsList } from "../../../store/goods";
import { loadSizesClothList } from "../../../store/sizesCloth";
import { loadSizesShoesList } from "../../../store/sizesShoes";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadBrandsList());
    dispatch(loadCategoriesList());
    dispatch(loadGoodsList());
    dispatch(loadSizesClothList());
    dispatch(loadSizesShoesList());
  }, []);

  return children;
};
AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
export default AppLoader;
