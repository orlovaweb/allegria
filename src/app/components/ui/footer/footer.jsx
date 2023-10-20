import React from "react";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import "./footer.css";
import GsapFooterForm from "./GsapFooterForm";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="footer__title">
          <h2>Будьте в курсе событий</h2>
        </div>
        <GsapFooterForm />

        <nav className="footer-nav">
          <ul>
            <li>
              <Link to="/aboutUs" onClick={scroll.scrollToTop}>
                О нас
              </Link>
            </li>
            <li>
              <Link to="/faq" onClick={scroll.scrollToTop}>
                Распространенные вопросы
              </Link>
            </li>
            <li>
              <Link to="/brands" onClick={scroll.scrollToTop}>
                Бренды
              </Link>
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
