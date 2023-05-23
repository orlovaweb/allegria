import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import PropTypes from "prop-types";

const LoginForm = ({ onSubmit }) => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения "
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
        message: "Пароль должен содержать хотя бы одну цифру"
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
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
    console.log(data);
    setData({
      email: "",
      password: ""
    });
    onSubmit();
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label=""
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="E-mail"
      />
      <TextField
        label=""
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Пароль"
      />

      <button disabled={!isValid} className="btn btn-enter">
        Войти
      </button>
    </form>
  );
};
LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
export default LoginForm;
