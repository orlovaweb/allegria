import PropTypes from "prop-types";
import React from "react";
import "./modal.css";

const Modal = ({
  isImg = false,
  isForm = false,
  active,
  setActive,
  children
}) => {
  const renderClassNameModalContent = () => {
    if (active) {
      if (isImg) return "modal__content-img active";
      if (isForm) return "modal__content-form active";
      return "modal__content-text active";
    }
    return "modal__content-form";
  };
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => {
        setActive(false);
      }}
    >
      <div className="modal-wrapper">
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
    </div>
  );
};
Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  children: PropTypes.object,
  isImg: PropTypes.bool,
  isForm: PropTypes.bool
};
export default Modal;
