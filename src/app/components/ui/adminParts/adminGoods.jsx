import React from "react";

import { useParams } from "react-router-dom";
import AdminProductEdit from "./adminProductEdit";
import AdminGoodsTable from "./adminGoodsTable";
const AdminGoods = () => {
  const params = useParams();
  const { productArt } = params;
  return productArt ? <AdminProductEdit /> : <AdminGoodsTable />;
};

export default AdminGoods;
