import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./goodsItem.css";
import Bookmark from "../../../common/bookmark/bookmark";
import Discount from "../../../common/discount";
import Price from "../../../common/price";
import { useSelector } from "react-redux";
import { getBrands } from "../../../../store/brands";

const GoodsItem = ({ item }) => {
  const brands = useSelector(getBrands());
  const getBrandName = (id) => {
    const brandIndex = brands.findIndex((el) => {
      return el._id === id;
    });

    return brands[brandIndex].name;
  };
  return (
    <div className="product-card">
      <Link to={`/goods/${item.art}`}>
        <div className="product-img">
          <img
            src={process.env.PUBLIC_URL + "/img/" + item.img}
            alt="clothes"
          />
          <Discount discount={item.discount} />
        </div>
        <div className="product-description">
          <p className="product-description__brand">
            {getBrandName(item.brand)}
          </p>
          <p className="product-description__shortDescription">
            {item.shortDescription}
          </p>
          <div className="product-description__price">
            <Price price={item.price} discount={item.discount} />
          </div>
        </div>
      </Link>
      <div className="product-bookMark">
        <Bookmark productId={item._id} />
      </div>
    </div>
  );
};

GoodsItem.propTypes = {
  item: PropTypes.object.isRequired
};
export default GoodsItem;
