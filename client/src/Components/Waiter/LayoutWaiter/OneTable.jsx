import React from "react";
import style from "./OneTable.module.css";
import { useState } from "react";
import { Modal } from "antd";

export default function OneTable({ el }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {};

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const createOrderHandler = () => {
    setIsModalOpen(true);
  };

  return (
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
      <div onClick={createOrderHandler} className={style.table_first_row}>
        {el.number}
      </div>
    </>
  );
}
