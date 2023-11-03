import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getAuthError,
  getCurrentUserData,
  getIsLoggedIn,
  getIsVerified,
  login,
  uploadCart,
  uploadFavorite
} from "../../store/users";
import "../common/form/form.css";
import IconEye from "../common/svgs/iconEye";
import IconCrossedEye from "../common/svgs/iconCrossedEye";

const LoginForm = ({ onSubmit }) => {
  const history = useHistory();
  const loginError = useSelector(getAuthError());
  const isLoggedIn = useSelector(getIsLoggedIn());
  const isVerified = useSelector(getIsVerified());
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUserData());
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    reset
  } = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });
  useEffect(() => {
    if (isLoggedIn && user) {
      if (localStorage.favorite) {
        const localFavorite = JSON.parse(localStorage.favorite);
        dispatch(uploadFavorite(localFavorite));
        localStorage.removeItem("favorite");
      }
      if (localStorage.cart) {
        const localCart = JSON.parse(localStorage.cart);
        dispatch(uploadCart(localCart));
        localStorage.removeItem("cart");
      }
    }
  }, [user, isLoggedIn]);
  useEffect(() => {
    if (isLoggedIn) {
      reset();
      onSubmit();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (loginError) {
      resetField("password");
    }
  }, [loginError]);

  const submitAction = (data) => {
    const redirect = history.location.state
      ? history.location.state.from.pathname
      : "/";
    dispatch(login({ payload: data, redirect }));
  };
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitAction)}>
        <div className="input-text-wrapper">
          <input
            className={
              errors.email ? "input-text-field is-invalid" : "input-text-field"
            }
            placeholder="E-mail"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="invalid-feedback">Введите логин</p>}
        </div>
        <div className="input-text-wrapper">
          <input
            className={
              errors.password
                ? "input-text-field is-invalid"
                : "input-text-field"
            }
            type={showPassword ? "text" : "password"}
            placeholder="Пароль"
            {...register("password", { required: true })}
          />
          <button
            className="icon-eye"
            type="button"
            onClick={toggleShowPassword}
          >
            {!showPassword ? <IconEye /> : <IconCrossedEye />}
          </button>
          {errors.password && (
            <p className="invalid-feedback">Введите пароль</p>
          )}
        </div>
        {loginError && (
          <p className="invalid-feedback login-error">{loginError}</p>
        )}
        {!isVerified && (
          <p>
            Ваш акаунт не авторизированный. Пожалуйста аворизируйтесь по ссылке,
            которая вам приходила.
          </p>
        )}
        <button className="btn btn-enter">Войти</button>
      </form>
    </>
  );
};
LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
export default LoginForm;
