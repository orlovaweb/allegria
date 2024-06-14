import React from "react";
import { useSelector } from "react-redux";
import { getGoods } from "../../../store/goods";
import IconDelete from "../../common/svgs/iconDelete";
import IconEdit from "../../common/svgs/iconEdit";
import AdminSize from "./adminSize";
const AdminGoods = () => {
  const goods = useSelector(getGoods());
  if (goods) {
    return (
      <section className="goods-table">
        <div className="product-header">Арт</div>
        <div className="product-header">Название</div>
        <div className="product-header">Цена</div>
        <div className="product-header">Скидка</div>
        <div className="product-header">Размер</div>
        <div className="product-header">Остаток</div>
        <div className="product-header">Редактировать/Удалить</div>
        {goods.map((product) => (
          // <div className="product-row" key={product._id}>
          <>
            <div className="product-art">{product.art}</div>
            {/* <div className="product-art">...{product.art.slice(-4)}</div> */}
            <div className="product-name">{product.name}</div>
            <div className="product-price">{product.price}</div>
            <div className="product-discount">{product.discount}</div>
            <div className="product-size">
              {product.size && <AdminSize sizeId={product.size} />}
            </div>
            <div className="product-count">{product.count}</div>
            <div className="product-delete">
              <IconEdit />
              <IconDelete />
            </div>
          </>
        ))}

        <p>Всего {goods.length}</p>
      </section>
    );
  } else return <p>Loading...</p>;
};

export default AdminGoods;
