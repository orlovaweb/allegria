import React from "react";
import PropTypes from "prop-types";
import heartOff from "../assets/heartOff.svg";
import heartOn from "../assets/heartOn.svg";
import "./bookmark.css";

const renderIcon = (status) => {
  if (status) return <img src={heartOn} alt="red heart" />;
  else return <img src={heartOff} alt="heart" />;
};
const Bookmark = ({ status, ...rest }) => {
  return (
    <div className="bookmark">
      <button {...rest}>{renderIcon(status)}</button>
    </div>
  );
};
Bookmark.propTypes = {
  status: PropTypes.bool
};
export default Bookmark;
