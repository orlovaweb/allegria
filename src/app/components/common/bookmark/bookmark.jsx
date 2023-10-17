import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import heartOff from "../../../assets/heartOff.svg";
import heartOn from "../../../assets/heartOn.webp";
import { getIsLoggedIn } from "../../../store/users";
import "./bookmark.css";

const renderIcon = (status) => {
  if (status) return <img src={heartOn} alt="red heart" />;
  else return <img src={heartOff} alt="heart" />;
};

const Bookmark = ({ onToggleBookMark, productId }) => {
  const [status, setStatus] = useState(false);
  const isLoggedIn = useSelector(getIsLoggedIn());

  const getState = () => {
    if (isLoggedIn) {
      return false;
    } else {
      if (localStorage.favorite) {
        const favoriteArray = JSON.parse(localStorage.favorite);
        return favoriteArray.includes(productId);
      } else {
        return false;
      }
    }
  };

  useEffect(() => {
    const newStatus = getState();
    console.log("newStatus", newStatus);
    setStatus(newStatus);
  }, []);

  const handleClick = () => {
    console.log("clicked");
    setStatus((prevState) => !prevState);
    onToggleBookMark(productId);
  };
  return (
    <div className="bookmark-wrapper" onClick={handleClick}>
      <button>
        <span className="bookmark-icon">{renderIcon(status)}</span>
      </button>
    </div>
  );
};
Bookmark.propTypes = {
  onToggleBookMark: PropTypes.func,
  productId: PropTypes.string
};
export default Bookmark;
