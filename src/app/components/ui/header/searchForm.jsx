import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { IconContext } from "react-icons";
import { AiOutlineSearch } from "react-icons/ai";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { animateScroll as scroll } from "react-scroll";
import {
  clearSearchItem,
  getSearchItem,
  setSearchItem
} from "../../../store/goods";

const SearchForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const searchItem = useSelector(getSearchItem());
  const { register, handleSubmit, reset } = useForm({
    mode: "onTouched"
  });
  const submitAction = (data) => {
    dispatch(setSearchItem(data.searchText.trim()));
    onSubmit(false);
    scroll.scrollToTop();
  };
  const handleClearSearch = () => {
    reset();
    dispatch(clearSearchItem());
    onSubmit(false);
    scroll.scrollToTop();
  };
  return (
    <form onSubmit={handleSubmit(submitAction)} className="search-form">
      <input
        type="text"
        placeholder="Поиск"
        {...register("searchText", { required: true })}
      />
      {searchItem && (
        <IconContext.Provider
          value={{
            color: "#E64926",
            size: "10px",
            className: "clear-search-item"
          }}
        >
          <div onClick={handleClearSearch}>
            <FaWindowClose />
          </div>
        </IconContext.Provider>
      )}
      <IconContext.Provider
        value={{
          color: "#0F303F",
          size: "20px"
        }}
      >
        <button type="submit" className="search-btn">
          <AiOutlineSearch />
        </button>
      </IconContext.Provider>
    </form>
  );
};
SearchForm.propTypes = {
  onSubmit: PropTypes.func
};
export default SearchForm;
