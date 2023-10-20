import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getAuthError,
  getCurrentUserData,
  getIsLoggedIn,
  login,
  uploadFavorite
} from "../../store/users";
import "../common/form/form.css";

const LoginForm = ({ onSubmit }) => {
  const history = useHistory();
  const loginError = useSelector(getAuthError());
  const isLoggedIn = useSelector(getIsLoggedIn());
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
            {!showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#B7C1C5"
                viewBox="0 0 16 16"
              >
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#B7C1C5"
                viewBox="0 0 16 16"
              >
                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
              </svg>
            )}
          </button>
          {errors.password && (
            <p className="invalid-feedback">Введите пароль</p>
          )}
        </div>
        {loginError && (
          <p className="invalid-feedback login-error">{loginError}</p>
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
