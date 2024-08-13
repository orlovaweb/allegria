import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { getEmailResetedPassword, removeError } from "../../../store/users";
import Modal from "../../common/modal";
import ForgotPasswordForm from "../forgotPasswordForm";
import LoginForm from "../loginForm";
import "./footer.css";
import GsapFooterForm from "./GsapFooterForm";

const Footer = ({ modalLogin, setModalLogin }) => {
  const [modalForgotPassword, setModalForgotPassword] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const emailResetedPassword = useSelector(getEmailResetedPassword());
  useEffect(() => {
    if (history.state?.from == "registerForm") {
      setModalLogin(true);
      history.state = {};
    }
  }, [location.pathname]);
  const handleCloseModalLogin = () => {
    setModalLogin(false);
  };
  useEffect(() => {
    if (modalLogin) {
      dispatch(removeError());
    }
  }, [modalLogin]);
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
              <p>
                Разработчик:{" "}
                <a href="https://resume.orlovaweb.ru/">Orlovaweb</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal active={modalLogin} setActive={setModalLogin} isForm={true}>
        <div className="modal-login">
          <h1 className="modal-title">Вход</h1>
          <LoginForm onSubmit={handleCloseModalLogin} />
          <div className="alternative-entry">
            <button
              className="forgot-password"
              onClick={() => {
                setModalForgotPassword(true);
                setModalLogin(false);
              }}
            >
              Забыли пароль
            </button>
            <span className="alternative-entry__slash">/</span>
            <NavLink
              className="link-to-register"
              to="/register"
              onClick={() => setModalLogin(false)}
            >
              У меня нет аккаунта
            </NavLink>
          </div>
        </div>
      </Modal>
      <Modal
        active={modalForgotPassword}
        setActive={setModalForgotPassword}
        isForm={true}
      >
        <div className=" modal-login">
          <h1 className="modal-title forgot-password-title">
            Восстановить пароль
          </h1>
          {emailResetedPassword ? (
            <div>
              <p>Ссылка для восстановления пароля отправлена на</p>
              <span>{emailResetedPassword}</span>
            </div>
          ) : (
            <ForgotPasswordForm />
          )}
        </div>
      </Modal>
    </footer>
  );
};
Footer.propTypes = {
  modalLogin: PropTypes.bool,
  setModalLogin: PropTypes.func
};
export default Footer;
