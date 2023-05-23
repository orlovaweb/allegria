import React from "react";
import PropTypes from "prop-types";

const DisplayCount = ({ length }) => {
  const renderPhrase = (number) => {
    const lastOne = Number(number.toString().slice(-1));
    if (number > 4 && number < 15) {
      return "товаров";
    }
    if (lastOne === 1) return "товар";
    if ([2, 3, 4].indexOf(lastOne) >= 0) return "товара";
    return "товаров";
  };
  return (
    <p>
      {length > 0 ? `${length + " " + renderPhrase(length)}` : "Нет товаров"}
    </p>
  );
};
DisplayCount.propTypes = {
  length: PropTypes.number
};

export default DisplayCount;
