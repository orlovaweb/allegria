import React, { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import Breadcrumbs from "./breadcrumbs";
import DisplayCount from "./displayCount";
import GoodsTable from "./goodsTable";
import api from "../api";
import "./goodsList.css";
import _ from "lodash";

const sortOptions = [
  {
    value: { name: "lastPrice", order: "asc" },
    label: "Цена по возрастанию"
  },
  { value: { name: "lastPrice", order: "desc" }, label: "Цена по убыванию" },
  { value: { name: "discount", order: "desc" }, label: "По размеру скидки" }
];

const Goods = ({ goods, onToggleBookMark }) => {
  const [categories, setСategories] = useState();
  const [selectedCat, setSelectedCat] = useState();
  const [sortBy, setSortBy] = useState(sortOptions[0].value);

  useEffect(() => {
    api.categories.fetchAll().then((data) => setСategories(data));
  }, []);

  const handleCategorySelect = (item) => {
    setSelectedCat(item);
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
                  <Select
                    options={sortOptions}
                    defaultValue={sortOptions[0]}
                    onChange={(e) => setSortBy(e.value)}
                    className="goods__content-sort-select"
                    classNamePrefix="custom-select"
                  />
                </div>
              </div>
              <div className="goods__content-list">
                {count > 0 && (
                  <GoodsTable
                    items={sortedGoods}
                    onToggleBookMark={onToggleBookMark}
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
Goods.propTypes = {
  goods: PropTypes.array,
  onToggleBookMark: PropTypes.func
};
export default Goods;
