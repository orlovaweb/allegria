import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/ui/cartItem";
import OrderForm from "../components/ui/orderForm";
import { getGoods } from "../store/goods";
import {
  getCart,
  getCurrentUserData,
  getIsLoggedIn,
  getUnauthorizedCart
} from "../store/users";
import "./shoppingCart.css";

const ShoppingCart = ({ setModalLogin }) => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const goods = useSelector(getGoods());
  const cartArrayGlobal = useSelector(getCart());
  const unauthorizedCartArray = useSelector(getUnauthorizedCart());
  const user = useSelector(getCurrentUserData());
  let shoppingCart = [];

  if (goods) {
    const chosenObjectArray = isLoggedIn
      ? cartArrayGlobal
        ? cartArrayGlobal
        : []
      : unauthorizedCartArray;

    chosenObjectArray.forEach((obj) => {
      goods.forEach((product) => {
        if (obj.productId === product._id) {
          const cartObj = { ...product, orderCount: obj.count };
          shoppingCart.push(cartObj);
        }
      });
    });
  }
  if (!shoppingCart.length) {
    return (
      <section className="empty-cart">
        <div className="empty-cart-wrapper">
          <h3>Ваша корзина пуста</h3>
          <div className="empty-cart__img"></div>
          <p>
            Добавьте что-то, чтобы сэкономить время и сделать шопинг еще более
            приятным.
          </p>
          <Link to="/goods">
            <button className="btn ">Перейти в каталог</button>
          </Link>
        </div>
      </section>
    );
  } else {
    const totalPrice = () => {
      return shoppingCart.reduce((sum, item) => {
        return sum + item.lastPrice * item.orderCount;
      }, 0);
    };
    return (
      <section className="cart">
        <h3>Корзина</h3>
        <div className="cart-wrapper">
          {isLoggedIn && (
            <div className="cart__order-form">
              <OrderForm user={user} />
            </div>
          )}
          {!isLoggedIn && (
            <div className="cart__offer-enter">
              <p>Чтобы сделать заказ, пройдите авторизацию.</p>
              <button className="btn" onClick={() => setModalLogin(true)}>
                Войти
              </button>
            </div>
          )}
          <div className="cart__table">
            {shoppingCart.map((item) => (
              <CartItem key={nanoid()} item={item} />
            ))}
            <p className="cart__table-total">
              Итого:<span>{`${totalPrice()} руб.`}</span>
            </p>
          </div>
        </div>
      </section>
    );
  }
};
ShoppingCart.propTypes = {
  setModalLogin: PropTypes.func
};
export default ShoppingCart;
