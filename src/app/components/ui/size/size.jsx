import React from "react";
import PropTypes from "prop-types";
import "./size.css";

const Size = ({ size, sizes }) => {
  const handleClick = () => {
    console.log("click");
  };

  return (
    <button
      className={"size" + (sizes.includes(size) ? " size-in-stock" : "")}
      onClick={handleClick}
      disabled={!sizes.includes(size)}
    >
      {size.name}
    </button>
  );
  // return null;
};
Size.propTypes = {
  size: PropTypes.object.isRequired,
  sizes: PropTypes.array
};
export default Size;
