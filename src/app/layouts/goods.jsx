import React from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/productCard";
import GoodsList from "../components/goodsList";

const Goods = () => {
  const params = useParams();
  const { productId } = params;

  if (productId) {
    return <ProductCard id={productId} />;
  }
  return <GoodsList />;
};

export default Goods;
