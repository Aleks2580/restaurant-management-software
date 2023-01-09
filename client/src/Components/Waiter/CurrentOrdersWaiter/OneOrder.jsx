import React from "react";
import style from "./OneOrder.module.css";

export default function OneOrder({ el }) {
  return <div className={style.orders}>{el.number}</div>;
}
