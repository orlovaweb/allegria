import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField-old";
import CheckBoxField from "../../common/form/checkBoxField";
import { useHistory } from "react-router-dom";
import "./registerForm.css";
import Modal from "../../common/modal";

const RegisterForm = () => {
  const [data, setData] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    password: "",
    repeatPassword: "",
    mailing: false,
    licence: false
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [showModalConfidential, setShowModalConfidential] = useState(false);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  const validatorConfig = {
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения"
      }
    },
    surname: {
      isRequired: {
        message: "Фамилия обязательна для заполнения"
      }
    },
    phone: {
      isRequired: {
        message: "Телефон обязателен для заполнения"
      }
    },
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения"
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число"
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
      }
    },
    repeatPassword: {
      isRequired: {
        message: "Введите повторно пароль"
      },
      isEqual: {
        message: "Введенные пароли не совпадают"
      }
    },
    licence: {
      isRequired: {
        message:
          "Вы не можете использовать наш сервис без согласия с политикой конфиденциальности"
      }
    }
  };
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    console.log({ data });
  };
  return (
    <>
      <h1 className="modal-title modal-title-register">Регистрация</h1>
      <div className="form-register-wrapper">
        <form className="form-register" onSubmit={handleSubmit}>
          <div className="form-register-row">
            <TextField
              label=""
              name="name"
              value={data.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Имя"
            />
            <TextField
              label=""
              name="surname"
              value={data.surname}
              onChange={handleChange}
              error={errors.surname}
              placeholder="Фамилия"
            />
          </div>
          <div className="form-register-row">
            <TextField
              label=""
              name="phone"
              value={data.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="Телефон"
            />
            <TextField
              label=""
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="E-mail"
            />
          </div>
          <div className="form-register-row">
            <TextField
              label=""
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Пароль"
            />
            <TextField
              label=""
              type="password"
              name="repeatPassword"
              value={data.repeatPassword}
              onChange={handleChange}
              error={errors.repeatPassword}
              placeholder="Повторно пароль"
            />
          </div>
          <div className="form-register-checks">
            <CheckBoxField
              value={data.mailing}
              onChange={handleChange}
              name="mailing"
              error={errors.mailing}
            >
              Подписаться на рассылку
            </CheckBoxField>
            <CheckBoxField
              value={data.licence}
              onChange={handleChange}
              name="licence"
              error={errors.licence}
            >
              Я согласен с{" "}
              <button
                className="modal-confidential-btn"
                onClick={() => setShowModalConfidential(true)}
              >
                политикой конфиденциальности
              </button>
            </CheckBoxField>
          </div>
          <div className="form-register-row form-register-row-centered ">
            <button
              className="btn btn-register"
              type="submit"
              disabled={!isValid}
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
    </>
  );
};

export default RegisterForm;
