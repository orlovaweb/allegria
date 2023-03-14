import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
import Breadcrumbs from "./breadcrumbs";
import Bookmark from "./bookmark";
import "./productCard.css";

const ProductCard = ({ id, onToggleBookMark }) => {
  const [product, setProduct] = useState();
  useEffect(() => {
    api.goods.getById(id).then((data) => setProduct(data));
  }, []);
  console.log(product);

  if (product) {
    return (
      <section className="card">
        <div className="container">
          <Breadcrumbs selectedPage={product.name} />
          <div className="card-wrapper">
            <div className="card__img-wrapper">
              <img
                className="card__img"
                src={process.env.PUBLIC_URL + "/img/" + product.img}
                alt="clothes"
              />
              <Bookmark
                className="card-bookMark"
                status={product.bookmark}
                onClick={() => onToggleBookMark(product._id)}
              />
            </div>
            <div className="card__content">
              <h1>{product.brand.name}</h1>
              <h2>{product.shortDescription}</h2>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return <h2>Loading...</h2>;
};
ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  onToggleBookMark: PropTypes.func
};
export default ProductCard;
