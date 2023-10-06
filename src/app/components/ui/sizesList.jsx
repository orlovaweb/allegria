import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { getSizesCloth } from "../../store/sizesCloth";
import { getSizesShoes } from "../../store/sizesShoes";
import Size from "./size/size";

const SizesList = ({ flagCloth, sizes }) => {
  const sizesCloth = useSelector(getSizesCloth());
  const sizesShoes = useSelector(getSizesShoes());
  if (flagCloth) {
    return sizesCloth.map((currentSize) => (
      <Size size={currentSize} key={currentSize._id} sizes={sizes} />
    ));
  }
  return sizesShoes.map((currentSize) => (
    <Size size={currentSize} key={currentSize._id} sizes={sizes} />
  ));
  // console.log(sizesCloth);
  // console.log(sizesShoes);
  // return "sizes";
};
SizesList.propTypes = {
  sizes: PropTypes.array.isRequired,
  flagCloth: PropTypes.bool.isRequired
};
export default SizesList;
