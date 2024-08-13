import React from "react";
import { useSelector } from "react-redux";

import { getGoods } from "../../../store/goods";

import AdminGoodsItem from "./adminGoodsItem";

const AdminGoodsTable = () => {
  const goods = useSelector(getGoods());
  if (goods) {
    return (
      <>
        <section className="goods-table">
          <div className="product-header">Арт</div>
          <div className="product-header">Название</div>
          <div className="product-header">Цена</div>
          <div className="product-header">Скидка</div>
          <div className="product-header">Размер</div>
          <div className="product-header">Остаток</div>
          <div className="product-header">Редактировать/Удалить</div>
          {goods.map((product) => (
            <AdminGoodsItem product={product} key={product._id} />
          ))}

          <p>Всего {goods.length}</p>
        </section>
        <button className="btn">Добавить товар</button>
      </>
    );
  } else return <p>Loading...</p>;
};

export default AdminGoodsTable;
