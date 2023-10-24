import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import GoodsList from "../components/ui/goodsParts/goodsTable";
import { getGoods } from "../store/goods";
import {
  getFavorite,
  getIsLoggedIn,
  getUnauthorizedFavorite
} from "../store/users";
import "./favorite.css";

const Favorite = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const goods = useSelector(getGoods());
  const favoriteArrayGlobal = useSelector(getFavorite());
  const unauthorizedFavoriteArray = useSelector(getUnauthorizedFavorite());
  let favoriteGoods = [];
  if (goods) {
    const favoriteArrayIds = isLoggedIn
      ? favoriteArrayGlobal
        ? favoriteArrayGlobal
        : []
      : unauthorizedFavoriteArray;

    favoriteGoods = goods.filter((p) => favoriteArrayIds.includes(p._id));
  }
  if (!favoriteGoods.length) {
    return (
      <section className="no-favorite">
        <h3>У Вас нет избранных товаров</h3>
        <p>
          Добавляйте вещи, которые Вам понравились, в список избранных, чтобы
          следить за их наличием, ценой, и легко найти.
        </p>
        <Link to="/goods">
          <button className="btn ">Перейти в каталог</button>
        </Link>
      </section>
    );
  }
  return (
    <>
      <div className="account__title">
        <h2>Избранное</h2>
      </div>
      <div className="favorite-wrapper">
        <div className=" favorite__list">
          <GoodsList items={favoriteGoods} />
        </div>
      </div>
    </>
  );
};

export default Favorite;
