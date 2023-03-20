import React from "react";
import PropTypes from "prop-types";
import "./discount.css";

const Discount = ({ discount }) => {
  if (discount)
    return (
      <div className="discount">
        <p>{discount}%</p>
      </div>
    );
  return null;
};
Discount.propTypes = {
  discount: PropTypes.number
};
export default Discount;
