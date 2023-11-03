import React from "react";
import { Controller, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, uploadUser } from "../../../store/users";
import Loader from "../../pages/loader/loader";
import "./accountParts.css";

const PersonalInfo = () => {
  const user = useSelector(getCurrentUserData());
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      name: user?.name ? ` ${user?.name}` : "",
      surname: user?.surname ? ` ${user?.surname}` : "",
      phone: user?.phone ? ` ${user?.phone}` : ""
    }
  });
  const submitAction = (data) => {
    console.log("data", data);
    const name = data.name.trim();
    const surname = data.surname.trim();
    const phone = data.phone
      .replace("+7", "")
      .replaceAll("-", "")
      .replace("(", "")
      .replace(")", "")
      .replaceAll(" ", "");
    const newDataUser = { ...user, name, surname, phone };
    console.log("newUser = ", newDataUser);
    dispatch(uploadUser(newDataUser, "/account/personalInfo"));
  };

  if (!user) {
    return <Loader />;
  }
  return (
    <section className="personal-info">
      <form onSubmit={handleSubmit(submitAction)}>
        <div className="form-register-row personal-info-row">
          <div className="input-text-wrapper">
            <input
              type="text"
              className={
                errors.name ? "input-text-field is-invalid" : "input-text-field"
              }
              placeholder="Имя"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="invalid-feedback">Имя обязательно для заполнения</p>
            )}
          </div>
          <div className="input-text-wrapper ">
            <input
              className={
                errors.surname
                  ? "input-text-field is-invalid"
                  : "input-text-field"
              }
              placeholder="Фамилия"
              {...register("surname", { required: true })}
            />
            {errors.surname && (
              <p className="invalid-feedback">
                Фамилия обязательна для заполнения
              </p>
            )}
          </div>
        </div>
        <div className="form-register-row personal-info-row">
          <div className="input-text-wrapper">
            <Controller
              control={control}
              name="phone"
              rules={{
                required: {
                  value: true,
                  message: "Телефон обязателен для заполнения"
                },
                pattern: {
                  value: /^([^_]+)$/,
                  message: "Введите номер телефона полностью"
                }
              }}
              render={({ field: { onChange, name, value, onBlur } }) => (
                <PatternFormat
                  className={
                    errors.phone
                      ? "input-text-field is-invalid"
                      : "input-text-field"
                  }
                  format="+7 (###) ###-##-##"
                  name={name}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  placeholder="+7 (###) ###-##-##"
                  allowEmptyFormatting
                  mask="_"
                />
              )}
            />
            {errors.phone && (
              <p className="invalid-feedback">{errors.phone?.message}</p>
            )}
          </div>
          <div className="input-text-wrapper personal-info__email-wrapper">
            <p className="input-text-field">{user.email}</p>
            <span className="tooltiptext">
              Ваш аккаунт привязан к почте. Её нельзя изменить.
            </span>
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
    </section>
  );
};

export default PersonalInfo;
