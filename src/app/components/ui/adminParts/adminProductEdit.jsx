import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGoods } from "../../../store/goods";

const AdminProductEdit = () => {
  const { productArt } = useParams();
  const goods = useSelector(getGoods());
  const product = goods.find((p) => {
    return p.art === productArt;
  });
  console.log("product = ", product);
  if (goods) {
    return <p>Product Form for {productArt}</p>;
  } else {
    return <p>Loading...</p>;
  }
};

export default AdminProductEdit;
