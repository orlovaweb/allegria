import React from "react";
import "./aboutUs.css";
import aboutUs2 from "../assets/aboutUs2.jpg";
import aboutUs3 from "../assets/aboutUs3.jpg";
import aboutUs4 from "../assets/aboutUs4.jpg";
import aboutUs5 from "../assets/aboutUs5.jpg";

const AboutUs = () => {
  return (
    <>
      <section className="aboutUs-banner">
        <div className="aboutUs-banner__offer">
          <h1>О нас</h1>
          <p>
            Бутик Allegria специализируется на продаже комфортной и современной
            одежды для свободного времени в стиле кэжуал . Мы считаем, что
            одежда - это источник радости, что и отражено в названии нашего
            бутика.
          </p>
        </div>
      </section>
      <section className="aboutUs-material">
        <p>
          American Vintage в первую очередь – это качественный трикотаж, изящная
          красота и летящий крой.
        </p>
        <div className="container">
          <div className="aboutUs-material__imgs">
            <img src={aboutUs2} alt="" />
            <div className="aboutUs-material__img-right">
              <img src={aboutUs3} alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="aboutUs-goods">
        <div className="narrow-container">
          <div className="aboutUs-goods__offer">
            <h3>О нас</h3>
            <p>
              Броские сумки George Gina & Lucy поднимают настроение и своим
              обладательницам и окружающим
            </p>
            <p>
              Birkenstock – это обувь с мягкой ортопедической стелькой,
              позволяющая долгое время находиться в обуви не уставая.
            </p>
            <p>
              Для всех представленных в бутике брендов важным приоритетом
              является экологическая безопасность одежды и производства.
            </p>
          </div>
          <div className="aboutUs-goods__imgs">
            <img src={aboutUs4} alt="" />
            <div className="aboutUs-goods__right-img">
              <img src={aboutUs5} alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="aboutUs-safety">
        <p>
          Для всех представленных в бутике брендов важным приоритетом является
          экологическая безопасность одежды и производства.
        </p>
      </section>
    </>
  );
};

export default AboutUs;
