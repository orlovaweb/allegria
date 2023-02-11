import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
            Главная
          </NavLink>
        </li>
        <li>
          <NavLink to="/aboutUs" activeClassName="active">
            О нас
          </NavLink>
        </li>
        <li>
          <NavLink to="/brands" activeClassName="active">
            Бренды
          </NavLink>
        </li>
        <li>
          <NavLink to="/goods" activeClassName="active">
            Товары
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default NavBar;
