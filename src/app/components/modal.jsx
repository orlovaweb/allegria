import React from "react";
import PropTypes from "prop-types";
import "./modal.css";

const Modal = ({ isImg = false, active, setActive, children }) => {
  const renderClassNameModalContent = () => {
    if (active) {
      return isImg ? "modal__content-img active" : "modal__content active";
    }
    return "modal__content";
  };
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => {
        setActive(false);
      }}
    >
      <div
        className={renderClassNameModalContent()}
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
  children: PropTypes.object,
  isImg: PropTypes.bool
};
export default Modal;
