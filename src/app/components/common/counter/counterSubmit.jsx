import PropTypes from "prop-types";
import React from "react";
import "./counter.css";

const CounterSubmit = ({ onDecrement, onIncrement, count }) => {
  return (
    <div className="counter">
      <button
        className="counter__btn counter__btn-decrement"
        onClick={onDecrement}
        // disabled={disableBtn}
      >
        <p>-</p>
      </button>
      <span>{count}</span>
      <button
        className="counter__btn counter__btn-increment"
        onClick={onIncrement}
      >
        <p>+</p>
      </button>
    </div>
  );
};
CounterSubmit.propTypes = {
  onDecrement: PropTypes.func,
  onIncrement: PropTypes.func,
  count: PropTypes.number
};
export default CounterSubmit;
