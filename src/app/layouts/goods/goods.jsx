import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GoodsList from "../../components/ui/goodsParts/goodsList";
import GoodsLoader from "../../components/ui/hoc/goodsLoader";
import { getGoods } from "../../store/goods";
import ProductCard from "../../components/pages/productCard/productCard";

const Goods = () => {
  const params = useParams();
  const { productId } = params;
  const goods = useSelector(getGoods());

  const handleToggleBookMark = (id) => {
    const elementIndex = goods.findIndex((c) => c._id === id);
    const newGoods = [...goods];
    if (newGoods[elementIndex].bookmark) {
      newGoods[elementIndex].bookmark = false;
    } else newGoods[elementIndex].bookmark = true;
    console.log(newGoods);
  };

  return (
    <>
      <GoodsLoader>
        {productId ? (
          <ProductCard id={productId} onToggleBookMark={handleToggleBookMark} />
        ) : (
          <GoodsList goods={goods} onToggleBookMark={handleToggleBookMark} />
        )}
      </GoodsLoader>
    </>
  );
};

export default Goods;
