import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import "./header.css";
import NavBar from "./navBar";
import login from "../assets/login.svg";
import shopping_cart from "../assets/shopping_cart.svg";
import heart from "../assets/heartOff.svg";

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
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
              <a href="/signIn">
                <img src={login} alt="user" />
              </a>
            </div>
            <div className="favorite">
              <a href="/favorite">
                <img src={heart} alt="heart" />
              </a>
            </div>
            <div className="shopping-cart">
              <a href="/shopping_cart">
                <img src={shopping_cart} alt="shopping" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
