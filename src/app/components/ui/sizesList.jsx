import React from "react";
import PropTypes from "prop-types";
import Size from "./size";
import { sizesCloth } from "../../api/fake.api/product.api";
import { sizesShoes } from "../../api/fake.api/product.api";

const SizesList = ({ flagCloth, sizes }) => {
  if (flagCloth) {
    return Object.keys(sizesCloth).map((currentSizeKey) => (
      <Size
        size={sizesCloth[currentSizeKey]}
        key={sizesCloth[currentSizeKey]._id}
        sizes={sizes}
      />
    ));
  }
  return Object.keys(sizesShoes).map((currentSizeKey) => (
    <Size
      size={sizesShoes[currentSizeKey]}
      key={sizesShoes[currentSizeKey]._id}
      sizes={sizes}
    />
  ));
};
SizesList.propTypes = {
  sizes: PropTypes.array.isRequired,
  flagCloth: PropTypes.bool.isRequired
};
export default SizesList;
