import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import heartOff from "../../../assets/heartOff.svg";
import heartOn from "../../../assets/heartOn.webp";
import {
  getFavorite,
  getIsLoggedIn,
  getUnauthorizedFavorite
} from "../../../store/users";
import useBookmark from "../../ui/hooks/useBookMark";
import "./bookmark.css";

const renderIcon = (status) => {
  if (status) return <img src={heartOn} alt="red heart" />;
  else return <img src={heartOff} alt="heart" />;
};

const Bookmark = ({ productId }) => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const favoriteArray = useSelector(getFavorite());
  const unauthorizedFavoriteArray = useSelector(getUnauthorizedFavorite());
  const onToggleBookmark = useBookmark();
  const getState = () => {
    if (isLoggedIn) {
      if (favoriteArray) {
        return favoriteArray.includes(productId);
      } else {
        return false;
      }
    } else {
      return unauthorizedFavoriteArray.includes(productId);
    }
  };

  const handleClick = () => {
    onToggleBookmark(productId);
  };
  return (
    <div className="bookmark-wrapper" onClick={handleClick}>
      <button>
        <span className="bookmark-icon">{renderIcon(getState())}</span>
      </button>
    </div>
  );
};
Bookmark.propTypes = {
  productId: PropTypes.string
};
export default Bookmark;
