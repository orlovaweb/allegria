import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/pages/productCard/productCard";
import GoodsList from "../../components/ui/goodsParts/goodsList";
import GoodsLoader from "../../components/ui/hoc/goodsLoader";
import { getGoods } from "../../store/goods";

const Goods = () => {
  const params = useParams();
  const { productId } = params;
  const goods = useSelector(getGoods());

  return (
    <>
      <GoodsLoader>
        {productId ? <ProductCard /> : <GoodsList goods={goods} />}
      </GoodsLoader>
    </>
  );
};

export default Goods;
