import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/pages/productCard/productCard";
import GoodsList from "../../components/ui/goodsParts/goodsList";
import GoodsLoader from "../../components/ui/hoc/goodsLoader";
import { getGoods } from "../../store/goods";
import { getIsLoggedIn } from "../../store/users";

const Goods = () => {
  const params = useParams();
  const { productId } = params;
  const goods = useSelector(getGoods());
  const isLoggedIn = useSelector(getIsLoggedIn());

  const handleToggleBookMark = (id) => {
    if (isLoggedIn) {
      console.log("logged");
    } else {
      if (localStorage.favorite) {
        const favoriteArray = JSON.parse(localStorage.favorite);
        if (favoriteArray.includes(id)) {
          const newFavoriteArray = favoriteArray.filter((i) => i !== id);
          localStorage.favorite = JSON.stringify(newFavoriteArray);
        } else {
          favoriteArray.push(id);
          localStorage.favorite = JSON.stringify(favoriteArray);
        }
      } else {
        const favoriteArray = [];
        favoriteArray.push(id);
        localStorage.favorite = JSON.stringify(favoriteArray);
      }
    }
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
