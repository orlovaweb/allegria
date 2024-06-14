import React from "react";
import useMockData from "../../../utils/mockData";
import { useDispatch, useSelector } from "react-redux";
import { getGoods, uploadProduct } from "../../../store/goods";
const AdminInitial = () => {
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
    <>
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
      ;
    </>
  );
};

export default AdminInitial;
