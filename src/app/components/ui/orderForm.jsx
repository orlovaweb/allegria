import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./orderForm.css";

const OrderForm = ({ user }) => {
  const { name, surname, phone, email, adress } = user;
  const {
    register,
    handleSubmit,
    formState: { isDirty },
    watch
  } = useForm();
  const type = watch("typeDelivery");
  const submitAction = (data) => {
    console.log(data);
  };

  return (
    <div className="order-form">
      <div className="input-text-wrapper">
        <p className="input-text-field">{name}</p>
      </div>
      <div className="input-text-wrapper ">
        <p className="input-text-field">{surname}</p>
      </div>
      <div className="input-text-wrapper">
        <p className="input-text-field">+7{phone}</p>
      </div>
      <div className="input-text-wrapper">
        <p className="input-text-field">{email}</p>
      </div>
      <Link to="/account/personalInfo">
        <p className="order-form__edit">Редактировать</p>
      </Link>
      <h4>Доставка</h4>
      {adress ? (
        <div>
          <p className="order-form__delivery">
            {user.adress.flat
              ? `${user.adress.wayDeliver.label} по адресу г. ${user.adress.town}, ${user.adress.street}, д. ${user.adress.house}, кв. ${user.adress.flat}`
              : `${user.adress.wayDeliver.label} по адресу г. ${user.adress.town}, ${user.adress.street}, д.${user.adress.house}`}
          </p>
          <Link to="/account/adress">
            <p className="order-form__edit">Редактировать</p>
          </Link>
        </div>
      ) : (
        <Link to="/account/adress">
          <p className="order-form__edit">Выберите способ доставки</p>
        </Link>
      )}
      <h4>Способ оплаты</h4>
      <form onSubmit={handleSubmit(submitAction)}>
        <p className="order-form__radio">
          <input
            id="radio-1"
            type="radio"
            value="online"
            {...register("typeDelivery", { required: true })}
          />
          <label htmlFor="radio-1">Карточкой на сайте</label>
        </p>
        <p className="order-form__radio">
          <input
            id="radio-2"
            type="radio"
            value="uponReceipt"
            {...register("typeDelivery", { required: true })}
          />
          <label htmlFor="radio-2">При получении заказа</label>
        </p>

        <button className="btn order-form__btn" disabled={!isDirty || !adress}>
          {type ? (type === "online" ? "Оплатить" : "Заказать") : "Заказать"}
        </button>
      </form>
    </div>
  );
};
OrderForm.propTypes = {
  user: PropTypes.object
};
export default OrderForm;
