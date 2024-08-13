import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import IconDelete from "../../common/svgs/iconDelete";
import IconEdit from "../../common/svgs/iconEdit";
import AdminSize from "./adminSize";
const AdminGoodsItem = ({ product }) => {
  return (
    <>
      <div className="product-art">{product.art}</div>
      {/* <div className="product-art">...{product.art.slice(-4)}</div> */}
      <div className="product-name">{product.name}</div>
      <div className="product-price">{product.price}</div>
      <div className="product-discount">{product.discount}</div>
      <div className="product-size">
        {product.size && <AdminSize sizeId={product.size} />}
      </div>
      <div className="product-count">{product.count}</div>
      <div className="product-edit_delete">
        <Link to={`/admin/goods/${product.art}`}>
          <div className="product-edit">
            <IconEdit />
          </div>
        </Link>
        <div className="product-delete">
          <IconDelete />
        </div>
      </div>
    </>
  );
};
AdminGoodsItem.propTypes = {
  product: PropTypes.object.isRequired
};
export default AdminGoodsItem;
