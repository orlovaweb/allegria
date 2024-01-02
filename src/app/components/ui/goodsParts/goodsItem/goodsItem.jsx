import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { getBrands } from "../../../../store/brands";
import Bookmark from "../../../common/bookmark/bookmark";
import Discount from "../../../common/discount";
import Price from "../../../common/price";
import "./goodsItem.css";

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
      <Link to={`/goods/${item.art}`} onClick={scroll.scrollToTop}>
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
        <Bookmark productArt={item.art} />
      </div>
    </div>
  );
};

GoodsItem.propTypes = {
  item: PropTypes.object.isRequired
};
export default GoodsItem;
