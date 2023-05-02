import React from "react";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import style from "./OneProduct.module.css";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editProduct } from "../../../store/editProduct/actionCreators";

export default function OneProduct({ el }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [display, setDisplay] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = async () => {
    const response = await fetch("/delete_product", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: el.id }),
      credentials: "include",
    });
    const result = await response.json();
    if (result) {
      setDisplay(false);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteHandler = () => {
    setIsModalOpen(true);
  };

  const editHandler = () => {
    dispatch(
      editProduct({
        name: el.name,
        price: el.priceUSD,
        id: el.id,
      })
    );
    navigate("../edit");
  };
  return (
    <>
      <Modal
        className={style.modal}
        title="Confirmation"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Delete this product?</p>
      </Modal>
      {display ? (
        <div className={style.card}>
          <>
            <div className={style.info}>
              <div className={style.name}>{el.name}</div>
              <div className={style.role}>{el.priceUSD}$</div>
            </div>
            <div className={style.icons}>
              <DeleteOutlined
                onClick={deleteHandler}
                className={style.icon_delete}
              />

              <EditOutlined onClick={editHandler} className={style.icon} />
            </div>
          </>
        </div>
      ) : null}
    </>
  );
}
