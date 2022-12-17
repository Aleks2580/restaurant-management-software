import React from "react";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import style from "./OneUser.module.css";
import { Modal } from "antd";

export default function OneUser({ el }) {
  const [display, setDisplay] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = async () => {
    const response = await fetch("http://localhost:4000/delete_user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: el.id }),
      credentials: "include",
    });
    const result = await response.json();
    console.log("RESULT", result);
    if (result) {
      setDisplay(false);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteHandler = async (e) => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Modal
        title="Confirmation"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Delete this user?</p>
      </Modal>
      {display ? (
        <div className={style.card}>
          <div className={style.info}>
            <div className={style.name}>{el.fullName}</div>
            <div className={style.role}>{el.role}</div>
          </div>
          <div className={style.icons}>
            <DeleteOutlined onClick={deleteHandler} className={style.icon} />
            <EditOutlined className={style.icon} />
          </div>
        </div>
      ) : null}
    </>
  );
}
