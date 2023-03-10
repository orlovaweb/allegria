import React from "react";
import PropTypes from "prop-types";
import GoodsItem from "./goodsItem";

const GoodsList = ({ items, onToggleBookMark }) => {
  return (
    <>
      {items.map((item) => (
        <GoodsItem
          item={item}
          onToggleBookMark={onToggleBookMark}
          key={item._id}
        />
      ))}
    </>
  );
};
GoodsList.propTypes = {
  items: PropTypes.array.isRequired,
  onToggleBookMark: PropTypes.func.isRequired
};
export default GoodsList;
