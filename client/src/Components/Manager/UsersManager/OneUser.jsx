import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import style from "./OneUser.module.css";

export default function OneUser({ el }) {
  return (
    <div className={style.card}>
      <div className={style.info}>
        <div className={style.name}>{el.fullName}</div>
        <div className={style.role}>{el.role}</div>
      </div>
      <div className={style.icons}>
        <DeleteOutlined className={style.icon} />
        <EditOutlined className={style.icon} />
      </div>
    </div>
  );
}
