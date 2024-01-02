import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Select from "react-select";
import IconPerson from "../../common/svgs/iconPerson";
import IconAdress from "../../common/svgs/iconAdress";
import IconHistory from "../../common/svgs/iconHistory";
import IconChangePass from "../../common/svgs/iconChangePass";
import IconLogOut from "../../common/svgs/iconLogOut";
import { animateScroll as scroll } from "react-scroll";

const navOptions = [
  {
    value: "personalInfo",
    label: (
      <Link to="/account/personalInfo">
        <IconPerson />
        <span>Личная информация</span>
      </Link>
    )
  },
  {
    value: "adress",
    label: (
      <Link to="/account/adress">
        <IconAdress />
        <span>Адрес</span>
      </Link>
    )
  },
  {
    value: "history",
    label: (
      <Link to="/account/history">
        <IconHistory />
        <span>История покупок</span>
      </Link>
    )
  },
  {
    value: "changePassword",
    label: (
      <Link to="/account/changePassword">
        <IconChangePass />
        <span>Изменить пароль</span>
      </Link>
    )
  },
  {
    value: "logOut",
    label: (
      <Link to="/logOut">
        <IconLogOut />
        <span>Выйти</span>
      </Link>
    )
  }
];

const AccountNavBar = () => {
  const renderCurrentChoise = () => {
    switch (location.pathname) {
      case "/account/personalInfo":
        return navOptions[0];
      case "/account/adress":
        return navOptions[1];
      case "/account/history":
        return navOptions[2];
      case "/account/changePassword":
        return navOptions[3];

      default:
        return navOptions[0];
    }
  };
  const selectRef = useRef();
  const handleChangeSelect = () => {
    console.log(selectRef.current);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <nav>
      <ul className="advanced-navigation">
        <li>
          <NavLink
            to="/account/personalInfo"
            activeClassName="active-link"
            className="nav-link"
          >
            <IconPerson />
            <span>Личная информация</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/account/adress"
            activeClassName="active-link"
            className="nav-link"
          >
            <IconAdress />
            <span>Адрес</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/account/history"
            activeClassName="active-link"
            className="nav-link"
          >
            <IconHistory />
            <span>История покупок</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/account/changePassword"
            activeClassName="active-link"
            className="nav-link"
          >
            <IconChangePass />
            <span>Изменить пароль</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/logOut"
            className="nav-link"
            onClick={scroll.scrollToTop}
          >
            <IconLogOut />
            <span>Выйти</span>
          </NavLink>
        </li>
      </ul>
      <div className="mobile-navigation">
        <form onSubmit={handleSubmit}>
          <Select
            options={navOptions}
            className="input-text-field personal-adress__select"
            classNamePrefix="custom-select-account"
            defaultValue={renderCurrentChoise()}
            ref={selectRef}
            onChange={handleChangeSelect}
          />
        </form>
      </div>
    </nav>
  );
};

export default AccountNavBar;
