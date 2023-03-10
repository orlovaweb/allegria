import React from "react";
import PropTypes from "prop-types";
import "./goodsItem.css";
import Bookmark from "./bookmark";
import { Link } from "react-router-dom";

const GoodsItem = ({ item, onToggleBookMark }) => {
  const renderPrice = (price, discount) => {
    if (discount)
      return (
        <p className="product-price__with-discount">
          <span>{price}руб</span>
          {price - (discount / 100) * price}руб
        </p>
      );
    else return <p className="product-price">{price}руб</p>;
  };
  const renderDiscoun = (discount) => {
    if (discount)
      return (
        <div className="product-discount">
          <p>{discount}%</p>
        </div>
      );
    return null;
  };
  return (
    <div className="product-card">
      <Link to={`/goods/${item._id}`}>
        <div className="product-img">
          <img
            src={process.env.PUBLIC_URL + "/img/" + item.img}
            alt="clothes"
          />
          {renderDiscoun(item.discount)}
          <></>
        </div>
        <div className="product-description">
          <p className="product-description__brand">{item.brand.name}</p>
          <p className="product-description__shortDescription">
            {item.shortDescription}
          </p>
          <div className="product-description__price">
            {renderPrice(item.price, item.discount)}
          </div>
        </div>
      </Link>
      <Bookmark
        status={item.bookmark}
        onClick={() => onToggleBookMark(item._id)}
      />
    </div>
  );
};

GoodsItem.propTypes = {
  item: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired
};
export default GoodsItem;
