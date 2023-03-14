import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/productCard";
import GoodsList from "../components/goodsList";
import api from "../api";

const Goods = () => {
  const params = useParams();
  const { productId } = params;
  const [goods, setGoods] = useState();

  useEffect(() => {
    api.goods.fetchAll().then((data) => setGoods(data));
  }, []);

  const handleToggleBookMark = (id) => {
    const elementIndex = goods.findIndex((c) => c._id === id);
    const newGoods = [...goods];
    if (newGoods[elementIndex].bookmark) {
      newGoods[elementIndex].bookmark = false;
    } else newGoods[elementIndex].bookmark = true;
    setGoods(newGoods);
  };

  if (productId) {
    return (
      <ProductCard id={productId} onToggleBookMark={handleToggleBookMark} />
    );
  }
  return <GoodsList goods={goods} onToggleBookMark={handleToggleBookMark} />;
};

export default Goods;
