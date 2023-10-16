import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAuthError, resetPassword } from "../../store/users";
import "../common/form/form.css";

const ForgotPasswordForm = () => {
  const enterError = useSelector(getAuthError());
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });

  const submitAction = (data) => {
    console.log(data);
    dispatch(resetPassword(data.email));
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
          {errors.email && <p className="invalid-feedback">Введите почту</p>}
        </div>

        {enterError && (
          <p className="invalid-feedback login-error">{enterError}</p>
        )}
        <button className="btn btn-enter">Отправить</button>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
