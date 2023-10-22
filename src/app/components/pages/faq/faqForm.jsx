import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import "./faq.css";
import { useDispatch, useSelector } from "react-redux";
import { addLetter, getLetterSendingStatus } from "../../../store/letters";

const faqOptions = [
  {
    value: "question",
    label: "Вопрос"
  },
  { value: "proposal", label: "Предложение" }
];

const FaqForm = () => {
  const dispatch = useDispatch();
  const isSent = useSelector(getLetterSendingStatus());
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm({
    mode: "onTouched"
  });

  useEffect(() => {
    if (isSent) {
      reset();
    }
  }, [isSent]);
  const submitAction = (data) => {
    const newData = { ...data, type: data.type.value, date: Date.now() };
    console.log(newData);
    dispatch(addLetter(newData));
  };
  return (
    <div className="faq-form">
      <h4>Есть вопросы или предложения? Напишите нам</h4>
      <form onSubmit={handleSubmit(submitAction)}>
        <input
          className={errors.name ? "is-invalid" : ""}
          type="text"
          placeholder="Имя"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <p className="invalid-feedback">Имя обязательно для заполнения</p>
        )}
        <input
          className={errors.email ? "is-invalid" : ""}
          type="text"
          placeholder="E-mail"
          {...register("email", {
            required: {
              value: true,
              message: "Электронная почта обязательна для заполнения"
            },
            pattern: {
              value: /^\S+@\S+\.\S+$/g,
              message: "Email введен некорректно"
            }
          })}
        />
        {errors.email && (
          <p className="invalid-feedback">{errors.email?.message}</p>
        )}
        <label htmlFor="type">Что Вас интересует:</label>
        <Controller
          name="type"
          control={control}
          defaultValue={faqOptions[0]}
          render={({ field }) => (
            <Select
              options={faqOptions}
              classNamePrefix="custom-select-faq"
              placeholder="Тип сообщения"
              defaultValue={faqOptions[0]}
              {...field}
            />
          )}
        />
        <textarea
          className={errors.name ? "is-invalid textarea" : "textarea"}
          type="text"
          placeholder="Текст сообщения"
          {...register("text", { required: true })}
        />
        {errors.text && <p className="invalid-feedback">Введите сообщение</p>}
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default FaqForm;
