import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
import Breadcrumbs from "./breadcrumbs";
import "./productCard.css";

const ProductCard = ({ id }) => {
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
            <div className="card-img">
              <img
                src={process.env.PUBLIC_URL + "/img/" + product.img}
                alt="clothes"
              />
            </div>
            <div className="card-content">
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
  id: PropTypes.string.isRequired
};
export default ProductCard;
