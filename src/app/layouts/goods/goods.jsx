import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/pages/productCard/productCard";
import GoodsList from "../../components/ui/goodsParts/goodsList";
// import api from "../../api";
import goodService from "../../services/good.service";

const Goods = () => {
  const params = useParams();
  const { productId } = params;
  const [goods, setGoods] = useState();

  useEffect(() => {
    // api.goods.fetchAll().then((data) => setGoods(data));
    getGoods();
  }, []);

  async function getGoods() {
    try {
      const { content } = await goodService.get();
      setGoods(content);
    } catch (error) {
      console.log(error);
    }
  }

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
  return (
    <>
      <GoodsList goods={goods} onToggleBookMark={handleToggleBookMark} />;
    </>
  );
};

export default Goods;
