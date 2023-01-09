import React from "react";
import style from "./OneOrder.module.css";
import { FolderOpenOutlined } from "@ant-design/icons";

export default function OneOrder({ el }) {
  return <div className={style.orders}>{el.number}</div>;
}
