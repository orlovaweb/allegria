import React from "react";
import PropTypes from "prop-types";

const ProductCard = ({ id }) => {
  return <h1>{id}</h1>;
};
ProductCard.propTypes = {
  id: PropTypes.string.isRequired
};
export default ProductCard;
