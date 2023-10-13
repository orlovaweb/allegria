import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, uploadUser } from "../../../store/users";
import Select from "react-select";
import "./accountParts.css";
import Loader from "../../pages/loader/loader";
import { useState } from "react";
const deliveryOptions = [
  {
    value: "post",
    label: "Почта России"
  },
  { value: "courier", label: "Курьером" }
];

const PersonalAdress = () => {
  const user = useSelector(getCurrentUserData());
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      town: user?.adress ? ` ${user?.adress?.town}` : "",
      street: user?.adress ? ` ${user?.adress?.street}` : "",
      house: user?.adress ? ` ${user?.adress?.house}` : "",
      flat: user?.adress ? ` ${user?.adress?.flat}` : ""
    }
  });
  const handleEditAdress = () => {
    setShowForm(true);
  };
  const submitAction = (data) => {
    const newDataUser = { ...user, adress: data };
    dispatch(uploadUser(newDataUser));
    setShowForm(false);
  };
  useEffect(() => {}, [showForm]);
  if (!user) {
    return <Loader />;
  }

  return (
    <section className="personal-adress">
      <div className="personal-adress__data">
        {!user.adress || showForm ? (
          <form
            className="personal-adress__form"
            onSubmit={handleSubmit(submitAction)}
          >
            <div className="input-text-wrapper">
              <Controller
                name="wayDeliver"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    options={deliveryOptions}
                    className="input-text-field personal-adress__select"
                    classNamePrefix="custom-select-adress"
                    placeholder="Способ доставки"
                    defaultValue={user?.adress ? user.adress.wayDeliver : ""}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="input-text-wrapper">
              <input
                className={
                  errors.town
                    ? "input-text-field is-invalid"
                    : "input-text-field"
                }
                placeholder="Город"
                {...register("town", { required: true })}
              />
              {errors.town && (
                <p className="invalid-feedback">Заполните город</p>
              )}
            </div>
            <div className="input-text-wrapper">
              <input
                className={
                  errors.street
                    ? "input-text-field is-invalid"
                    : "input-text-field"
                }
                placeholder="Улица"
                {...register("street", { required: true })}
              />
              {errors.street && (
                <p className="invalid-feedback">Заполните улицу</p>
              )}
            </div>
            <div className="input-home-wrapper">
              <div className="input-text-wrapper input-home__item">
                <input
                  className={
                    errors.house
                      ? "input-text-field is-invalid"
                      : "input-text-field"
                  }
                  placeholder="Дом"
                  {...register("house", { required: true })}
                />
                {errors.house && (
                  <p className="invalid-feedback">Заполните дом</p>
                )}
              </div>
              <div className="input-text-wrapper input-home__item">
                <input
                  className="input-text-field"
                  placeholder="Квартира"
                  {...register("flat")}
                />
              </div>
            </div>
            <button
              className="btn btn-edit-adress"
              type="submit"
              disabled={!isDirty}
            >
              Сохранить
            </button>
          </form>
        ) : (
          <h1>
            {user.adress.flat
              ? `Доставка ${user.adress.wayDeliver.label} по адресу г. ${user.adress.town}, ${user.adress.street}, д. ${user.adress.house}, кв. ${user.adress.flat}`
              : `Доставка ${user.adress.wayDeliver.label} по адресу г. ${user.adress.town}, ${user.adress.street}, д.${user.adress.house}`}
          </h1>
        )}
      </div>
      <div className="personal-adress__cta">
        {user?.adress && !showForm ? (
          <p className="personal-adress__edit" onClick={handleEditAdress}>
            Редактировать
          </p>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default PersonalAdress;
