import React from "react";
import style from "./OneTable.module.css";

export default function OneTable({ el }) {
  return <div className={style.table_first_row}>{el.number}</div>;
}
