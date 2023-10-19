import React from "react";
import { Link } from "react-router-dom";

const PersonalHistory = () => {
  return (
    <section className="no-history">
      <h3>В вашей истории заказов нет покупок</h3>
      <p>Здесь будут отображаться заказы сделанные Вами.</p>
      <Link to="/goods">
        <button className="btn ">Перейти в каталог</button>
      </Link>
    </section>
  );
};

export default PersonalHistory;
