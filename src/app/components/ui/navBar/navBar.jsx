import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

const NavBar = ({ burgerActive, setBurgerActive }) => {
  return (
    <>
      <div className={burgerActive ? "nav-bar media-active" : "nav-bar"}>
        <ul>
          <li>
            <NavLink
              to="/"
              exact
              activeClassName="active-link"
              onClick={() => {
                if (burgerActive) setBurgerActive(false);
                scroll.scrollToTop();
              }}
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/aboutUs"
              activeClassName="active-link"
              onClick={() => {
                if (burgerActive) setBurgerActive(false);
                scroll.scrollToTop();
              }}
            >
              О нас
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/brands"
              activeClassName="active-link"
              onClick={() => {
                if (burgerActive) setBurgerActive(false);
                scroll.scrollToTop();
              }}
            >
              Бренды
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/goods"
              activeClassName="active-link"
              onClick={() => {
                if (burgerActive) setBurgerActive(false);
                scroll.scrollToTop();
              }}
            >
              Товары
            </NavLink>
          </li>
        </ul>
        <div
          className={
            burgerActive ? "brands-in-menu media-active" : "brands-in-menu"
          }
        >
          <NavLink
            to="/brands"
            onClick={() => {
              if (burgerActive) setBurgerActive(false);
              scroll.scrollToTop();
            }}
          >
            <ul>
              <li>Deha</li>
              <li>American vintage</li>
              <li>George Gina & Lucy</li>
              <li>Birkenstock</li>
            </ul>
          </NavLink>
        </div>
      </div>
    </>
  );
};
NavBar.propTypes = {
  burgerActive: PropTypes.bool.isRequired,
  setBurgerActive: PropTypes.func.isRequired
};
export default NavBar;
