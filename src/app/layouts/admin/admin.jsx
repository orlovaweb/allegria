import React from "react";
import useMockData from "../../utils/mockData";
import "./admin.css";
const Admin = () => {
  const { error, initialize, progress, status } = useMockData();
  const handleClick = () => {
    initialize();
  };

  return (
    <section className="admin">
      <h1 className="admin__title"> Панель администратора</h1>
      <div className="container mt-5">
        <h3 className="admin__initial">Инициализация данных в FireBase</h3>
        <ul>
          <li>Status:{status}</li>
          <li>Progress:{progress}%</li>
          {error && <li>Error:{error}</li>}
        </ul>
        <button className="btn btn-primary" onClick={handleClick}>
          Инициализировать
        </button>
      </div>
    </section>
  );
};

export default Admin;
