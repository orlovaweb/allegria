import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  getAuthError,
  getCurrentUserData
} from "../../../store/users";
import Loader from "../../pages/loader/loader";

const ChangePassword = () => {
  const user = useSelector(getCurrentUserData());
  const dispatch = useDispatch();
  const changePassError = useSelector(getAuthError());
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    getValues,
    reset
  } = useForm({
    mode: "onTouched"
  });
  const submitAction = (data) => {
    console.log("submit", data);
    dispatch(changePassword(data.newPassword));
    reset();
  };
  if (!user) {
    return <Loader />;
  }
  return (
    <section className="change-password">
      <form
        className="change-password__form"
        onSubmit={handleSubmit(submitAction)}
      >
        {/* <div className="input-text-wrapper">
          <input
            type="password"
            className={
              errors.oldPassword
                ? "input-text-field is-invalid"
                : "input-text-field"
            }
            placeholder="Старый пароль"
            {...register("oldPassword", { required: true })}
          />
          {errors.oldPassword && (
            <p className="invalid-feedback">Заполните старый пароль</p>
          )}
        </div> */}
        <div className="input-text-wrapper">
          <input
            type="password"
            className={
              errors.newPassword
                ? "input-text-field is-invalid"
                : "input-text-field"
            }
            placeholder="Новый пароль"
            {...register("newPassword", {
              required: {
                value: true,
                message: "Заполните новый пароль"
              },
              pattern: {
                value: /(?=.*[0-9])(?=.*[A-Z])/g,
                message:
                  "Пароль должен содержать хотя бы одну заглавную букву и одно число"
              },
              minLength: {
                value: 8,
                message: "Пароль должен состоять минимум из 8 символов"
              }
            })}
          />
          {errors.newPassword && (
            <p className="invalid-feedback">{errors.newPassword?.message}</p>
          )}
        </div>
        <div className="input-text-wrapper">
          <input
            type="password"
            className={
              errors.repeatNewPassword
                ? "input-text-field is-invalid"
                : "input-text-field"
            }
            placeholder="Повторить пароль"
            {...register("repeatNewPassword", {
              required: {
                value: true,
                message: "Повторите новый пароль"
              },
              pattern: {
                value: new RegExp(`^${getValues("newPassword")}$`),
                message: "Введенные пароли не совпадают"
              }
            })}
          />
          {errors.repeatNewPassword && (
            <p className="invalid-feedback">
              {errors.repeatNewPassword?.message}
            </p>
          )}
        </div>
        {!isDirty && changePassError && (
          <p className="invalid-feedback register-error">{changePassError}</p>
        )}
        <button
          className="btn btn-edit-adress"
          type="submit"
          disabled={!isDirty}
        >
          Сохранить
        </button>
      </form>
    </section>
  );
};

export default ChangePassword;
