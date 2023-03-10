import React, { useState, useEffect } from "react";
import GroupList from "./groupList";
import Breadcrumbs from "./breadcrumbs";
import DisplayCount from "./displayCount";
import GoodsTable from "./goodsTable";
import api from "../api";
import "./goodsList.css";
import _ from "lodash";

const sortOptions = {
  1: { name: "lastPrice", order: "asc" },
  2: { name: "lastPrice", order: "desc" },
  3: { name: "discount", order: "desc" }
};

const Goods = () => {
  const [goods, setGoods] = useState();
  const [categories, setСategories] = useState();
  const [selectedCat, setSelectedCat] = useState();
  const [sortBy, setSortBy] = useState(sortOptions["1"]);

  useEffect(() => {
    api.goods.fetchAll().then((data) => setGoods(data));
  }, []);
  useEffect(() => {
    api.categories.fetchAll().then((data) => setСategories(data));
  }, []);

  const handleCategorySelect = (item) => {
    setSelectedCat(item);
  };
  const handleToggleBookMark = (id) => {
    const elementIndex = goods.findIndex((c) => c._id === id);
    const newGoods = [...goods];
    if (newGoods[elementIndex].bookmark) {
      newGoods[elementIndex].bookmark = false;
    } else newGoods[elementIndex].bookmark = true;
    setGoods(newGoods);
  };
  const clearFilter = () => {
    setSelectedCat();
  };

  if (goods) {
    const filteredGoods = selectedCat
      ? goods.filter((product) => _.isEqual(product.category, selectedCat))
      : goods;
    filteredGoods.forEach((product) => {
      product.lastPrice =
        product.price - (product.discount / 100) * product.price;
    });
    const sortedGoods = _.orderBy(filteredGoods, [sortBy.name], [sortBy.order]);
    const count = sortedGoods.length;

    return (
      <section className="goods">
        <div className="container">
          <div className="goods-wrapper">
            <div className="goods__nav">
              <div className="goods__nav-breadcrumbs">
                <Breadcrumbs selectedPage={selectedCat?.name} />
              </div>
              {categories && (
                <>
                  <GroupList
                    items={categories}
                    onItemSelect={handleCategorySelect}
                    selectedItem={selectedCat}
                  />
                  <button className="btn" onClick={clearFilter}>
                    Все товары
                  </button>
                </>
              )}
            </div>
            <div className="goods__content">
              <h1 className="goods__content-title">
                {selectedCat ? selectedCat.name : "Все товары"}
              </h1>
              <div className="goods__content-detail-box">
                <div className="goods__content-count">
                  <DisplayCount length={count} />
                </div>
                <div className="goods__content-sort">
                  <span>Сортировать:</span>
                  <select
                    onChange={(e) => setSortBy(sortOptions[e.target.value])}
                  >
                    <option value="1">Цена по возрастанию</option>
                    <option value="2">Цена по убыванию</option>
                    <option value="3">По размеру скидки</option>
                  </select>
                </div>
              </div>
              <div className="goods__content-list">
                {count > 0 && (
                  <GoodsTable
                    items={sortedGoods}
                    onToggleBookMark={handleToggleBookMark}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return "Loading...";
};

export default Goods;
