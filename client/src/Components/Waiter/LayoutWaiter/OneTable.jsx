import React from "react";
import style from "./OneTable.module.css";
import { useState } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

export default function OneTable({ el }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOk = async (e) => {
    setIsModalOpen(false);
    const response = await fetch("http://localhost:4000/create_order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: el.id }),
      credentials: "include",
    });
    const result = await response.json();
    navigate("../create_order");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const createOrderHandler = () => {
    setIsModalOpen(true);
  };

  const viewOrder = () => {
    navigate("../view_order");
  };

  return (
    <>
      {el.available ? (
        <>
          <Modal
            className={style.modal}
            title="New order"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Create a new order?</p>
          </Modal>
          <div
            onClick={createOrderHandler}
            className={style.table_first_row_green}
          >
            {el.number}
          </div>
        </>
      ) : (
        <div onClick={viewOrder} className={style.table_first_row_red}>
          {el.number}
        </div>
      )}
    </>
  );
}
