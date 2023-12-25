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
import { transformGoods } from "../utils/transformGoods";
import "./favorite.css";

const Favorite = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const goods = useSelector(getGoods());
  const favoriteArrayGlobal = useSelector(getFavorite());
  const unauthorizedFavoriteArray = useSelector(getUnauthorizedFavorite());
  const artGoods = goods ? transformGoods(goods) : [];
  let favoriteGoods = [];
  if (goods) {
    const favoriteArrayIds = isLoggedIn
      ? favoriteArrayGlobal
        ? favoriteArrayGlobal
        : []
      : unauthorizedFavoriteArray;

    favoriteGoods = artGoods.filter((p) => favoriteArrayIds.includes(p.art));
  }
  if (!favoriteGoods.length) {
    return (
      <section className="no-favorite">
        <div className="no-favorite-wrapper">
          <h3>У Вас нет избранных товаров</h3>
          <p>
            Добавляйте вещи, которые Вам понравились, в список избранных, чтобы
            следить за их наличием, ценой, и легко найти.
          </p>
          <Link to="/goods">
            <button className="btn ">Перейти в каталог</button>
          </Link>
        </div>
      </section>
    );
  }
  return (
    <section className="favorite-section">
      <div className="account__title">
        <h2>Избранное</h2>
      </div>
      <div className="favorite-wrapper">
        <div className=" favorite__list">
          <GoodsList items={favoriteGoods} />
        </div>
      </div>
    </section>
  );
};

export default Favorite;
