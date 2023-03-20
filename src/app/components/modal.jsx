import React from "react";
import PropTypes from "prop-types";
import "./modal.css";

const Modal = ({ active, setActive, children }) => {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => {
        setActive(false);
      }}
    >
      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className="modal-close"
          onClick={() => {
            setActive(false);
          }}
        ></div>
        {children}
      </div>
    </div>
  );
};
Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  children: PropTypes.elementType
};
export default Modal;
