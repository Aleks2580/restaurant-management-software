import React from "react";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import style from "./OneUser.module.css";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editUser } from "../../../store/editUser/actionCreators";

export default function OneUser({ el }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [display, setDisplay] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = async () => {
    const response = await fetch("/delete_user", {
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
      editUser({
        fullname: el.fullName,
        password: el.password,
        role: el.role,
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

            <EditOutlined onClick={editHandler} className={style.icon} />
          </div>
        </div>
      ) : null}
    </>
  );
}
