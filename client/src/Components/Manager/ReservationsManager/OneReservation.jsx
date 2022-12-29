import React from "react";
import style from "./OneReservation.module.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function OneReservation({ el, data }) {
  return (
    <>
      <div className={style.data}>
        <div className={style.date}>{el.date}</div>
        <div className={style.time}>{el.time}</div>
        <div className={style.name}>{el.name}</div>
        <div className={style.icons}>
          <EditOutlined className={style.edit} />
          <DeleteOutlined
            //onClick={handleDelete}
            className={style.delete}
          />
        </div>
      </div>
    </>
  );
}
