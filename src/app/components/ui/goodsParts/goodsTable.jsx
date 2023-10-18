import React from "react";
import PropTypes from "prop-types";
import GoodsItem from "./goodsItem";

const GoodsList = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <GoodsItem item={item} key={item._id} />
      ))}
    </>
  );
};
GoodsList.propTypes = {
  items: PropTypes.array.isRequired
};
export default GoodsList;
