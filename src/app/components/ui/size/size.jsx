import PropTypes from "prop-types";
import React from "react";
import "./size.css";

const Size = ({ size, sizes }) => {
  const handleClick = () => {
    console.log("click");
  };

  return (
    <button
      className={"size" + (sizes.includes(size._id) ? " size-in-stock" : "")}
      onClick={handleClick}
      disabled={!sizes.includes(size._id)}
    >
      {size.name}
    </button>
  );
};
Size.propTypes = {
  size: PropTypes.object.isRequired,
  sizes: PropTypes.array
};
export default Size;
