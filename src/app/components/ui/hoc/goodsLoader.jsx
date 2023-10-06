import PropTypes from "prop-types";
import React from "react";

import { useSelector } from "react-redux";
import { getGoodsLoadingStatus } from "../../../store/goods";
import Loader from "../../pages/loader";

const GoodsLoader = ({ children }) => {
  const dataStatus = useSelector(getGoodsLoadingStatus());
  if (dataStatus) return <Loader />;
  return children;
};
GoodsLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
export default GoodsLoader;
