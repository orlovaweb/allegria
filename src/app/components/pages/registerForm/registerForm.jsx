import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addSubscription, getSubscription } from "../../../store/subscription";
import {
  getAuthError,
  getIsCreated,
  getVerifyEmail,
  getWasShownVerify,
  removeError,
  resetVerifyEmail,
  signUp
} from "../../../store/users";
import "../../common/form/form.css";
import Modal from "../../common/modal";
import "./registerForm.css";
import IconEye from "../../common/svgs/iconEye";
import IconCrossedEye from "../../common/svgs/iconCrossedEye";

const RegisterForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModalConfidential, setShowModalConfidential] = useState(false);
  const [verifyModal, setVerifyModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const registerError = useSelector(getAuthError());
  const isCreated = useSelector(getIsCreated());
  const verifyEmail = useSelector(getVerifyEmail());
  const wasShownVerify = useSelector(getWasShownVerify());
  const subscriptionObj = useSelector(getSubscription());
  const subscriptionArray = subscriptionObj
    ? subscriptionObj.map((s) => s.email)
    : [];

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    resetField,
    getValues,
    control
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      name: "",
      surname: "",
      phone: "",
      email: "",
      password: "",
      repeatPassword: ""
    }
  });

  useEffect(() => {
    dispatch(removeError());
  }, [!isDirty]);

  useEffect(() => {
    if (isCreated) {
      reset();
      localStorage.removeItem("favorite");
      localStorage.removeItem("cart");
    }
  }, [isCreated]);

  useEffect(() => {
    if (registerError) {
      resetField("password");
      resetField("repeatPassword");
    }
  }, [registerError]);

  useEffect(() => {
    if (isCreated && verifyEmail && !wasShownVerify) {
      setVerifyModal(true);
      dispatch(resetVerifyEmail());
    }
  }, [isCreated, verifyEmail]);

  const submitAction = (data) => {
    data.phone = data.phone
      // .replace("+7", "8")
      .slice(2)
      .replaceAll("-", "")
      .replace("(", "")
      .replace(")", "")
      .replaceAll(" ", "");
    data.name = data.name.trim();
    data.surname = data.surname.trim();
    delete data.repeatPassword;
    const newData = {
      ...data,
      cart: localStorage.cart ? JSON.parse(localStorage.cart) : [],
      favorite: localStorage.favorite ? JSON.parse(localStorage.favorite) : []
    };
    delete newData.licence;
    if (newData.mailing) {
      if (subscriptionArray && !subscriptionArray.includes(newData.email)) {
        dispatch(addSubscription(newData.email));
      }
    }
    delete newData.mailing;
    dispatch(signUp(newData));
  };
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <section className="register">
      <h1 className="modal-title modal-title-register">Регистрация</h1>
      <div className="form-register-wrapper">
        <form className="form-register" onSubmit={handleSubmit(submitAction)}>
          <div className="form-register-row">
            <div className="input-text-wrapper">
              <input
                className={
                  errors.name
                    ? "input-text-field is-invalid"
                    : "input-text-field"
                }
                placeholder="Имя"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Имя обязательно для заполнения"
                  },
                  pattern: {
                    value: /^[A-Za-zА-Яа-я-']+$/g,
                    message: "Некорректное имя"
                  }
                })}
              />
              {errors.name && (
                <p className="invalid-feedback">{errors.name.message}</p>
              )}
            </div>
            <div className="input-text-wrapper">
              <input
                className={
                  errors.surname
                    ? "input-text-field is-invalid"
                    : "input-text-field"
                }
                placeholder="Фамилия"
                {...register("surname", {
                  required: {
                    value: true,
                    message: "Фамилия обязательна для заполнения"
                  },
                  pattern: {
                    value: /^[A-Za-zА-Яа-я-']+$/g,
                    message: "Некорректная фамилия"
                  }
                })}
              />
              {errors.surname && (
                <p className="invalid-feedback">{errors.surname.message}</p>
              )}
            </div>
          </div>
          <div className="form-register-row">
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
            <div className="input-text-wrapper">
              <input
                className={
                  errors.email
                    ? "input-text-field is-invalid"
                    : "input-text-field"
                }
                placeholder="E-mail"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Электронная почта обязательна для заполнения"
                  },
                  pattern: {
                    value: /^[A-Za-z-_.0-9]+@[a-z]+\.[a-z]+$/g,
                    message: "Email введен некорректно"
                  }
                })}
              />
              {(errors.email || registerError) && (
                <p className="invalid-feedback">
                  {errors.email?.message || registerError}
                </p>
              )}
            </div>
          </div>
          <div className="form-register-row">
            <div className="input-text-wrapper">
              <input
                className={
                  errors.password
                    ? "input-text-field is-invalid"
                    : "input-text-field"
                }
                type={showPassword ? "text" : "password"}
                placeholder="Пароль"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Пароль обязателен для заполнения"
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
              <button
                className="icon-eye"
                type="button"
                onClick={toggleShowPassword}
              >
                {!showPassword ? <IconEye /> : <IconCrossedEye />}
              </button>
              {errors.password && (
                <p className="invalid-feedback">{errors.password?.message}</p>
              )}
            </div>
            <div className="input-text-wrapper">
              <input
                className={
                  errors.repeatPassword
                    ? "input-text-field is-invalid"
                    : "input-text-field"
                }
                type={showPassword ? "text" : "password"}
                placeholder="Повторно пароль"
                {...register("repeatPassword", {
                  required: {
                    value: true,
                    message: "Пароль обязателен для заполнения"
                  },
                  pattern: {
                    value: new RegExp(`^${getValues("password")}`),
                    message: "Введенные пароли не совпадают"
                  },
                  minLength: {
                    value: 8,
                    message: "Пароль должен состоять минимум из 8 символов"
                  }
                })}
              />
              <button
                className="icon-eye"
                type="button"
                onClick={toggleShowPassword}
              >
                {!showPassword ? <IconEye /> : <IconCrossedEye />}
              </button>
              {errors.repeatPassword && (
                <p className="invalid-feedback">
                  {errors.repeatPassword?.message}
                </p>
              )}
            </div>
          </div>
          <div className="form-register-checks">
            <div className="form-check">
              <Controller
                name="mailing"
                control={control}
                defaultValue={true}
                render={({ field }) => (
                  <>
                    <label className="checkbox style-c">
                      <input
                        defaultChecked="false"
                        className="checkbox"
                        type="checkbox"
                        {...field}
                      />
                      <div className="checkbox__checkmark"></div>
                      <div className="checkbox__body">
                        Подписаться на рассылку
                      </div>
                    </label>
                  </>
                )}
              />
            </div>
            <div className="form-check">
              <Controller
                name="licence"
                control={control}
                defaultValue={true}
                rules={{ required: true }}
                render={({ field }) => (
                  <label className="checkbox style-c">
                    <input
                      defaultChecked="true"
                      className={
                        errors.licence
                          ? "form-check-input is-invalid checkbox"
                          : "form-check-input checkbox"
                      }
                      type="checkbox"
                      {...field}
                    />
                    <div className="checkbox__checkmark"></div>
                    <div className="checkbox__body">
                      Я согласен с
                      <span
                        className="modal-confidential-btn"
                        onClick={() => setShowModalConfidential(true)}
                      >
                        политикой конфиденциальности
                      </span>
                    </div>
                  </label>
                )}
              />
              {errors.licence && (
                <p className="invalid-feedback">
                  Вы не можете использовать наш сервис без согласия с политикой
                  конфиденциальности
                </p>
              )}
            </div>
          </div>

          <div className="form-register-row form-register-row-centered ">
            <button
              className="btn btn-register"
              type="submit"
              disabled={!isDirty || !isValid}
            >
              Зарегистрироваться
            </button>
            <p className="go-to-login-back">
              У меня уже есть аккаунт, чтобы
              <button
                onClick={() => {
                  history.goBack();
                  history.state = { from: "registerForm" };
                }}
              >
                войти
              </button>
            </p>
          </div>
        </form>
      </div>
      <Modal
        active={showModalConfidential}
        setActive={setShowModalConfidential}
      >
        <div>
          <p>
            Настоящая политика конфиденциальности описывает, как мы собираем,
            используем и защищаем информацию, которую вы предоставляете при
            использовании нашего интернет-магазина. Мы уделяем большое внимание
            защите вашей личной информации и делаем все возможное, чтобы
            обеспечить ее безопасность.{" "}
          </p>
          <h2>Сбор информации</h2>
          <p>
            Мы собираем информацию, которую вы предоставляете нам при оформлении
            заказа на нашем сайте. Эта информация может включать ваше имя, адрес
            электронной почты, адрес доставки, номер телефона и данные вашей
            кредитной карты. Мы также можем собирать информацию о ваших
            интересах и предпочтениях, чтобы улучшить наш сервис и предложить
            вам более релевантные товары.
          </p>
          <h2>Использование информации</h2>
          <p>
            Мы используем вашу информацию для обработки заказов и обеспечения
            качественного сервиса. Мы также можем использовать вашу информацию
            для отправки вам рекламных сообщений и специальных предложений, если
            вы дали на это свое согласие. Мы не передаем вашу информацию третьим
            лицам без вашего явного согласия.
          </p>
          <h2> Защита информации</h2>
          <p>
            Мы принимаем все необходимые меры для защиты вашей личной информации
            от несанкционированного доступа, использования и раскрытия. Мы
            используем надежные технологии и процедуры для обеспечения
            безопасности данных.
          </p>
          <h2> Изменения политики конфиденциальности</h2>
          <p>
            Мы можем время от времени вносить изменения в нашу политику
            конфиденциальности. Если мы внесем какие-либо изменения, мы
            опубликуем их на нашем сайте. Мы рекомендуем периодически проверять
            нашу политику конфиденциальности для ознакомления с изменениями.
          </p>
          <h2> Контактная информация</h2>
          <p>
            Если у вас есть какие-либо вопросы или комментарии по поводу нашей
            политики конфиденциальности, пожалуйста, свяжитесь с нами по
            электронной почте или телефону, указанным на нашем сайте. Мы будем
            рады помочь вам.
          </p>
        </div>
      </Modal>
      <Modal active={verifyModal} setActive={setVerifyModal} isVerify={true}>
        <div className="modal__inner-content">
          <div className="verify-modal">
            <div>
              <h1 className="modal-title verify-modal__title">
                Подтвердите E-mail
              </h1>
            </div>
            <p>
              На почту {verifyEmail} было отправлено письмо для подтверждения
              вашей регистрации.
            </p>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default RegisterForm;
