import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

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
