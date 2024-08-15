import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeProduct } from "../../../store/goods";
import Modal from "../../common/modal";
import IconDelete from "../../common/svgs/iconDelete";
import IconEdit from "../../common/svgs/iconEdit";
import AdminSize from "./adminSize";
const AdminGoodsItem = ({ product }) => {
  const [modalRevisionDelete, setModalRevisionDelete] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(removeProduct(product._id));
  };
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
        <div
          className="product-delete"
          onClick={() => {
            setModalRevisionDelete(true);
          }}
        >
          <IconDelete />
        </div>
      </div>
      <Modal active={modalRevisionDelete} setActive={setModalRevisionDelete}>
        <div className="modal-revision-delete">
          <h5>Вы точно хотите удалить данный продукт?</h5>
          <div className="modal-revision-delete__buttons">
            <button
              className="btn modal-revision-delete__confirm"
              onClick={handleDelete}
            >
              Да
            </button>
            <button
              className="modal-revision-delete__reject"
              onClick={() => {
                setModalRevisionDelete(false);
              }}
            >
              Нет
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
AdminGoodsItem.propTypes = {
  product: PropTypes.object.isRequired
};
export default AdminGoodsItem;
