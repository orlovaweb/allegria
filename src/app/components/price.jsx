import React from "react";
import "./price.css";
import PropTypes from "prop-types";

const Price = ({ price, discount }) => {
  if (discount)
    return (
      <p className="price__with-discount">
        <span>{price}руб</span>
        {price - (discount / 100) * price}руб
      </p>
    );
  else return <p className="price">{price}руб</p>;
};
Price.propTypes = {
  price: PropTypes.number,
  discount: PropTypes.number
};

export default Price;
