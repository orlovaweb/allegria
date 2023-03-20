import React from "react";
import "./counter.css";

const Counter = () => {
  return (
    <div className="counter">
      <button className="counter__btn counter__btn-decrement">
        <p>-</p>
      </button>
      <span>1</span>
      <button className="counter__btn counter__btn-increment">
        <p>+</p>
      </button>
    </div>
  );
};

export default Counter;
