import React from "react";
import "./breadcrumbs.css";
import PropTypes from "prop-types";

const Breadcrumbs = ({ selectedPage }) => {
  return selectedPage ? (
    <div className="breadcrumbs">
      <a href="/">Главная</a>
      <div></div>
      <p>{selectedPage}</p>
    </div>
  ) : (
    <div className="breadcrumbs">
      <a href="/">Главная</a>
    </div>
  );
};

Breadcrumbs.propTypes = {
  selectedPage: PropTypes.string
};
export default Breadcrumbs;
