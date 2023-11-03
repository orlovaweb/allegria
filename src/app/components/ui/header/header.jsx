import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.webp";
import {
  getCurrentUserData,
  getEmailResetedPassword,
  getIsLoggedIn,
  removeError
} from "../../../store/users";
import Modal from "../../common/modal";
import IconCart from "../../common/svgs/iconCart";
import IconHeart from "../../common/svgs/iconHeart";
import IconPerson from "../../common/svgs/iconPerson";
import ForgotPasswordForm from "../forgotPasswordForm";
import LoginForm from "../loginForm";
import NavBar from "../navBar";
import "./header.css";
import SearchForm from "./searchForm";
import PropTypes from "prop-types";

const Header = ({ modalLogin, setModalLogin }) => {
  // const [modalLogin, setModalLogin] = useState(false);
  const [modalForgotPassword, setModalForgotPassword] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const user = useSelector(getCurrentUserData());
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
            <SearchForm onSubmit={setMenuActive} />
          </div>
          <div className="icon-box">
            <div className="sign-in">
              {isLoggedIn ? (
                <NavLink to="/account" activeClassName="active-link">
                  <div className="icon-account">
                    <p>{user?.name.slice(0, 1)}</p>
                  </div>
                </NavLink>
              ) : (
                <button onClick={() => setModalLogin(true)}>
                  <IconPerson />
                </button>
              )}
            </div>
            <div className="favorite">
              <NavLink to="/favorite" activeClassName="active-link">
                <IconHeart />
              </NavLink>
            </div>
            <div className="shopping-cart">
              <NavLink to="/shoppingCart" activeClassName="active-link">
                <IconCart />
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
Header.propTypes = {
  modalLogin: PropTypes.bool,
  setModalLogin: PropTypes.func
};
export default Header;
