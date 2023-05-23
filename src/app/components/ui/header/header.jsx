import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import NavBar from "../navBar";
import Modal from "../../common/modal";
import LoginForm from "../loginForm";
import "./header.css";
import logo from "../../../assets/logo.webp";
import login from "../../../assets/login.webp";
import shopping_cart from "../../../assets/shopping_cart.webp";
import heart from "../../../assets/heartOff.svg";

const Header = () => {
  const [modalLogin, setModalLogin] = useState(false);
  const [modalForgotPassword, setModalForgotPassword] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (history.state?.from == "registerForm") {
      setModalLogin(true);
      history.state = {};
    }
  }, [location.pathname]);
  const handleCloseModalLogin = () => {
    setModalLogin(false);
  };

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
              <button onClick={() => setModalLogin(true)}>
                <img src={login} alt="user" />
              </button>
            </div>
            <div className="favorite">
              {/* <a href="/favorite"> */}
              <img src={heart} alt="heart" />
              {/* </a> */}
            </div>
            <div className="shopping-cart">
              {/* <a href="/shopping_cart"> */}

              <img src={shopping_cart} alt="shopping" />
              {/* <a/> */}
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
      <Modal active={modalForgotPassword} setActive={setModalForgotPassword}>
        <div className=" modal-login">
          <h1 className="modal-title">Восстановить пароль</h1>
          <p>Введите вашу почту</p>
        </div>
      </Modal>
    </section>
  );
};

export default Header;
