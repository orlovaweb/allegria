import React from "react";
import { NavLink } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
const AdminNavBar = () => {
  return (
    <nav>
      <ul className="advanced-navigation admin-navigation">
        <li>
          <NavLink
            to="/admin/goods"
            activeClassName="active-link"
            className="nav-link admin-link"
          >
            <span>Товары</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/categories"
            activeClassName="active-link"
            className="nav-link admin-link"
          >
            <span>Категории</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/brands"
            activeClassName="active-link"
            className="nav-link admin-link"
          >
            <span>Бренды</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/letters"
            activeClassName="active-link"
            className="nav-link admin-link"
          >
            <span>Вопросы и предложения</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/users"
            className="nav-link admin-link"
            activeClassName="active-link"
            onClick={scroll.scrollToTop}
          >
            <span>Пользователи</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/initial"
            className="nav-link admin-link"
            activeClassName="active-link"
            onClick={scroll.scrollToTop}
          >
            <span>Инициализация данных в FireBase</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavBar;
