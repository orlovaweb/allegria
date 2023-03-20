import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./goodsItem.css";
import Bookmark from "./bookmark";
import Discount from "./discount";
import Price from "./price";

const GoodsItem = ({ item, onToggleBookMark }) => {
  return (
    <div className="product-card">
      <Link to={`/goods/${item._id}`}>
        <div className="product-img">
          <img
            src={process.env.PUBLIC_URL + "/img/" + item.img}
            alt="clothes"
          />
          <Discount discount={item.discount} />
        </div>
        <div className="product-description">
          <p className="product-description__brand">{item.brand.name}</p>
          <p className="product-description__shortDescription">
            {item.shortDescription}
          </p>
          <div className="product-description__price">
            <Price price={item.price} discount={item.discount} />
          </div>
        </div>
      </Link>
      <Bookmark
        className="product-bookMark"
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
