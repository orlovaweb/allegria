import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import login from "../../../assets/login.webp";
import logo from "../../../assets/logo.webp";
import {
  getEmailResetedPassword,
  getIsLoggedIn,
  removeError
} from "../../../store/users";
import Modal from "../../common/modal";
import LoginForm from "../loginForm";
import NavBar from "../navBar";
import "./header.css";
import ForgotPasswordForm from "../forgotPasswordForm";

const Header = () => {
  const [modalLogin, setModalLogin] = useState(false);
  const [modalForgotPassword, setModalForgotPassword] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
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
    <section className="header">
      <div className="container">
        <div className="header-wrapper">
          <div className="logo">
            <NavLink to="/">
              <img src={logo} alt="Allegria" />
            </NavLink>
          </div>
          <nav className="main-menu">
            <NavBar burgerActive={menuActive} setBurgerActive={setMenuActive} />
            <div
              className={menuActive ? "burger-menu close" : "burger-menu"}
              onClick={() => setMenuActive(!menuActive)}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
          </nav>
          <div className={menuActive ? "search media-active" : "search"}>
            <form>
              <label htmlFor="search">Поиск</label>
              <input type="text" name="search" />
            </form>
          </div>
          <div className="icon-box">
            <div className="sign-in">
              {isLoggedIn ? (
                <NavLink to="/account" activeClassName="active-link">
                  <svg
                    className="icon-person"
                    width="16"
                    height="18"
                    viewBox="0 0 16 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.9282 17C14.8452 16.4247 14.6906 15.8607 14.4672 15.3212C14.1154 14.4719 13.5998 13.7003 12.9497 13.0503C12.2997 12.4002 11.5281 11.8846 10.6788 11.5328C9.8295 11.1811 8.91925 11 8 11C7.08075 11 6.17049 11.1811 5.32122 11.5328C4.47194 11.8846 3.70026 12.4002 3.05025 13.0503C2.40024 13.7003 1.88463 14.4719 1.53284 15.3212C1.3094 15.8607 1.15484 16.4247 1.0718 17L14.9282 17ZM15.9373 17C15.8482 16.293 15.6649 15.5996 15.391 14.9385C14.989 13.9679 14.3997 13.086 13.6569 12.3431C12.914 11.6003 12.0321 11.011 11.0615 10.609C10.0909 10.2069 9.05057 10 8 10C6.94942 10 5.90914 10.2069 4.93853 10.609C3.96793 11.011 3.08601 11.6003 2.34315 12.3431C1.60028 13.086 1.011 13.9679 0.608963 14.9385C0.335133 15.5996 0.151816 16.293 0.0627457 17C0.0210429 17.331 0 17.665 0 18L16 18C16 17.665 15.979 17.331 15.9373 17Z"
                      fill="#0F303F"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7ZM8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z"
                      fill="#0F303F"
                    />
                  </svg>
                </NavLink>
              ) : (
                <button onClick={() => setModalLogin(true)}>
                  <img src={login} alt="user" />
                </button>
              )}
            </div>
            <div className="favorite">
              <NavLink to="/favorite" activeClassName="active-link">
                <svg
                  className="icon-heart"
                  width="21"
                  height="18"
                  viewBox="0 0 21 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.31802 2.31802C4.07538 0.56066 6.92462 0.56066 8.68198 2.31802L10.5 4.13604L12.318 2.31802C14.0754 0.56066 16.9246 0.56066 18.682 2.31802C20.4393 4.07538 20.4393 6.92462 18.682 8.68198L10.5 16.864L2.31802 8.68198C0.56066 6.92462 0.56066 4.07538 2.31802 2.31802Z"
                    stroke="#0F303F"
                    strokeLinecap="round"
                  />
                </svg>
              </NavLink>
            </div>
            <div className="shopping-cart">
              <NavLink to="/shoppingCart" activeClassName="active-link">
                <svg
                  className="icon-shoppingCart"
                  width="16"
                  height="19"
                  viewBox="0 0 16 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="6.5"
                    width="15"
                    height="12"
                    stroke="#0F303F"
                  />
                  <path
                    d="M13 6C13 4.67392 12.4732 3.40215 11.5355 2.46447C10.5979 1.52678 9.32608 1 8 1C6.67392 1 5.40215 1.52678 4.46447 2.46447C3.52678 3.40215 3 4.67392 3 6"
                    stroke="#0F303F"
                  />
                </svg>
              </NavLink>
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
    </section>
  );
};

export default Header;
