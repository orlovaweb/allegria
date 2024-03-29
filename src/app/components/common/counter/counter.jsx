import PropTypes from "prop-types";
import React from "react";
import "./counter.css";

const Counter = ({ onDecrement, onIncrement, count }) => {
  return (
    <div className="counter">
      <button
        type="button"
        className="counter__btn counter__btn-decrement"
        onClick={onDecrement}
        disabled={count === 1}
      >
        <p>-</p>
      </button>
      <span>{count}</span>
      <button
        type="button"
        className="counter__btn counter__btn-increment"
        onClick={onIncrement}
      >
        <p>+</p>
      </button>
    </div>
  );
};
Counter.propTypes = {
  onDecrement: PropTypes.func,
  onIncrement: PropTypes.func,
  count: PropTypes.number
};
export default Counter;
