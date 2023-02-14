import React, { useState } from "react";
import QuestionList from "../components/questionList";
import "./faq.css";

const Faq = () => {
  const [selectedQuestionPurchases, setSelectedQuestionPurchases] =
    useState(null);
  const [selectedQuestionRefund, setSelectedQuestionRefund] = useState(null);

  const toggleQuestionPurchases = (i) => {
    if (selectedQuestionPurchases === i) {
      return setSelectedQuestionPurchases(null);
    }
    setSelectedQuestionPurchases(i);
    setSelectedQuestionRefund(null);
  };
  const toggleQuestionRefund = (i) => {
    if (selectedQuestionRefund === i) {
      return setSelectedQuestionRefund(null);
    }
    setSelectedQuestionRefund(i);
    setSelectedQuestionPurchases(null);
  };

  return (
    <section className="faq">
      <div className="faq-container">
        <div className="faq-questions">
          <h3 className="faq-questions__title">Популярные вопросы</h3>
          <div className="faq-questions__purchases">
            <h4 className="faq-questions__purchases-title">Покупки</h4>
            <QuestionList
              questions={questionsPurchases}
              toggleQuestion={toggleQuestionPurchases}
              selectedQuestion={selectedQuestionPurchases}
            />
          </div>
          <div className="faq-questions__refund">
            <h4 className="faq-questions__refund-title">Возврат и обмен</h4>
            <QuestionList
              questions={questionsRefund}
              toggleQuestion={toggleQuestionRefund}
              selectedQuestion={selectedQuestionRefund}
            />
          </div>
        </div>
        <div className="faq-form">
          <h4>Есть вопросы или предложения? Напишите нам</h4>
          <form>
            <input type="text" name="name" placeholder="Имя" required />
            <input type="email" name="email" placeholder="E-mail" required />
            <label htmlFor="type">Что Вас интересует:</label>
            <select name="type">
              <option value="Вопрос">Вопрос</option>
              <option value="Предложение">Предложение</option>
            </select>
            <textarea
              name="text"
              placeholder="Текст сообщения"
              required
            ></textarea>
            <button type="submit">Отправить</button>
          </form>
        </div>
      </div>
    </section>
  );
};
const questionsPurchases = [
  {
    id: "1",
    question: "Как можно оплатить?",
    answer:
      " Оплата осуществляется наличными денежными средствами курьеру непосредственно при доставке заказа на адрес получателя. Выбрав данный способ оплаты, Вы получаете возможность рассмотреть и примерить заказанный товар. Если какая-то позиция Вам не подошла, Вы можете просто вернуть ее курьеру, не оплачивая.",
  },
  {
    id: "2",
    question: "По каким дням осуществляется доставка по Москве и МО?",
    answer:
      " Доставка по Москве и Мос.области осуществляется в любой день недели с 10 до 21 часа, в оговоренный с менеджером 3-х часовой интервал.",
  },
  {
    id: "3",
    question: "Соответствуют ли цвета на фото реальным?",
    answer:
      " Все фотографии для интернет-магазина 'Allegria' обязательно проходят этап подготовки и специальной цветокоррекции с целью максимального соответствия реальным фактурам ткани и цветам. Но, к сожалению, каждый монитор по-разному отображает цветовые оттенки и множество сопутствующих факторов, в том числе и работа фотографа. Добиться 100-процентного реального отображения цвета на всех экранах невозможно. Однако, поверьте, небольшие цветовые 'отклонения' не помешают Вам испытать удовольствие и радость от покупки действительно качественного, идеально скроенного пальто.",
  },
  {
    id: "4",
    question: "Каковы сроки доставки?",
    answer:
      "Для Москвы доставка осуществляется, как правило, в течение 1-2 рабочих дней для товаров, находящихся в наличии. Для доставки в другие регионы срок доставки сильно зависит от выбранного способа. Более детальную информацию смотрите на странице посвященной доставке.",
  },
  {
    id: "5",
    question: "Как мне не ошибиться в выборе размера?",
    answer:
      " Заказывая верхнюю одежду в интернет-магазине 'Allegria' мы рекомендуем Вам ознакомиться с размерной таблицей, дополнительно Вы также можете посоветоваться с консультантом интернет-магазина. Мы советуем заказывать ВСЕГДА 2 размера на выбор с примеркой! Так Вы точно сэкономите свое время и главное деньги. Если Вы уже не первый раз делайте заказ у нас, то уже знаете размер, который Вам подходит.",
  },
];
const questionsRefund = [
  {
    id: "1",
    question:
      "Если мне ничего не подошло, могу ли я отказаться и сколько я должна заплатить?",
    answer:
      " Да, конечно. Вы оплачиваете только курьерские услуги в зависимости от места доставки согласно тарифу.",
  },
  {
    id: "2",
    question: "Могу ли я отказаться от части заказа при доставке курьером?",
    answer:
      " Да , эта услуга доступна для клиентов из Москвы и Московской области. Вы покупаете только, то что Вам подошло и понравилось, а остальные позиции забирает курьер.",
  },
  {
    id: "3",
    question: "Кто несёт почтовые расходы на пересылку товара?",
    answer:
      " В стоимость товара не входят почтовые расходы за пересылку заказа в Ваш регион. Их оплачивает клиент в зависимости от выбранной службы доставки.",
  },
];
export default Faq;
