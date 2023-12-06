import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { getSizesCloth } from "../../store/sizesCloth";
import { getSizesShoes } from "../../store/sizesShoes";
import Size from "./size/size";

const SizesList = ({ sizes, register }) => {
  const sizesCloth = useSelector(getSizesCloth());
  const sizesShoes = useSelector(getSizesShoes());
  if (sizesCloth && sizesShoes) {
    const flagCloth = sizesCloth.some((s) => {
      return s._id === sizes[0];
    });

    if (flagCloth) {
      return sizesCloth.map((currentSize) => (
        <Size
          size={currentSize}
          key={currentSize._id}
          sizes={sizes}
          register={register}
        />
      ));
    }
    return sizesShoes.map((currentSize) => (
      <Size
        size={currentSize}
        key={currentSize._id}
        sizes={sizes}
        register={register}
      />
    ));
  }
  return "Loading...";
};
SizesList.propTypes = {
  sizes: PropTypes.array.isRequired,
  register: PropTypes.func.isRequired
};
export default SizesList;
