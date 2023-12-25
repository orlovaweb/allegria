// import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getSizesCloth } from "../../store/sizesCloth";
import { getSizesShoes } from "../../store/sizesShoes";

const SizeShoppingCart = ({ size }) => {
  const sizesCloth = useSelector(getSizesCloth());
  const sizesShoes = useSelector(getSizesShoes());
  if (sizesCloth && sizesShoes) {
    const sizesAll = [...sizesCloth, ...sizesShoes];
    const sizeObj = sizesAll.find((s) => {
      return s._id === size;
    });
    return sizeObj.name;
  }
  return "Loading...";
};
SizeShoppingCart.propTypes = {
  size: PropTypes.string.isRequired
};

export default SizeShoppingCart;
