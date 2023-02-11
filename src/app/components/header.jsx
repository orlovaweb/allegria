import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import "./header.css";
import NavBar from "./navBar";

const Header = () => {
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
            <NavBar />
          </nav>
          <div className="search">
            <form>
              <label htmlFor="search">Поиск</label>
              <input type="text" name="search" />
            </form>
          </div>
          <div className="enter">
            <div className="sign-in">
              <a href="/signIn">Вход</a>
            </div>
            <div className="sign-up">
              <a href="/signUp">Регистрация</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
