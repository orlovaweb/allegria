import React from "react";
import footerEnter from "../assets/footer-enter.svg";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="footer__title">
          <h2>Будьте в курсе событий</h2>
        </div>
        <form className="footer__form">
          <input type="email" placeholder="E-mail" />
          <input type="image" name="submit" src={footerEnter} alt="enter" />
        </form>
        <nav className="footer-nav">
          <ul>
            <li>
              <a href="/aboutUs">О нас</a>
            </li>
            <li>
              <a href="/faq">Распространенные вопросы</a>
            </li>
            <li>
              <a href="/brands">Бренды</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="footer-copyright">
        <div className="container">
          <div className="footer-copyright-wrapper">
            <div className="footer-copyright__text">
              <p>Все права защищены © 2020 Allegria.com</p>
            </div>
            <div className="developer">
              <p>Разработчик: Orlovaweb</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
