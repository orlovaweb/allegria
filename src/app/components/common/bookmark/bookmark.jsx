import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import heartOff from "../../../assets/heartOff.svg";
import heartOn from "../../../assets/heartOn.webp";
import { getFavorite, getIsLoggedIn } from "../../../store/users";
import useBookmark from "../../ui/hooks/useBookMark";
import "./bookmark.css";

const renderIcon = (status) => {
  if (status) return <img src={heartOn} alt="red heart" />;
  else return <img src={heartOff} alt="heart" />;
};

const Bookmark = ({ productId }) => {
  const [status, setStatus] = useState(false);
  const isLoggedIn = useSelector(getIsLoggedIn());
  const favoriteArray = useSelector(getFavorite());
  const onToggleBookmark = useBookmark();
  const getState = () => {
    if (isLoggedIn) {
      if (favoriteArray) {
        return favoriteArray.includes(productId);
      } else {
        return false;
      }
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
    setStatus(newStatus);
  }, []);

  const handleClick = () => {
    setStatus((prevState) => !prevState);
    onToggleBookmark(productId);
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
  productId: PropTypes.string
};
export default Bookmark;
