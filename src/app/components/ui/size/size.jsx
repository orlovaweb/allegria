import PropTypes from "prop-types";
import React from "react";
import "./size.css";

const Size = ({ size, sizes, register }) => {
  return (
    <>
      <label className="size-wrapper">
        <input
          type="radio"
          value={size._id}
          {...register("size", { required: true })}
          disabled={!sizes.includes(size._id)}
        />
        <p
          className={
            "size" + (sizes.includes(size._id) ? " size-in-stock" : "")
          }
        >
          {size.name}
        </p>
      </label>
    </>
  );
};
Size.propTypes = {
  size: PropTypes.object.isRequired,
  sizes: PropTypes.array,
  register: PropTypes.func
};
export default Size;
