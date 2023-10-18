import React from "react";
import { useSelector } from "react-redux";
import GoodsList from "../components/ui/goodsParts/goodsTable";
import { getGoods } from "../store/goods";
import { getFavorite, getIsLoggedIn } from "../store/users";
import "./favorite.css";

const Favorite = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const goods = useSelector(getGoods());
  const favoriteArrayGlobal = useSelector(getFavorite());
  let favoriteGoods = [];
  if (goods) {
    const favoriteArrayIds = isLoggedIn
      ? favoriteArrayGlobal
        ? favoriteArrayGlobal
        : []
      : localStorage.favorite
      ? JSON.parse(localStorage.favorite)
      : [];
    favoriteGoods = goods.filter((p) => favoriteArrayIds.includes(p._id));
  }
  if (!favoriteGoods.length) {
    return <h1>Вы еще ничего не добавили в избранное</h1>;
  }
  return (
    <>
      <div className="account__title">
        <h2>Избранное</h2>
      </div>
      <div className="favorite-wrapper">
        <div className=" favorite__list">
          {/* goods__content-list */}
          <GoodsList items={favoriteGoods} />
        </div>
      </div>
    </>
  );
};

export default Favorite;
