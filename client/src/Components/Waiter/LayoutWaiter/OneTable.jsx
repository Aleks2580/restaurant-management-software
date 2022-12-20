import React from "react";
import style from "./OneTable.module.css";
import { useState } from "react";
import { Modal } from "antd";

export default function OneTable({ el }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const createOrderHandler = () => {
    setIsModalOpen(true);
    console.log(el);
  };

  const viewOrder = () => {
    console.log(`You view this order ${el.id}`);
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
      {/* <div onClick={createOrderHandler} className={style.table_first_row}>
        {el.number}
      </div> */}
    </>
  );
}
