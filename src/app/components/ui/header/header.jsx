import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import logo from "../../../assets/logo.webp";
import {
  getCart,
  getCurrentUserData,
  getFavorite,
  getIsLoggedIn,
  getUnauthorizedCart,
  getUnauthorizedFavorite
} from "../../../store/users";
import IconCart from "../../common/svgs/iconCart";
import IconHeart from "../../common/svgs/iconHeart";
import IconPerson from "../../common/svgs/iconPerson";
import NavBar from "../navBar";
import "./header.css";
import SearchForm from "./searchForm";

const Header = ({ setModalLogin }) => {
  const [menuActive, setMenuActive] = useState(false);
  const isLoggedIn = useSelector(getIsLoggedIn());
  const user = useSelector(getCurrentUserData());
  const cartArrayGlobal = useSelector(getCart());
  const unauthorizedCartArray = useSelector(getUnauthorizedCart());
  const favoriteArrayGlobal = useSelector(getFavorite());
  const unauthorizedFavoriteArray = useSelector(getUnauthorizedFavorite());
  const cartArray = isLoggedIn
    ? cartArrayGlobal
      ? cartArrayGlobal
      : []
    : unauthorizedCartArray;
  const favoriteArray = isLoggedIn
    ? favoriteArrayGlobal
      ? favoriteArrayGlobal
      : []
    : unauthorizedFavoriteArray;
  const countCart = cartArray.length;
  const countFavorite = favoriteArray.length;

  return (
    <section className="header">
      <div className="container">
        <div className="header-wrapper">
          <div className="logo">
            <NavLink to="/" onClick={scroll.scrollToTop}>
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
                <NavLink
                  to="/account"
                  activeClassName="active-link"
                  className="header-link"
                >
                  <div className="icon-account">
                    <p>{user?.name.slice(0, 1)}</p>
                  </div>
                </NavLink>
              ) : (
                <button
                  className="header-link"
                  onClick={() => setModalLogin(true)}
                >
                  <IconPerson />
                </button>
              )}
            </div>
            <div className="favorite">
              <NavLink
                to="/favorite"
                activeClassName="active-link"
                className="header-link"
              >
                <IconHeart />
              </NavLink>
              {countFavorite > 0 && (
                <div className="favorite__bage">{countFavorite}</div>
              )}
            </div>
            <div className="shopping-cart">
              <NavLink
                to="/shoppingCart"
                activeClassName="active-link"
                className="header-link"
              >
                <IconCart />
              </NavLink>
              {countCart > 0 && (
                <div className="shopping-cart__bage">{countCart}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
Header.propTypes = {
  setModalLogin: PropTypes.func
};
export default Header;
