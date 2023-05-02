import React, { useState } from "react";
import style from "./OneReservation.module.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editReservation } from "../../../store/editReservation/actionCreators";

export default function OneReservation({ el }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = async () => {
    const response = await fetch("/delete_reservation", {
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

  const deleteHandler = async (e) => {
    setIsModalOpen(true);
  };

  const editHandler = () => {
    dispatch(
      editReservation({
        date: el.date,
        time: el.time,
        name: el.name,
        guests: el.guests,
        phone: el.phone,
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
        <p>Delete this reservation?</p>
      </Modal>
      {display ? (
        <div className={style.data}>
          <div className={style.date}>{el.date}</div>
          <div className={style.time}>{el.time}</div>
          <div className={style.name}>{el.name}</div>
          <div className={style.guests}>{el.guests} guests</div>
          <div className={style.phone}>{el.phone}</div>
          <div className={style.icons}>
            <EditOutlined onClick={editHandler} className={style.edit} />
            <DeleteOutlined onClick={deleteHandler} className={style.delete} />
          </div>
        </div>
      ) : null}
    </>
  );
}
