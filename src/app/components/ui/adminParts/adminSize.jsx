import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { getSizesCloth } from "../../../store/sizesCloth";
import { getSizesShoes } from "../../../store/sizesShoes";

const AdminSize = ({ sizeId }) => {
  const sizesCloth = useSelector(getSizesCloth());
  const sizesShoes = useSelector(getSizesShoes());
  const sizes = [...sizesCloth, ...sizesShoes];
  const [size] = sizes.filter((size) => size._id === sizeId);

  return <p>{size.name}</p>;
};
AdminSize.propTypes = {
  sizeId: PropTypes.string.isRequired
};
export default AdminSize;
