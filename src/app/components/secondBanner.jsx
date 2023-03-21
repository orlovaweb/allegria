import React from "react";
import "./secondBanner.css";

const SecondBanner = () => {
  return (
    <div className="second-banner">
      <div className="second-banner-wrapper">
        <div className="second-banner__left">
          <div className="second-banner__offer">
            <h1>New arrival</h1>
            <p>
              Каждую неделю у нас поступление новых моделей. Новые коллекции
              одежды для женщин в нашем онлайн-бутике: самый роскошный выбор от
              дизайнеров женской одежды известных брендов на любой случай жизни.
            </p>
            <a href="/brands">Смотреть бренды</a>
          </div>
        </div>
        <div className="second-banner__right">
          <div className="second-banner__right-wrapper">
            <div className="second-banner__right-content">
              <p>
                Будь в тренде современной моды с интернет-магазином Allegria
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondBanner;
