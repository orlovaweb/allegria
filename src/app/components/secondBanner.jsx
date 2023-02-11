import React from "react";
import "./secondBanner.css";
import banner from "../assets/banner2-img.jpg";

const SecondBanner = () => {
  return (
    <div className="second-banner">
      <div className="bg-img">
        <div className="container">
          <div className="second-banner-wrapper">
            <div className="second-banner__offer">
              <h1>New arrival</h1>
              <p>
                Новая коллекция одежды для женщин от New Arrivals в нашем
                онлайн-бутике: самый роскошный выбор от дизайнеров женской
                одежды бренда New Arrivals на любой случай жизни.
              </p>
              <a href="/">Смотреть коллекцию</a>
            </div>
            <div className="second-banner__img-wrapper">
              <img src={banner} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondBanner;
