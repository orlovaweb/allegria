import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import Select from "react-select";
import { getCategories } from "../../../../store/categories";
import { getSearchItem } from "../../../../store/goods";
import Breadcrumbs from "../../../common/breadcrumbs";
import DisplayCount from "../../displayCount";
import GoodsTable from "../goodsTable";
import GroupList from "../groupList/groupList";
import "./goodsList.css";

const sortOptions = [
  {
    value: { name: "lastPrice", order: "asc" },
    label: "Цена по возрастанию"
  },
  { value: { name: "lastPrice", order: "desc" }, label: "Цена по убыванию" },
  { value: { name: "discount", order: "desc" }, label: "По размеру скидки" }
];

const Goods = ({ goods }) => {
  const categories = useSelector(getCategories());
  const [selectedCat, setSelectedCat] = useState();
  const [sortBy, setSortBy] = useState(sortOptions[0].value);
  const [showFiltration, setShowFiltration] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isMobile = useMediaQuery({ maxWidth: 700 });
  const [pageSize, setPageSize] = useState(12);
  const searchText = useSelector(getSearchItem());
  const pageAddition = 12;

  useEffect(() => {
    setPageSize(pageAddition);
  }, [selectedCat, sortBy, showFiltration]);

  const handleCategorySelect = (item) => {
    setSelectedCat(item);
    setShowFiltration(false);
  };

  const clearFilter = () => {
    setSelectedCat();
    setShowFiltration(false);
  };

  const renderClassNameFilter = () => {
    if (isDesktopOrLaptop) return "goods__nav-desktop";
    else return showFiltration ? "goods__nav active-filtration" : "goods__nav";
  };
  const getSearchRegExp = (searchText) => {
    const searchArray = searchText.split(" ");
    let reg = "(";
    searchArray.forEach((e) => (reg = reg + e + "|"));
    reg = reg.slice(0, -1);
    reg = reg + ")";
    const newRegExp = new RegExp(`${reg.toLowerCase()}`);
    return newRegExp;
  };
  const getFilteredGoods = (goods) => {
    const filteredGoods = searchText
      ? goods.filter((product) =>
          getSearchRegExp(searchText).test(
            product.name.toLowerCase() +
              product.longDescription.toLowerCase() +
              product.shortDescription.toLowerCase()
          )
        )
      : selectedCat
      ? goods.filter((product) => product.category === selectedCat._id)
      : goods;
    return filteredGoods;
  };
  const filteredGoods = getFilteredGoods(goods);
  const sortedGoods = _.orderBy(filteredGoods, [sortBy.name], [sortBy.order]);
  const count = sortedGoods.length;
  const cropedGoods = [...sortedGoods].splice(0, pageSize);

  return (
    <section className="goods">
      <div className="container">
        <div className="goods__nav-breadcrumbs">
          <Breadcrumbs selectedPage={selectedCat?.name} />
        </div>
        <div className="goods-wrapper">
          <div className={renderClassNameFilter()}>
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
              {searchText
                ? "Поиск"
                : selectedCat
                ? selectedCat.name
                : "Все товары"}
            </h1>
            <div className="goods__content-detail-box">
              <div className="goods__content-count">
                <DisplayCount length={count} />
              </div>
              <div className="goods__content-right-box">
                <div className="goods__content-sort">
                  {!isMobile && <span>Сортировать:</span>}
                  <Select
                    options={sortOptions}
                    defaultValue={sortOptions[0]}
                    onChange={(e) => setSortBy(e.value)}
                    className="goods__content-sort-select"
                    classNamePrefix="custom-select"
                  />
                </div>
                {!isDesktopOrLaptop && (
                  <button
                    className="goods__content-filtration"
                    onClick={() => {
                      setShowFiltration(!showFiltration);
                    }}
                  >
                    Фильтрация
                  </button>
                )}
              </div>
            </div>
            <div className="goods__content-list">
              {count > 0 && <GoodsTable items={cropedGoods} />}
              {count === 0 && (
                <div className="on-searched-items">Ничего не нашлось</div>
              )}
            </div>
            {count > pageSize ? (
              <button
                className="btn goods__content-btn"
                onClick={() => setPageSize(pageSize + pageAddition)}
              >
                Показать больше
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
Goods.propTypes = {
  goods: PropTypes.array
};
export default Goods;
