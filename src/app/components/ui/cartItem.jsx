import PropTypes from "prop-types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBrands } from "../../store/brands";
import {
  getIsLoggedIn,
  removeFromCart,
  removeFromUnauthorizedCart,
  uploadCountInCart,
  uploadCountInUnauthorizedCart
} from "../../store/users";
import CounterSubmit from "../common/counter/counterSubmit";
import Price from "../common/price";
import "./cartItem.css";
import SizeShoppingCart from "./sizeShoppingCart";

const CartItem = ({ item }) => {
  const {
    _id,
    brand,
    shortDescription,
    img,
    price,
    discount,
    size,
    count,
    orderCount,
    art
  } = item;
  const brands = useSelector(getBrands());
  const [newCount, setNewCount] = useState(orderCount);
  const { handleSubmit } = useForm();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const dispatch = useDispatch();

  const getBrandName = (id) => {
    if (brands) {
      const brandIndex = brands.findIndex((el) => {
        return el._id === id;
      });

      return brands[brandIndex].name;
    }
  };
  const submitCount = () => {
    if (isLoggedIn) {
      dispatch(uploadCountInCart({ productId: _id, count: newCount }));
    } else {
      dispatch(
        uploadCountInUnauthorizedCart({ productId: _id, count: newCount })
      );
    }
  };
  const onIncrement = () => {
    setNewCount((prevState) => prevState + 1);
  };
  const onDecrement = () => {
    if (newCount > 1) {
      setNewCount((prevState) => prevState - 1);
    }
  };
  const handleDelete = () => {
    if (isLoggedIn) {
      dispatch(removeFromCart({ productId: _id, count: newCount }));
    } else {
      dispatch(removeFromUnauthorizedCart({ productId: _id, count: newCount }));
    }
  };
  return (
    <div className="cart-item">
      <Link to={`/goods/${art}`}>
        <div className="cart-item__img">
          <img src={process.env.PUBLIC_URL + "/img/" + img} alt="clothes" />
        </div>
      </Link>
      <div className="cart-item__description">
        <p className="cart-item__description-brand">{getBrandName(brand)}</p>
        <p className="cart-item__description-shortDescription">
          {shortDescription}
        </p>
        <div className="cart-item__description-price">
          <Price price={price} discount={discount} />
        </div>
        {size && (
          <div className="cart-item__description-size">
            <p>
              Размер{" "}
              <span>
                <SizeShoppingCart size={size} />
              </span>
            </p>
          </div>
        )}
        <div
          className={
            count < 5
              ? "cart-item__description-count tiny-count"
              : "cart-item__description-count"
          }
        >
          <span>Осталось {count} шт.</span>
        </div>
        <form onSubmit={handleSubmit(submitCount)}>
          <CounterSubmit
            count={newCount}
            onDecrement={onDecrement}
            onIncrement={onIncrement}
          />
        </form>
        <div className="cart-item__description-close" onClick={handleDelete}>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired
};
export default CartItem;
