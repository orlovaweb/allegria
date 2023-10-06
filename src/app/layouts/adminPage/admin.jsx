import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGoods, uploadProduct } from "../../store/goods";
import useMockData from "../../utils/mockData";
import "./admin.css";
const Admin = () => {
  const dispatch = useDispatch();
  const goods = useSelector(getGoods());
  const { error, initialize, progress, status } = useMockData();
  const handleClick = () => {
    initialize();
  };
  const handleRefreshLastPrices = () => {
    goods.forEach((product) => {
      const newProduct = {
        ...product,
        lastPrice: product.price - (product.discount / 100) * product.price
      };
      dispatch(uploadProduct(newProduct));
    });
  };

  return (
    <section className="admin">
      <h1 className="admin__title"> Панель администратора</h1>
      <div className="container mt-5">
        <h3 className="admin__initial">Инициализация данных в FireBase</h3>
        <ul>
          <li>Status:{status}</li>
          <li>Progress:{progress}%</li>
          {error && <li>Error:{error}</li>}
        </ul>
        <button className="btn btn-primary" onClick={handleClick}>
          Инициализировать
        </button>
        <div className="admin__refresh-last-price">
          <button className="btn" onClick={handleRefreshLastPrices}>
            Обновить итоговую цену товаров
          </button>
        </div>
      </div>
    </section>
  );
};

export default Admin;
